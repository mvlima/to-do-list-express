const express = require("express");
const checklistDependentRouter = express.Router();

const Task = require("../models/task");
const Checklist = require("../models/checklist");

checklistDependentRouter.get("/:id/tasks/new", async ({ params }, res) => {
  try {
    const task = Task();

    res.status(200).render("tasks/new", { checklistId: params.id, task });
  } catch (error) {
    res.status(422).render("pages/error", { error });
  }
});

checklistDependentRouter.post("/:id/tasks", async ({ body, params }, res) => {
  const { name } = body.task;
  const { id: checklistId } = params;

  const task = new Task({ name, checklist: checklistId });

  try {
    // Add task to the checklist to crate a relation between them
    const checklist = await Checklist.findById(checklistId);
    checklist.tasks.push(task);
    checklist.markModified("tasks"); // Notify mongoose about the change

    await checklist.save();
    await task.save();

    res.redirect(`/checklists/${checklistId}`);
  } catch (error) {
    res.status(422).render("tasks/new", {
      task: { ...task, error },
      checklistId,
    });
  }
});

module.exports = { checkListDependent: checklistDependentRouter };

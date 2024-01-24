const express = require("express");
const simpleRouter = express.Router();
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

simpleRouter.delete("/:id/", async ({ params }, res) => {
  try {
    const task = await Task.findByIdAndDelete(params.id);
    const checklist = await Checklist.findById(task.checklist);
    const taskToRemove = checklist.tasks.indexOf(task._id);

    checklist.tasks.splice(taskToRemove, 1);
    checklist.save();
    res.redirect(`/checklists/${checklist._id}`);
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

simpleRouter.put("/:id", async ({ params, body }, res) => {
  const { id } = params;
  const task = await Task.findById(id);

  try {
    task.set(body.task);
    await task.save();
    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(422).json({ task: { ...error } });
  }
});

module.exports = {
  checkListDependent: checklistDependentRouter,
  simple: simpleRouter,
};

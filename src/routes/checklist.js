const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (_, res) => {
  try {
    const checklists = await Checklist.find({});

    res.status(200).render("checklists/index", { checklists });
  } catch (error) {
    res.status(500).render("pages/error", { error });
  }
});

router.get("/new", async (_, res) => {
  const checklist = new Checklist();

  try {
    res.status(200).render("checklists/new", { checklist });
  } catch (error) {
    res.status(500).render("pages/error", { error });
  }
});

router.get("/:id", async ({ params }, res) => {
  const { id } = params;

  try {
    const checklist = await Checklist.findById(id);

    res.status(200).render("checklists/show", { checklist });
  } catch (error) {
    res.status(422).render("pages/error", { error });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body.checklist;
  const checklist = new Checklist({ name });

  try {
    await checklist.save();

    res.redirect("/checklists");
  } catch (error) {
    res.status(422).render("checklists/new", {
      checklists: { ...checklist, error },
    });
  }
});

router.put("/:id", async ({ body, params }, res) => {
  const { name } = body;
  const { id } = params;

  try {
    const checklist = await Checklist.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error.message || error);
  }
});

router.delete("/:id", async ({ params }, res) => {
  const { id } = params;

  try {
    const checklist = await Checklist.findByIdAndRemove(id);

    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error.message || error);
  }
});

module.exports = router;

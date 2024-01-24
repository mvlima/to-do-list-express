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

router.get("/:id/edit", async ({ params }, res) => {
  const { id } = params;

  try {
    const checklist = await Checklist.findById(id);

    res.status(200).render("checklists/edit", { checklist });
  } catch (error) {
    res.status(500).render("pages/error", { error });
  }
});

router.put("/:id", async ({ body, params }, res) => {
  const { name } = body.checklist;
  const { id } = params;

  const checklist = await Checklist.findById(id);

  try {
    checklist.name = name;
    await checklist.save();

    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklists/edit", { checklist: { ...checklist, error } });
  }
});

router.delete("/:id", async ({ params }, res) => {
  const { id } = params;

  try {
    await Checklist.findByIdAndDelete(id);

    res.redirect("/checklists");
  } catch (error) {
    res.status(500).render("pages/error", { error });
  }
});

module.exports = router;

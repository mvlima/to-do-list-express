const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (_, res) => {
  try {
    const checklists = await Checklist.find({});

    res.status(200).json(checklists);
  } catch (error) {
    res.status(500).json(error.message || error);
  }
});

router.get("/:id", async ({ params }, res) => {
  const { id } = params;

  try {
    const checklist = await Checklist.findById(id);

    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error.message || error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const checklist = await Checklist.create({ name });

    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error.message || error);
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

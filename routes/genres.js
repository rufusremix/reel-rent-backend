const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.find({ _id: req.params.id }).catch((err) =>
    console.log("Error fetching Genre", err)
  );
  if (!genre)
    return res.status(404).send("The Genre with requested Id is not found");

  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = new Genre({ name: req.body.name });
  const genre = await newGenre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  ).catch((err) => console.log("Error while accessing object", err));

  if (!genre) return res.status(404).send("The requested Id is not found");
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id).catch((err) =>
    console.log("Error while deleting object", err)
  );
  if (!genre) return res.status(404).send("The requested Id is not found");

  res.send(genre);
});

module.exports = router;

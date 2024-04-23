const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Genre } = require("../models/genre");
const { Movie, validate } = require("../models/movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id).catch((err) =>
    console.log("Error while fetching movie", err)
  );
  if (!movie)
    return res
      .status(404)
      .send("The movie with the requested ID was not found.");

  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId).catch((err) =>
    console.log("Error while accessing Genre", err)
  );
  if (!genre) return res.status(404).send("The genreId provided is Invalid");

  const newMovie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  const movie = await newMovie.save();
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId).catch((err) =>
    console.log("Error while accessing Genre", err)
  );
  if (!genre) return res.status(404).send("The genreId provided is Invalid");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre.id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  ).catch((err) => console.log("Error while updating movie", err));

  if (!movie)
    return res
      .status(404)
      .send("The movie with the requested ID was not found.");

  res.send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id).catch((err) =>
    console.log("Error while deleting movie", err)
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;

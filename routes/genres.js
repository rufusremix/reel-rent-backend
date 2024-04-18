const express = require("express");
const Joi = require("joi");
const router = express.Router();

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Thriller" },
  { id: 3, name: "Rommance" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const result = validateGenre(req.body);
  if (result.error)
    return res
      .status(400)
      .send("Name should be required and minimum of 3 characters");

  const newGenre = { id: genres.length + 1, name: req.body.name };
  genres.push(newGenre);
  res.send(newGenre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id == parseInt(req.params.id));
  if (!genre) return res.status(404).send("The requested Id is not found");

  const { error } = validateGenre(req.body);
  if (error) return res.send(error);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id == parseInt(req.params.id));
  if (!genre) return res.status(404).send("The requested Id is not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;

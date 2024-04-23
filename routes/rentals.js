const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id).catch((err) =>
    console.log("Error fetching rental", err)
  );
  if (!rental)
    return res.status(404).send("The rental with requested ID was not found");
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId).catch((err) =>
    console.log("Error while fetching customer", err)
  );
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId).catch((err) =>
    console.log("Error while fetching movie", err)
  );
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock == 0) return res.send("Movie not in stock");

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    await rental.save({ session });
    await Movie.findByIdAndUpdate(
      movie._id,
      {
        $inc: { numberInStock: -1 },
      },
      { session }
    );
    await session.commitTransaction();
    res.send(rental);
  } catch (err) {
    console.log("Session error is", err);
    session.abortTransaction();
    res.status(500).send("Something went wrong");
  }
  session.endSession();
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id).catch((err) =>
    console.log("Error while fetching customer", err)
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the requested ID was not found.");

  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCustomer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  const customer = await newCustomer.save();

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  ).catch((err) => console.log("Error while updating customer", err));

  if (!customer)
    return res
      .status(404)
      .send("The customer with the requested ID was not found.");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id).catch(
    (err) => console.log("Error while deleting customer", err)
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the requested ID was not found.");

  res.send(customer);
});

module.exports = router;

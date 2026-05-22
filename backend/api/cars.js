import db from "#db/client";
import express from "express";
const router = express.Router();
export default router;

import {
  getCarById,
  getCarsByMakeAndYear,
  getBasicCarSearchResults,
} from "#db/queries/cars";

// GET /cars?make=Toyota&year=2023
router.get("/search", async (req, res) => {
  // const { make, year } = req.query;
  console.log("searching");
  console.log(req.query);
  const { make, model, year, state } = req.query;
  console.log(make, model, year, state);
  try {
    // const cars = await getCarsByMakeAndYear(make, year);
    const cars = await getBasicCarSearchResults({ make, model, year, state });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

// GET/CARS/MAKES
router.get("/makes", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT make FROM cars ORDER BY make`,
    );
    res.json(result.rows.map((r) => r.make));
  } catch (err) {
    next(err);
  }
});

// GET/CARS/MODELS?MAKE=DODGE
router.get("/models", async (req, res, next) => {
  try {
    const { make } = req.query;

    if (!make) {
      return res.status(400).json({ error: "make query parameter required" });
    }

    const result = await db.query(
      `SELECT DISTINCT model FROM cars WHERE make=$1 ORDER BY model`,
      [make],
    );

    res.json(result.rows.map((r) => r.model));
  } catch (err) {
    next(err);
  }
});

// GET/CARS/YEARS?MAKE=DODGE&MODEL=CHARGER
router.get("/years", async (req, res, next) => {
  try {
    const { make, model } = req.query;

    if (!make || !model) {
      return res
        .status(400)
        .json({ error: "make and model query parameters required" });
    }

    const result = await db.query(
      `SELECT DISTINCT year
      FROM cars
      WHERE make = $1 AND model =$2
      ORDER BY year DESC`,
      [make, model],
    );

    res.json(result.rows.map((r) => r.year));
  } catch (err) {
    next(err);
  }
});
// module.exports = router;

router.param("id", async (req, res, next, id) => {
  const car = await getCarById(id);
  if (!car) return res.status(404).send("Car not found.");
  req.car = car;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.car);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query("SELECT * FROM cars WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

import db from "#db/client";
import express from "express";
const router = express.Router();
export default router;

import {
  getDealerMarkupPercentageAndDollarByState,
  getMarkupByCarAndState,
  getMarkupByCarAcrossYears,
  getAverageMarkupForState,
  getCarsWithMarkupFilters,
} from "#db/queries/dealerMarkup";

// FILTER BY STATE, CAR, YEAR
router.get("/", async (req, res) => {
  const { state_id, car_id, year } = req.query;
  let sql = `
        SELECT dm.*, c.make, c.model, c.year AS car_year, c.msrp, s.state_name
        FROM dealer_markups dm
        JOIN cars c ON dm.car_id = c.id
        JOIN states s ON dm.state_id = s.id
        WHERE 1=1
    `;

  const params = [];
  let paramIndex = 1;

  if (state_id) {
    sql += ` AND dm.state_id = $${paramIndex++}`;
    params.push(state_id);
  }

  if (car_id) {
    sql += ` AND dm.car_id = $${paramIndex++}`;
    params.push(car_id);
  }

  if (year) {
    sql += ` AND dm.year = $${paramIndex++}`;
    params.push(year);
  }

  try {
    const { rows } = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch markup data" });
  }
});

// ALL MARKUP DATA FOR A STATE
router.get("/states/:id/markups", async (req, res) => {
  const { id } = req.params;

  const sql = `
        SELECT dm.*, c.make, c.model, c.year AS car_year, c.msrp
        FROM dealer_markups dm
        JOIN cars c ON dm.car_id = c.id
        WHERE dm.state_id = $1
    `;

  try {
    const markups = await getDealerMarkupPercentageAndDollarByState(id);
    res.json(markups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch markup data" });
  }
});

// ALL MARKUP DATA FOR A CAR
router.get("/cars/:id/markups", async (req, res) => {
  const { id } = req.params;
  const { state_id, year } = req.query;

  let sql = `
        SELECT dm.*, s.state_name, c.make, c.model, c.year AS car_year, c.msrp
        FROM dealer_markups dm
        JOIN states s ON dm.state_id = s.id
        JOIN cars c ON dm.car_id = c.id
        WHERE dm.car_id = $1
    `;

  const params = [id];
  let paramIndex = 2;

  if (state_id) {
    sql += ` AND dm.state_id = $${paramIndex++}`;
    params.push(state_id);
  }

  if (year) {
    sql += ` AND dm.year = $${paramIndex++}`;
    params.push(year);
  }

  try {
    const { rows } = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch car markup data" });
  }
});

// USES GETMARKUPBYCARANDSTATE
router.get("/car/:carId/state/:stateId", async (req, res) => {
  const { carId, stateId } = req.params;
  try {
    const data = await getMarkupByCarAndState(carId, stateId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch markup for car and state" });
  }
});

// USES GETMARKUPBYCARACROSSYEARS(CARID)
router.get("/car/:carId/years", async (req, res) => {
  const { carId } = req.params;

  try {
    const data = await getMarkupByCarAcrossYears(carId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch markup across years" });
  }
});

// USES GETAVERAGEMARKUPFORSTATE(STATEID)
router.get("/states/:stateId/average-markup", async (req, res) => {
  const { stateId } = req.params;

  try {
    const data = await getAverageMarkupForState(stateId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch average markup for state" });
  }
});

// THIS IS THE MAIN SEARCH ENDPOINT
router.get("/cars/search", async (req, res) => {
  const { make, model, year, state_id } = req.query;

  try {
    const cars = await getCarsWithMarkupFilters(make, model, year, state_id);
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch filtered cars." });
  }
});

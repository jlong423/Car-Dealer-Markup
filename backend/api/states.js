import db from "#db/client";
import express from "express";
const router = express.Router();
export default router;

import { getStates, getStateById } from "#db/queries/states";

router.get("/", async (req, res) => {
  const states = await getStates();
  res.json(states);
});

router.param("id", async (req, res, next, id) => {
  const state = await getStateById(id);
  if (!state) return res.status(404).send("State not found.");
  req.queriedState = state;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.queriedState);
});

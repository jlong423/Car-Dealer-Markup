import db from "#db/client";
import express from "express";
import requireUser from "#middleware/requireUser";
const router = express.Router();
export default router;

// POST/FAVORITES
// ADD A CAR TO A USER'S FAVORITES
router.post("/", requireUser, async (req, res, next) => {
  try {
    const { car_id } = req.body;
    const { id } = req.user;
    console.log(car_id, id);
    if (!id || !car_id) {
      return res.status(400).json({ error: "user_id and car_id required" });
    }

    const result = await db.query(
      `INSERT INTO favorites (user_id, car_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, car_id) DO NOTHING
            RETURNING *
            `,
      [id, car_id],
    );
    if (result.rows.length === 0) {
      return res.json({ message: "Already in favorites" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET/FAVORITES/:USERID
// GET ALL FAVORITE CARS FOR A USER
router.get("/:user_id", requireUser, async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const result = await db.query(
      `SELECT
            f.id AS favorite_id,
            c.id AS car_id,
            c.make,
            c.model,
            c.trim,
            c.year,
            c.hp,
            c.torque,
            c.engine_spec,
            c.msrp
            FROM favorites f
            JOIN cars c ON f.car_id=c.id
            WHERE f.user_id=$1
            [user_id]
            `,
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// DELETE/FAVORITES/:USER_ID/:CAR_ID
// REMOVE A CAR FROM A USER'S FAVORITES
router.delete("/:car_id", requireUser, async (req, res, next) => {
  try {
    const { car_id } = req.params;

    await db.query(
      `
            DELETE FROM favorites
            WHERE user_id = $1 AND car_id =$2
            `,
      [req.user.id, car_id],
    );
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    next(err);
  }
});

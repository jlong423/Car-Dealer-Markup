import express from "express";
const app = express();
export default app;

import usersRouter from "#api/users";
import carsRouter from "#api/cars";
import dealerMarkupRouter from "#api/dealerMarkup";
import statesRouter from "#api/states";
import favoritesRouter from "#api/favorites";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Hello, World!"));

app.use("/users", usersRouter);
app.use("/cars", carsRouter);
app.use("/markups", dealerMarkupRouter);
app.use("/states", statesRouter);
app.use("/favorites", favoritesRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

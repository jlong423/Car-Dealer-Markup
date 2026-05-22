import db from "#db/client";

export async function getCarsByMakeAndYear(make, year) {
  console.log(make, year);
  const sql = `
    SELECT * FROM cars 
    WHERE make ilike $1 AND year = $2
    `;
  const { rows: cars } = await db.query(sql, [make, year]);
  return cars;
}

export async function getCarById(id) {
  const sql = `
    SELECT * FROM cars
    WHERE id = $1
    `;
  const {
    rows: [car],
  } = await db.query(sql, [id]);
  return car;
}

export async function getMakes() {
  const sql = `
  SELECT DISTINCT make
  FROM cars
  ORDER BY make
  `;

  const { rows: makes } = await db.query(sql);
  return makes;
}

export async function getModels() {
  const sql = `
  SELECT DISTINCT model
  FROM cars
  WHERE make =$1 
  ORDER BY model;
  `;

  const { rows: models } = await db.query(sql);
  return models;
}

export async function getYear() {
  const sql = `
  SELECT DISTINCT year
  FROM cars
  WHERE make =$1 AND model =$2
  ORDER BY year DESC;
  `;

  const { rows: year } = await db.query(sql);
  return year;
}

export async function getBasicCarSearchResults({ make, model, year, state }) {
  const sql = `
  SELECT
  dm.year AS markup_year,
  c.id,
  c.make,
  c.model,
  c.trim,
  s.state_name,
  c.msrp,
  (c.msrp + dm.average_markup_dollar) AS sale_price,
  dm.average_markup_dollar AS markup_dollar,
  dm.average_markup_percent AS markup_percent
FROM dealer_markups dm
JOIN cars c ON dm.car_id = c.id
JOIN states s ON dm.state_id = s.id
WHERE c.make=$1 AND c.model=$2 AND dm.year=$3 AND s.state_name=$4
ORDER BY c.make, c.model, dm.year;
  `;

  const { rows: car } = await db.query(sql, [make, model, year, state]);
  return car;
}

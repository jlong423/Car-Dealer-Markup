import db from "#db/client";

export async function getDealerMarkupPercentageAndDollarByState(stateId) {
  const sql = `
SELECT
dm.average_markup_percent,
dm.average_markup_dollar,
dm.year,
c.make,
c.model,
c.year AS car_year,
c.msrp,
s.state_name
FROM dealer_markups dm
JOIN cars c ON dm.car_id = c.id
JOIN states s ON dm.state_id = s.id
WHERE dm.state_id= $1
ORDER BY c.make, c.model, dm.year;
`;

  const { rows: markups } = await db.query(sql, [stateId]);
  return markups;
}

// ONE CAR + ONE STATE
export async function getMarkupByCarAndState(carId, stateId) {
  const sql = `
    SELECT 
            dm.average_markup_percent,
            dm.average_markup_dollar,
            dm.year,
            c.make,
            c.model,
            c.year AS car_year,
            c.msrp,
            s.state_name
        FROM dealer_markups dm
        JOIN cars c ON dm.car_id = c.id
        JOIN states s ON dm.state_id = s.id
        WHERE dm.car_id = $1
        AND dm.state_id = $2
        ORDER BY dm.year;
    `;

  const { rows } = await db.query(sql, [carId, stateId]);
  return rows;
}

// COMPARE MARKUP ACROSS YEARS
export async function getMarkupByCarAcrossYears(carId) {
  const sql = `
    SELECT
    dm.year,
    dm.average_markup_percent,
    dm.average_markup_dollar,
    s.state_name,
    c.make,
    c.model,
    c.year AS car_year,
    c.msrp
    FROM dealer_markups dm
    JOIN states s ON dm.state_id = s.id
    JOIN cars c ON dm.car_id= c.id
    WHERE dm.car_id=$1
    ORDER BY dm.year, s.state_name;
    `;

  const { rows } = await db.query(sql, { carId });
  return rows;
}

// STATE LEVEL AVERAGE MARKUP
export async function getAverageMarkupForState(stateId) {
  const sql = `
    SELECT
    s.state_name,
    AVG(dm.average_markup_percent) AS avg_markup_percent,
    AVG(dm.average_markup_dollar) AS avg_markup_dollar
    FROM dealer_markups dm
    JOIN states s ON dm.state_id=s.id
    WHERE dm.state_id=$1
    GROUP BY s.state_name;
    `;

  const { rows } = await db.query(sql, [stateId]);
  return rows[0] || null;
}

// MAIN SEARCH ENGINE FOR THE UI
export async function getCarsWithMarkupFilters(make, model, year, stateId) {
  let sql = `
    SELECT
    c.id AS car_id,
    c.make,
    c.model,
    c.year AS car_year,
    c.msrp,
    dm.average_markup_percent,
    dm.average_markup_dollar,
    dm.year AS markup_year,
    s.state_name
    FROM dealer_markups dm
    JOIN cars c ON dm.car_id=c.id
    JOIN states s ON dm.state_id=s.id
    WHERE 1=1
    `;

  const params = [];
  let index = 1;

  if (make) {
    sql += ` AND c.make = $${index++}`;
    params.push(make);
  }

  if (model) {
    sql += ` AND c.model = $${index++}`;
    params.push(model);
  }

  if (year) {
    sql += ` AND c.year = $${index++}`;
    params.push(year);
  }

  if (stateId) {
    sql += ` AND dm.state_id = $${index++}`;
    params.push(stateId);
  }

  sql += ` ORDER BY c.make, c.model, dm.year`;

  const { rows } = await db.query(sql, params);
  return rows;
}

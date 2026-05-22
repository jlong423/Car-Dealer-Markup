import db from "#db/client";

export async function getStates() {
  const sql = `
    SELECT * FROM states ORDER BY state_name
    `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getStateById(id) {
  const sql = `
  SELECT * FROM states
  WHERE id = $1
  `;

  const {
    rows: [state],
  } = await db.query(sql, [id]);
  return state;
}

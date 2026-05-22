import { useEffect, useState } from "react";
import { getYears } from "../api/cars";

export default function YearSelector({ make, model, onSelect }) {
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (make && model) {
      getYears(make, model).then(setYears);
    }
  }, [make, model]);

  return (
    <select onChange={(e) => onSelect(e.target.value)} disabled={!model}>
      <option value="">Select Year</option>
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  );
}

import { useEffect, useState } from "react";
import { getMakes } from "../api/cars";

export default function MakeSelector({ onSelect }) {
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    getMakes().then(setMakes);
  }, []);
  console.log(makes);
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Make</option>
      {makes.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}

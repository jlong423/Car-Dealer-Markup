import { useEffect, useState } from "react";
import { getModels } from "../api/cars";

export default function ModelSelector({ make, onSelect }) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (make) {
      getModels(make).then(setModels);
    }
  }, [make]);

  return (
    <select onChange={(e) => onSelect(e.target.value)} disabled={!make}>
      <option value="">Select Model</option>
      {models.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}

import React from "react";
import { useEffect, useState } from "react";
import { getStates } from "../api/states";

export default function StateSelector({ onSelect }) {
  const [states, SetStates] = useState([]);

  useEffect(() => {
    getStates().then(SetStates);
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a state</option>
      {states.map((s) => (
        <option key={s.id} value={s.state_name}>
          {s.state_name}
        </option>
      ))}
    </select>
  );
}

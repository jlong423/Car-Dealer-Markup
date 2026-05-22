// import { useState } from "react";
// import StateSelector from "./StateSelector";
// import MakeSelector from "./MakeSelector";
// import ModelSelector from "./ModelSelector";
// import YearSelector from "./YearSelector";

// export default function SearchForm({ onSearch }) {
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState("");
//   const [stateId, setStateId] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSearch({
//       make,
//       model,
//       year,
//       state: stateId,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-form">
//       <div className="form-row">
//         <MakeSelector onSelect={setMake} />
//         <ModelSelector make={make} onSelect={setModel} />
//         <YearSelector make={make} model={model} onSelect={setYear} />
//       </div>

//       <div className="form-row">
//         <StateSelector onSelect={setStateId} />
//       </div>

//       <button type="submit" className="search-btn">
//         Search
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import StateSelector from "./StateSelector";
import MakeSelector from "./MakeSelector";
import ModelSelector from "./ModelSelector";
import YearSelector from "./YearSelector";

export default function SearchForm({ onSearch }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [stateId, setStateId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ make, model, year, state: stateId });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-row">
        <MakeSelector onSelect={setMake} />
        <ModelSelector make={make} onSelect={setModel} />
        <YearSelector make={make} model={model} onSelect={setYear} />
      </div>

      <div className="form-row">
        <StateSelector onSelect={setStateId} />
      </div>

      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/car/:id/state/:id" element={<CarDetails />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/cars/:id" element={<CarDetails />} />
      </Routes>
    </>
  );
}

export default App;

import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Add from "./screens/add";
import Home from "./screens/home";
import SwitchTower from "./screens/switch";
import TowerDetails from "./screens/home/towerDetails";

function App() {

  const [tower, setTower] = useState("")

  return (
   <>
    <Router>
      <Routes>
        <Route path="/" element={<Home setTower={setTower}/>} />
        <Route path="/towerDetails" element={<TowerDetails tower={tower}/>} />
        <Route path="/add" element={<Add />} />
        <Route path="/switchTower" element={<SwitchTower/>} />
      </Routes>
    </Router>
   </>
  );
}

export default App;

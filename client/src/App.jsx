import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "./assets/vite.svg"; // Corrected relative path

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Providers from "./pages/Providers";
import Add from "./pages/Add";
import Update from "./pages/Update";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Providers />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

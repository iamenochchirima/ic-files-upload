import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./pages/Default";
import Gallary from "./pages/Gallary";
import IPFS from "./pages/IPFS";
import Layout from "./components/Layout";

<BrowserRouter></BrowserRouter>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Layout />}>
        <Route index element={<Gallary />} />
        <Route path="/gallary" element={<Gallary />} />
        <Route path="/ipfs" element={<IPFS />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
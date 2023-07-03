import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MDT from "../../Data/data.json";
import Nav from "../Nav/Nav";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./SwitchRoute.scss";
import HomePage from "../HomePage/HomePage";
import PageSearch from "../PageSearch/PageSearch";
import Sommaire from "../Sommaire/Sommaire";
import { normalizeString } from "../../Helpers/Convert";

function SwitchRoute() {

 
  return (
    <Router>
      <Header />
      <Nav props={MDT} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sommaire/:id" element={<Sommaire />} />
        <Route path="/search/" element={<PageSearch />} />
        <Route path="/search/:id" element={<PageSearch />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default SwitchRoute;

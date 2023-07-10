import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MDT from "../../Data/data.json";
import Nav from "../Nav/Nav";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./SwitchRoute.scss";
import HomePage from "../HomePage/HomePage";
import PageSearch from "../PageSearch/PageSearch";
import Sommaire from "../Sommaire/Sommaire";
import PageSearchGlobal from "../PageSearchGlobal/PageSearchGlobal";

function SwitchRoute() {

 
  return (
    <Router>
      <Header />
      <Nav props={MDT} />
      <div className="full-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sommaire/:id" element={<Sommaire />} />
        <Route path="/detail-search/:param1/:param2" element={<PageSearch />} />
        <Route path="/detail-search/:param1/:param2/:param3" element={<PageSearch />} />
        <Route path="/search/:param1/:param2" element={<PageSearchGlobal />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default SwitchRoute;

import React, { useState } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {normalizeString} from "../../Helpers/Convert"

import "./Nav.scss";

function Nav(data) {
  console.log(data.props);

  if (Array.isArray(data.props)) {
    return (
      <div className="container">
        <div className="fr-nav">
          <ul className="menu">
            <li>
            <Link to="/">Accueil</Link>
            </li>
            {data.props.map((key, index) => (
              <li key={index}>
                <a href="#">{key.nomenclature.libelle}</a>
                <ul class="sub-menu">
                  <li className="btn-sommaire">
                  <Link  to={`/sommaire/${normalizeString(key.nomenclature.libelle)}`}>Sommaire</Link>
                  </li>
                  {key.nomenclature.children.map((key, index) => {
                    return (
                      <li key={index}>
                        <a href="#">{key.libelle}</a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;

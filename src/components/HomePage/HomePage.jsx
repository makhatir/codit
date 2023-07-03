import React, { useEffect, useState } from 'react';
import MDT from '../../Data/data.json';
import './HomePage.scss';
import Search from "../Search/Search";
import Bloc from "../Bloc/Bloc";
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';


function HomePage() {

  return (
    <div>
        <div className="fr-router">
          <Breadcrumbs />
          <Search props={MDT}/>
          <Bloc props={MDT} />
        </div>
    </div>
  );
}

export default HomePage;

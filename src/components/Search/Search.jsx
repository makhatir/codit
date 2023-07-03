import React, { useEffect, useState } from "react";
import {  Link } from 'react-router-dom';

import "./Search.scss";
const jsonData = [
  {
    nomenclature: {
      idNomenclature: 1000,
      libelle: 'Légi-TRAVAIL',
      children: [
        {
          idArborescence: 1000,
          refTypeArborescence: 'PAR',
          libelle: 'Partie 1',
          ordre: 1,
          children: [
            {
              idArborescence: 1001,
              refTypeArborescence: 'SPA',
              libelle: 'Discriminations',
              ordre: 1,
              children: [
                {
                  idArborescence: 1002,
                  refTypeArborescence: 'RUB',
                  libelle: '',
                  ordre: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  },
];

function Search(data) {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(data.props,'sea')
  console.log(searchResults,'searchResults')

 
  const searchByLetter = (letter, data) => {
    const results = [];

    const searchInObject = (obj) => {
      for (let prop in obj) {
        if (typeof obj[prop] === 'string') {
          const propValue = obj[prop].toLowerCase();
          if (propValue.startsWith(letter.toLowerCase())) {
            results.push(obj);
            break;
          }
        } else if (Array.isArray(obj[prop])) {
          obj[prop].forEach((item) => {
            if (typeof item === 'object') {
              searchInObject(item);
            }
          });
        } else if (typeof obj[prop] === 'object') {
          searchInObject(obj[prop]);
        }
      }
    };

    data.forEach((obj) => {
      searchInObject(obj);
    });

    return results;
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const results = searchByLetter(searchTerm, jsonData);
    setSearchResults(results);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="input"
          placeholder="Rechercher par référence juridique, mot ou expression"
          className=""
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       <Link to="/search">
        <button type="submit" onClick={handleSearch} className="">
          Rechercher
        </button>
        </Link>
      </div>
      <div className="SearchResults">
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{JSON.stringify(result)}</li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
      </div>
    </div>
  );
}

export default Search;

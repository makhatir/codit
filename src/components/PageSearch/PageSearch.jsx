import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import "./PageSearch.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import jsonData from "../../Data/data.json";

function PageSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [blocArticle,setBlocArticle]= useState([])
  console.log(jsonData, "MDT");
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

    // Appeler la fonction de recherche récursive
    const results = searchInJSON(jsonData, searchTerm);
    setSearchResults(results);
  };

  const searchInJSON = (data, searchText, parent = null) => {
    let results = [];

    // Parcourir chaque objet de l'arborescence
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];

        // Vérifier si le libellé de l'objet contient le terme de recherche
        if (
          item.nomenclature &&
          item.nomenclature.libelle
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
          results.push({ parent, item });
        } else if (
          item.libelle &&
          item.libelle.toLowerCase().includes(searchText.toLowerCase())
        ) {
          results.push({ parent, item });
        } else if (
          item.referenceJuridique &&
          item.referenceJuridique
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
          results.push({ parent, item });
        }

        if (item.children && item.children.length > 0) {
          // Si l'objet a des enfants, effectuer la recherche récursive sur les enfants
          const childResults = searchInJSON(item.children, searchText, item);
          results = results.concat(childResults);
        } else if (
          item.nomenclature &&
          item.nomenclature.children &&
          item.nomenclature.children.length
        ) {
          const childResults = searchInJSON(
            item.nomenclature.children,
            searchText,
            item
          );
          results = results.concat(childResults);
        }
      }
    }
    setSearchTerm("");

    return results;
  };
  const copyTextToClipboard = (title,article) => {
    const copyInput = document.createElement('input');
    copyInput.value = title+article;
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand('copy');
    document.body.removeChild(copyInput);
  };
  const frArticle = (object)=>{
    setBlocArticle(object);
    console.log(blocArticle.article,'blocArticle');
    console.log(blocArticle.title,'blocArticle');

  }
 
  console.log(searchResults, "searchResults");

  return (
    <div className="ResultSearch">
      <div className="container">
        <div className="section">
          <div className="content">
            <div className="filter">
              <div className="search-bar">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Rechercher par référence juridique"
                    required
                  />
                  <button type="submit">0</button>
                </form>
              </div>
              <div className="filter-btn">
                <button className="btn-nat">Filtrer par NATINF</button>
                <a className="btn-statut">Filtrer par Statut</a>
              </div>
            </div>
            <div className="bloc-result">
              {searchResults.map((key, index) => (
                <div key={index}>
                  <h2 className="title-result">
                    {key.parent && key.parent.libelle}
                  </h2>
                  {key.item.nomenclature ? (
                    <h3>{key.item.nomenclature.libelle}</h3>
                ) : (
                    <ul className="section-article">
                    <li className="fr-article" key={index}>
                        <div className="legiTitre">{key.item.legiSitereTitre} </div> 
                        <button onClick={() => frArticle({ title: key.item.legiSitereTitre, article: key.item.articleText })} className="refJuridique">{key.item.referenceJuridique} </button> 
                        <button onClick={copyTextToClipboard(key.item.legiSitereTitre,key.item.articleText)}>Copier</button>
                    </li>
                  </ul>
                )}
                  
                </div>
              ))}
            </div>
          </div>
          <div className="bloc-article">
          {blocArticle ? (
            <div className="">
               <h3> {blocArticle.title}</h3>
               <div> {blocArticle.article && blocArticle.article.length && parse(blocArticle.article)} </div>

            </div>

                ) : (
            <p>
              Sélectionner un article pour afficher son contenu et les codes
              NATINF référencés.
            </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSearch;

import React, { useRef, useState, useEffect } from "react";
import parse from "html-react-parser";
import "./PageSearch.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { normalizeString } from "../../Helpers/Convert";
import jsonData from "../../Data/data.json";

function PageSearch() {
  const termRef = useRef("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChildren1, setselectedChildren1] = useState(null);
  const [selectedChildren2, setselectedChildren2] = useState(null);
  const [selectedChildren3, setselectedChildren3] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [blocArticle, setBlocArticle] = useState({});
  const { param1, param2 } = useParams();

  useEffect(() => {
    if (param1) {
      const selectedChildren = jsonData.find(
        (item) => normalizeString(item.nomenclature.libelle) === param1
      );
      setselectedChildren1(selectedChildren);
    }
  }, [param1]);

  useEffect(() => {
    if (param2 && selectedChildren1) {
      const selectedChildren = selectedChildren1.nomenclature.children.find(
        (key) =>
          key.idArborescence === parseInt(param2) ||
          searchInJSON(selectedChildren1, param2)
      );
      console.log(selectedChildren, "newda");
      console.log(selectedChildren, "selectedChildren");
      setselectedChildren2(selectedChildren);
    }
  }, [selectedChildren1, param2]);

  const handleSearch = (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire
    // Appeler la fonction de recherche récursive
    setselectedChildren2("");
    if (termRef.current.value.length > 3) {
      const results = searchInJSON(jsonData, termRef.current.value);
      setSearchResults(results);
    }
  };

  const searchInJSON = (data, searchText) => {
    let results = [];
    let filterData;
    if (data && data.nomenclature && data.nomenclature.children) {
      filterData = data.nomenclature.children;
    } else {
      filterData = data;
    }
    // Parcourir chaque objet de l'arborescence
    if (filterData) {
      for (let i = 0; i < filterData.length; i++) {
        const item = filterData[i];
        // Vérifier si le libellé de l'objet contient le terme de recherche
        if (
          item.nomenclature &&
          item.nomenclature.libelle
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
          results.push(item);
        } else if (
          item.libelle &&
          item.libelle.toLowerCase().includes(searchText.toLowerCase())
        ) {
          results.push(item);
        } else if (
          item.referenceJuridique &&
          item.referenceJuridique
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
          results.push(item);
        }

        if (item && item.children && item.children.length > 0) {
          // Si l'objet a des enfants, effectuer la recherche récursive sur les enfants
          const childResults = searchInJSON(item.children, searchText);
          results = results.concat(childResults);
        } else if (
          item &&
          item.nomenclature &&
          item.nomenclature.children &&
          item.nomenclature.children.length
        ) {
          const childResults = searchInJSON(
            item.nomenclature.children,
            searchText
          );
          results = results.concat(childResults);
        }
      }
    }
    return results;
  };
  const copyTextToClipboard = (title, article,ref) => {
    const copyInput = document.createElement("input");
    copyInput.value = title + article + ref;
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand("copy");
    document.body.removeChild(copyInput);
  };
  const frArticle = (object) => {
    setBlocArticle(object);
    console.log(blocArticle.article, "blocArticle");
    console.log(blocArticle.title, "blocArticle");
  };
  console.log(blocArticle, "blocArticle");

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
                    ref={termRef}
                    placeholder="Rechercher par référence juridique"
                    required
                  />
                  <button type="submit" onClick={handleSearch}>
                    <span className="icon-search">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z"
                          fill="#F5F5FE"
                        />
                      </svg>{" "}
                    </span>
                  </button>
                </form>
              </div>
              <div className="filter-btn">
                <button className="btn-nat">Filtrer par NATINF</button>
                <a className="btn-statut">Filtrer par Statut</a>
              </div>
            </div>
            <div className="bloc-result">
              <h2 className="">
                {selectedChildren2 && selectedChildren2.libelle}{" "}
              </h2>
              {selectedChildren2 &&
                selectedChildren2.children.map((key, index) => (
                  <ul className="" key={index}>
                    <li>{key.libelle}</li>
                    <li>
                      {key.children.map((item) => (
                        <div key={item.id}>
                          <span>{item.libelle} /</span>
                          {item.children.map((keys) => (
                            <div key={keys.id}>
                              <span>{keys.libelle} </span>
                              {keys.children.map((article, index) => (
                                <ul className="" key={index}>
                                  <li>{article.referenceJuridique}</li>
                                </ul>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </li>
                  </ul>
                ))}

              {searchResults.map((key, index) => (
                <div className="section-result" key={index}>
                  <h2 className="title-result">
                    {key.parent && key.parent.libelle}
                  </h2>
                  {key.item.nomenclature ? (
                    <h3>{key.item.nomenclature.libelle}</h3>
                  ) : (
                    <ul className="section-article">
                      <li className="fr-article" key={index}>
                        <div className="legiTitre">
                          {key.item.legiSitereTitre}{" "}
                        </div>
                        <button
                          onClick={() => frArticle(key.item)}
                          className="refJuridique">
                          {key.item.referenceJuridique}{" "}
                        </button>
                        <button className="btn-copy"
                          onClick={() => copyTextToClipboard(
                            key.item.legiSitereTitre,
                            key.item.articleText,
                            key.item.referenceJuridique
                          )}>
                     <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_440_108676)">
                            <path
                              d="M12.6667 12V10C12.6667 9.82319 12.7369 9.65362 12.8619 9.52859C12.987 9.40357 13.1565 9.33333 13.3333 9.33333H21.3333C21.5101 9.33333 21.6797 9.40357 21.8047 9.52859C21.9298 9.65362 22 9.82319 22 10V19.3333C22 19.5101 21.9298 19.6797 21.8047 19.8047C21.6797 19.9298 21.5101 20 21.3333 20H19.3333V22C19.3333 22.368 19.0333 22.6667 18.662 22.6667H10.6713C10.5834 22.6672 10.4963 22.6503 10.4149 22.6171C10.3335 22.5838 10.2595 22.5348 10.1971 22.4729C10.1347 22.4109 10.0852 22.3372 10.0514 22.2561C10.0175 22.1749 10.0001 22.0879 10 22L10.002 12.6667C10.002 12.2987 10.302 12 10.6727 12H12.6667ZM11.3347 13.3333L11.3333 21.3333H18V13.3333H11.3347ZM14 12H19.3333V18.6667H20.6667V10.6667H14V12ZM12.6667 15.3333H16.6667V16.6667H12.6667V15.3333ZM12.6667 18H16.6667V19.3333H12.6667V18Z"
                              fill="#000091"
                            />
                          </g>
                          <rect
                            x="0.5"
                            y="0.5"
                            width="31"
                            height="31"
                            stroke="#000091"
                          />
                          <defs>
                            <clipPath id="clip0_440_108676">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(8 8)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="bloc-article">
            {Object.keys(blocArticle).length !== 0 ? (
              <div className="full-article">
                <h2>Principes</h2>
                <p className="full-ref">
                  {" "}
                  <span className="label-ref">Référence juridique</span>{" "}
                  <span className="value-ref">
                    {blocArticle.referenceJuridique}
                  </span>{" "}
                </p>
                <p className="full-ref">
                  {" "}
                  <span className="label-ref">
                    {" "}
                    Version en vigueur depuis le{" "}
                  </span>{" "}
                  <span className="value-ref">
                    {blocArticle.dateCreation}
                  </span>{" "}
                </p>
                <p className="full-ref">
                  {" "}
                  <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900801?init=true&page=1&query=L.1142-1&searchField=ALL&tab_selection=all">
                    Voir l'article dans Légifrance
                  </a>{" "}
                </p>
                <div className="filter-article">
                  <div className="btn-filter">
                    <button className="btn-article">
                      Contenu de l’article
                    </button>
                    <button className="btn-natinf">Codes NATINF</button>
                  </div>
                  <div className="article-text">
                    {" "}
                    {blocArticle.articleText &&
                      blocArticle.articleText.length &&
                      parse(blocArticle.articleText)}{" "}
                  </div>
                </div>
              </div>
            ) : (
              <div className="article-empty">
                <p>
                  {" "}
                  Sélectionner un article pour afficher son contenu et les codes
                  NATINF référencés.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSearch;

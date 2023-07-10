import { useRef, useState, useEffect } from "react";
import "./PageSearchGlobal.scss";
import { useParams, Link } from "react-router-dom";
import { normalizeString,copyTextToClipboard } from "../../Helpers/Function";
import jsonData from "../../Data/data.json";
import Search from "../Search/Search";

function PageSearchGlobal() {
  const { param1, param2 } = useParams();
  const termRef = useRef(param2);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChildren1, setselectedChildren1] = useState(null);
  const pageSize = 10; // Nombre d'objets à afficher par page
  const maxDisplayedPages = 7; // Maximum number of page buttons to display

  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePageChange = (page) => {
    scrollToTop();
    setCurrentPage(page);
    setPaginatedData(paginateData(searchResults, page, pageSize));
  };

  const paginateData = (data, page, pageSize) => {
    const startIndex = Math.max((page - 1) * pageSize, 0);
    const endIndex = Math.min(startIndex + pageSize, data.length);
    return data.slice(startIndex, endIndex);
  };
  const [paginatedData, setPaginatedData] = useState(
    paginateData(searchResults, currentPage, pageSize)
  ); // Données paginées pour affichage
  const totalPages = Math.ceil(searchResults.length / pageSize);

  const stockerObjets = (results) => {
    const nouveauxObjets = [];

    const parcourirJSON = (data) => {
      data.forEach((item) => {
        if (item.referenceJuridique) {
          nouveauxObjets.push(item);
        }
        if (item.children) {
          parcourirJSON(item.children);
        }
      });
    };

    parcourirJSON(results);

    setSearchResults(nouveauxObjets);
    console.log(searchResults, "searchResults");
    handlePageChange(1);
  };
  useEffect(() => {
    handlePageChange(1);
  }, [searchResults]);
  useEffect(() => {
    scrollToTop();
  }, [paginatedData]);

  useEffect(() => {
    setselectedChildren1(null);
    if (param1) {
      const selectedChildren = jsonData.find(
        (item) =>
          normalizeString(item.nomenclature.libelle) === normalizeString(param1)
      );
      setselectedChildren1(selectedChildren);
    }
  }, [param1]);

  useEffect(() => {
    if (param2 && selectedChildren1) {
      const results = searchInJSON(selectedChildren1, param2);
      stockerObjets(results);
    }
  }, [selectedChildren1, param2]);

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

  const getPageButtons = () => {
    const pageButtons = [];
    const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);
    let startPage = Math.max(currentPage - halfDisplayedPages, 1);
    let endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);
  
    if (endPage - startPage < maxDisplayedPages - 1) {
      startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
    }
  
    if (startPage > 1) {
      pageButtons.push(
        <button
          className="nbr-page"
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageButtons.push(
          <span className="dots-end" key="dots-start">
            ...
          </span>
        );
      }
    }
  
    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <button
          className={currentPage === page ? "nbr-page currentPage" : "nbr-page"}
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      );
    }
  
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span className="dots-end" key="dots-end">
            ...
          </span>
        );
      }
      pageButtons.push(
        <button
          className="nbr-page"
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      );
    }
  
    return pageButtons;
  };
  

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  console.log(paginatedData, "paginatedData ---");
  return (
    <div className="ResultSearch">
      <Search props={termRef} />
      <div className="container">
        <div className="section">
          <div className="filterGlobal-article">
            <ul>
              <li className="countResults">
                {" "}
                {searchResults.length} résultats
              </li>
              <li className="filter-label">Filtrer par </li>
              <li className="reset-filter">Réinitialiser les filtres</li>
              <li className="name-filter"> Nomenclature</li>
              <li className="category-filter">
                {param1} : {searchResults.length}
              </li>
            </ul>
          </div>
          <div className="content">
            <div className="all-results">
              {paginatedData &&
                paginatedData.map((key, index) => (
                  <div className="section-data" key={index}>
                    <p className="section-article">
                      <span className="key-title">
                        {key && key.legiSitereTitre}
                      </span>
                      <span className="label-ref">
                        <Link
                          to={`/detail-search/${normalizeString(param1)}/${
                            key.referenceJuridique
                          }`}>
                          {key && key.referenceJuridique}
                        </Link>
                      </span>
                      <button
                        className="copy-data"
                        onClick={() =>
                          copyTextToClipboard(
                            key.legiSitereTitre,
                            key.articleText,
                            key.referenceJuridique,
                          )
                        }>
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
                    </p>
                  </div>
                ))}
              <div className="pagination">
                <button
                  className="btn-prev"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}>
                  <span className="arrow-prev">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.21932 4.99999L5.51932 8.29999L4.57665 9.24266L0.333984 4.99999L4.57665 0.757324L5.51932 1.69999L2.21932 4.99999Z"
                        fill="#929292"
                      />
                    </svg>
                  </span>
                  Page précédente
                </button>
                {getPageButtons()}
                <button
                  className="btn-next"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}>
                  Page suivante
                  <span className="arrow-next">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.78047 7.99999L5.48047 4.69999L6.42314 3.75732L10.6658 7.99999L6.42314 12.2427L5.48047 11.3L8.78047 7.99999Z"
                        fill="#161616"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSearchGlobal;

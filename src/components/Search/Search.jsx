import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Search.scss";

function Search(data) {
  const [searchTerm, setSearchTerm] = useState(data.props.current);
  const [redirection, setRedirection] = useState(null);
  const navigate = useNavigate();

  const filterCode = "Légi-TRAVAIL";
  const redirectTo = `/search/${filterCode}/${searchTerm}`;
  
  useEffect(() => {
    if (redirection) {
      navigate(redirection);
    }
  }, [redirection, navigate]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Effectuer la redirection
      setRedirection(redirectTo);
    }
  };

  const searchClick =()=>{
    setRedirection(redirectTo);
  }
  return (
    <div className="container">
      <div className="search-bar">
        <div className="input-bar">
          <input
            onKeyPress={handleKeyPress}
            type="input"
            placeholder="Rechercher par référence juridique, mot ou expression"
            className=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          {searchTerm && searchTerm.length >1 && (          <span   onClick={(e) => setSearchTerm('')} className="icon-clear">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z"
                fill="#000091"
              />
            </svg>
          </span> ) }

        </div>
          <button className=""  onClick={() => searchClick()}>
            <p className="btn-search">
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
              <span className="label-icon">Rechercher </span>
            </p>
          </button>
      </div>
    </div>
  );
}

export default Search;

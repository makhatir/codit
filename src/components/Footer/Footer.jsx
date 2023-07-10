import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="fr-footer">
        <div className="container bloc-nav">
          <div className="logo">
            <img src="./logo.jpg" alt="Logo du site" />
          </div>
          <nav>
            <ul className="nav-link">
              <li>
                <a href="legifrance.gouv.fr">
                  legifrance.gouv.fr{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.66667 4.00098V5.33431H3.33333V12.6676H10.6667V9.33431H12V13.3343C12 13.7025 11.7015 14.001 11.3333 14.001H2.66667C2.29848 14.001 2 13.7025 2 13.3343V4.66764C2 4.29945 2.29848 4.00098 2.66667 4.00098H6.66667ZM14 2.00098V7.33431H12.6667V4.27631L7.47133 9.47231L6.52867 8.52964L11.7233 3.33431H8.66667V2.00098H14Z"
                      fill="#3A3A3A"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  gouvernement.fr{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.66667 4.00098V5.33431H3.33333V12.6676H10.6667V9.33431H12V13.3343C12 13.7025 11.7015 14.001 11.3333 14.001H2.66667C2.29848 14.001 2 13.7025 2 13.3343V4.66764C2 4.29945 2.29848 4.00098 2.66667 4.00098H6.66667ZM14 2.00098V7.33431H12.6667V4.27631L7.47133 9.47231L6.52867 8.52964L11.7233 3.33431H8.66667V2.00098H14Z"
                      fill="#3A3A3A"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  service-public.fr{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.66667 4.00098V5.33431H3.33333V12.6676H10.6667V9.33431H12V13.3343C12 13.7025 11.7015 14.001 11.3333 14.001H2.66667C2.29848 14.001 2 13.7025 2 13.3343V4.66764C2 4.29945 2.29848 4.00098 2.66667 4.00098H6.66667ZM14 2.00098V7.33431H12.6667V4.27631L7.47133 9.47231L6.52867 8.52964L11.7233 3.33431H8.66667V2.00098H14Z"
                      fill="#3A3A3A"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  data.gouv.fr{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.66667 4.00098V5.33431H3.33333V12.6676H10.6667V9.33431H12V13.3343C12 13.7025 11.7015 14.001 11.3333 14.001H2.66667C2.29848 14.001 2 13.7025 2 13.3343V4.66764C2 4.29945 2.29848 4.00098 2.66667 4.00098H6.66667ZM14 2.00098V7.33431H12.6667V4.27631L7.47133 9.47231L6.52867 8.52964L11.7233 3.33431H8.66667V2.00098H14Z"
                      fill="#3A3A3A"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="fr-nav">
        <div className="container">
          <nav>
            <ul className="nav-link">
              <li>
                <a href="#">Plan du site</a>
              </li>
              <li>
                <a href="#">Accessibilité</a>
              </li>
              <li>
                <a href="#">Mentions légales</a>
              </li>
              <li>
                <a href="#">Données personnelles</a>
              </li>
              <li>
                <a href="#">Gestion des cookies</a>
              </li>
            </ul>
          </nav>
          <p className="title-license">
            Sauf mention contraire, tous les contenus de ce site sont sous
            <a href="">
              licence etalab-2.0
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.66667 4.00098V5.33431H3.33333V12.6676H10.6667V9.33431H12V13.3343C12 13.7025 11.7015 14.001 11.3333 14.001H2.66667C2.29848 14.001 2 13.7025 2 13.3343V4.66764C2 4.29945 2.29848 4.00098 2.66667 4.00098H6.66667ZM14 2.00098V7.33431H12.6667V4.27631L7.47133 9.47231L6.52867 8.52964L11.7233 3.33431H8.66667V2.00098H14Z"
                  fill="#3A3A3A"
                />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

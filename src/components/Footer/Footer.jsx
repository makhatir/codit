import "./Footer.scss";

function Footer() {

    return (
    <footer>
      <div className="container">
        <div className="fr-footer">
          <div className="logo">
            <img src="./logo.jpg" alt="Logo du site" />
          </div>
          <nav>
            <ul className="nav-link">
              <li>
                <a href="legifrance.gouv.fr">legifrance.gouv.fr</a>
              </li>
              <li>
                <a href="#">gouvernement.fr</a>
              </li>
              <li>
                <a href="#">service-public.fr</a>
              </li>
              <li>
                <a href="#">data.gouv.fr</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

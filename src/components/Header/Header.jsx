import { Link } from 'react-router-dom';
import "./Header.scss";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="fr-header">
          <div className="logo">
          <Link to="/">
            <img src="./logo.jpg" alt="Logo du site" />
            </Link>
            <span className="site-title"> Cod'it</span>
          </div>
          <nav>
            <ul className="nav-link">
              <li>
                <a href="#">A propos</a>
              </li>
              <li>
                <a href="#">Favoris</a>
              </li>
              <li>
                <a href="#">Panier (8)</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

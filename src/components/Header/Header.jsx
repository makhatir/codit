import { Link } from "react-router-dom";
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
                <span className="icon-propos">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_802_7418)">
                      <path
                        d="M8.00004 14.6667C4.31804 14.6667 1.33337 11.682 1.33337 8.00001C1.33337 4.31801 4.31804 1.33334 8.00004 1.33334C11.682 1.33334 14.6667 4.31801 14.6667 8.00001C14.6667 11.682 11.682 14.6667 8.00004 14.6667ZM7.33337 7.33334V11.3333H8.66671V7.33334H7.33337ZM7.33337 4.66668V6.00001H8.66671V4.66668H7.33337Z"
                        fill="#000091"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_802_7418">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <a href="#">A propos</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

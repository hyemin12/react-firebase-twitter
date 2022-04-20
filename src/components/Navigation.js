import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHome,
  faMessage,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "css/navigation.css";

function Navigation() {
  function handleAlert() {
    alert("준비중인 서비스입니다.");
  }
  return (
    <nav>
      <ul>
        <li className="logo">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/30px-Twitter-logo.svg.png"
              alt="twitter"
            />
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/" onClick={handleAlert}>
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/" onClick={handleAlert}>
            <FontAwesomeIcon icon={faMessage} />
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/" onClick={handleAlert}>
            <FontAwesomeIcon icon={faEllipsis} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

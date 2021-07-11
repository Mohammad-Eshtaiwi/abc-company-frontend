import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { registerContext } from "../context";
import "../scss/components/nav.scss";
function Nav() {
  const context = useContext(registerContext);
  console.log(context);

  return (
    <nav className="nav">
      <Link to="/" className="nav__link">
        <img
          src="https://theme.zdassets.com/theme_assets/43400/8bb2a16f10c36a5d9f2f936784f0a66489f58870.png"
          alt="lol"
        />
      </Link>
      {context.token && (
        <ul className="nav__links">
          <li>
            <Link to="/" className="nav__link">
              home
            </Link>
            <Link to="/tickets" className="nav__link">
              tickets
            </Link>
            <Link
              to="/"
              onClick={() => {
                context.logout();
              }}
              className="nav__link"
            >
              log out
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;

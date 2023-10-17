import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navigation.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <div className="navbar">
        <Link to="/">Recipies</Link>
        <div className="menu" onMouseLeave={() => setShowMenu(false)}>
          <span onMouseEnter={() => setShowMenu(true)}>
            <FontAwesomeIcon icon={faGear} />
          </span>
          <ul className={`menu-items ${showMenu ? 'show' : ''}`}>
            <li>
              <NavLink to="/ingredients">Ingredients</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/tags">Tags</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

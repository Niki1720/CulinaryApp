import React from "react";
import {Link, NavLink} from "react-router-dom";
import './Navigation.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
      <nav>
        <div className="navbar">
          <Link to="/recipes" className="recipe-link">
            <div className="recipe-icon">
              <img src="recipe_icon.svg" alt="Recipe Icon" />
              <span>Recipe</span>
            </div>
          </Link>
            <div className="menu-icon menu-trigger" id="menu-icon">
                {/*<FontAwesomeIcon icon={faGear} />*/}
                <ul id="menu-items" className="menu-items">
                    <li>
                        <NavLink to="/ingredients">Ingredients</NavLink>
                    </li>
                    <li>
                        <NavLink to="/recipe_types">Categories</NavLink>
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

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navigation.scss';
import RecipeIcon from "./RecipeIcon";

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div className="navbar">
                <Link to="/recipes" className="recipe-link">
                    <div className="recipe-icon">
                        <RecipeIcon />
                        <span>Recipe</span>
                    </div>
                </Link>
                <div className={`menu-icon menu-trigger ${menuOpen ? 'open' : ''}`} id="menu-icon" onClick={toggleMenu}>
                    <img src="/solar_settings-outline.svg" alt="Custom Icon"/>
                    <ul id="menu-items" className={`menu-items ${menuOpen ? 'open' : ''}`}>
                        <li>
                            <NavLink to="/ingredients" onClick={toggleMenu}>Ingredients</NavLink>
                        </li>
                        <li>
                            <NavLink to="/recipe_types" onClick={toggleMenu}>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to="/tags" onClick={toggleMenu}>Tags</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

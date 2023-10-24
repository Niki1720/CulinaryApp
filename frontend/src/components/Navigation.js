import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import './Navigation.scss';
import RecipeIcon from "./icons/RecipeIcon";
import UserIcon from "./icons/UserIcon";

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div className="navbar">
                <div className="nav-section">
                    <Link to="/recipes" className="nav-link">
                        <div className="nav-icon">
                            <RecipeIcon/>
                            <span>Recipe</span>
                        </div>
                    </Link>
                    <Link to="/users" className="nav-link">
                        <div className="nav-icon">
                            <UserIcon/>
                            <span>Users</span>
                        </div>
                    </Link>
                </div>
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

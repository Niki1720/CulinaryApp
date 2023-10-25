import React, {useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import './Navigation.scss';
import RecipeIcon from "./icons/RecipeIcon";
import UserIcon from "./icons/UserIcon";
import { logout } from '../components/login/LoginActions';
import {Button} from "@mui/material";
import { useAdmin } from "./login/AdminContext";


const Navigation = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAdmin, setAdmin } = useAdmin()
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout()
        navigate('/login');
        setAdmin(false);;
    }
    return (
        <nav>
            <div className="navbar">
                <div className="nav-section">
                    { !isAdmin && (
                    <Link to="/recipes" className="nav-link">
                        <div className="nav-icon">
                            <RecipeIcon/>
                            <span>Recipe</span>
                        </div>
                    </Link>
                    )}
                    {isAdmin && (
                    <Link to="/users" className="nav-link">
                        <div className="nav-icon">
                            <UserIcon/>
                            <span>Users</span>
                        </div>
                    </Link>
                    )}
                </div>
                <div className="nav-buttons-container">
                    { !isAdmin && (
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
                    )}
                    <Button
                        className="nav-button"
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

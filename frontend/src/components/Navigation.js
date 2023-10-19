import React from "react";
import {Link} from "react-router-dom";
import './Navigation.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    return (
        <nav>
            <div className="navbar">
                <Link to="/recipes" className="recipe-link">
                    <div className="recipe-icon">
                        <img src="recipe_icon.svg" alt="Recipe Icon"/>
                        <span>Recipe</span>
                    </div>
                </Link>
                <FontAwesomeIcon icon={faGear} className={"customIcon"}/>
            </div>
        </nav>
    );
};

export default Navigation;

import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import IngredientsPage from "./components/ingredients/IngredientsList";
import Navigation from './components/Navigation';
import './App.scss'
import Ingredient from "./components/ingredients/IngredientForm";
import RecipeTypesPage from "./components/categories/RecipeTypesList";
import RecipeType from "./components/categories/RecipeTypeForm";
import TagsPage from "./components/tags/TagsList";
import TagForm from "./components/tags/TagForm";
import RecipePage from "./components/recipes/RecipesList";
import RecipeForm from "./components/recipes/RecipeForm";
import theme from "./theme";
import {ThemeProvider} from "@mui/styles";
import UsersPage from "./components/users/UsersList";
import UserForm from "./components/users/UserForm";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <Navigation/>
                    <div className="container">
                        <div className="list">
                            <Routes>
                                <Route path="/ingredients" element={<IngredientsPage/>}/>
                                <Route path="/ingredients/:id?" element={<Ingredient/>}/>
                                <Route path="/recipe_types" element={<RecipeTypesPage/>}/>
                                <Route path="/recipe_types/:id?" element={<RecipeType/>}/>
                                <Route path="/tags" element={<TagsPage/>}/>
                                <Route path="/tags/:id?" element={<TagForm/>}/>
                                <Route path="/recipes" element={<RecipePage/>}/>
                                <Route path="/recipes/:id?" element={<RecipeForm/>}/>
                                <Route path="/users" element={<UsersPage/>}/>
                                <Route path="/users/:id?" element={<UserForm/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;

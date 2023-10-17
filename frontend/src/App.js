import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IngredientsPage from "./components/ingredients/IngredientsList";
import Navigation from './components/Navigation';
import './App.scss'
import Ingredient from "./components/ingredients/IngredientForm";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container">
          <div className="list">
          <Routes>
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/ingredients/:id" element={<Ingredient />} />
            {/*<Route path="/categories" element={<CategoriesPage />} />*/}
            {/*<Route path="/tags" element={<TagsPage />} />*/}
            {/*<Route path="/" element={<HomePage />} />*/}
          </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

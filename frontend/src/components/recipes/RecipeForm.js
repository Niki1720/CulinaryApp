import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './RcipesActions';
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  MenuItem,
  Select, TextareaAutosize, InputLabel
} from "@mui/material";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    preparation_time: "",
    recipe_type_id: "",
    recipe_ingredients: [
      {
        ingredient_id: '',
        amount: '',
        unit: ''
      }
    ]
  })
  const navigate = useNavigate();
  const [recipeTypes, setRecipeTypes] = useState([])
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    actions.loadRecipeTypes((types) => {
      setRecipeTypes(types);
    });

    if (id !== "new") {
      actions.getRecipe(id, (recipeData) => {
        setFormData({
          name: recipeData.name,
          description: recipeData.description,
          preparation_time: recipeData.preparation_time,
          recipe_type_id: recipeData.recipe_type_id,
          recipe_ingredients: recipeData.recipe_ingredients.map((ingredient) => ({
            ingredient_id: ingredient.ingredient_id,
            amount: ingredient.amount,
            unit: ingredient.unit
          }))
        });
      });
    }

    actions.loadIngredients((ingredients) => {
      setAvailableIngredients(ingredients);
    });
  }, [id]);


  const handleSave = () => {
    if (id === "new") {
      const dataToSend = { ...formData, recipe_ingredients: JSON.stringify(formData.recipe_ingredients) };
      actions.saveRecipe(dataToSend, () => {
        navigate('/recipes');
      });
    } else {
      actions.saveRecipe({ ...formData, recipe_ingredients: JSON.stringify(formData.recipe_ingredients), id: id }, () => {
        navigate('/recipes');
      });
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData({ ...formData, name: newName });
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setFormData({ ...formData, description: newDescription });
  };

  const handlePreparationTimeChange = (e) => {
    const newPreparationTime = e.target.value;
    setFormData({ ...formData, preparation_time: newPreparationTime });
  };

  const handleRecipeTypeChange = (e) => {
    const newRecipeTypeId = e.target.value;
    setFormData({ ...formData, recipe_type_id: newRecipeTypeId });
  };


  const handleIngredientsChange = (e) => {
    const selectedIngredientNames = e.target.value;
    const selectedIngredientIds = selectedIngredientNames.map((name) => {
      const ingredient = availableIngredients.find((item) => item.name === name);
      return ingredient ? ingredient.id : null;
    });

    const selectedIngredientsWithInfo = selectedIngredientIds.map((ingredientId) => {
      const existingInfo = formData.recipe_ingredients.find((item) => item.ingredient_id === ingredientId);
      return {
        ingredient_id: ingredientId,
        amount: existingInfo ? existingInfo.amount : '',
        unit: existingInfo ? existingInfo.unit : ''
      };
    });

    setSelectedIngredientIds(selectedIngredientIds);

    setFormData({ ...formData, recipe_ingredients: selectedIngredientsWithInfo });
  };

  const handleAmountChange = (e, ingredientId) => {
    const newAmount = e.target.value;
    const updatedIngredients = formData.recipe_ingredients.map((item) =>
        item.ingredient_id === ingredientId
            ? { ...item, amount: newAmount }
            : item
    );
    setFormData({ ...formData, recipe_ingredients: updatedIngredients });
  };

  const handleUnitChange = (e, ingredientId) => {
    const newUnit = e.target.value;
    const updatedIngredients = formData.recipe_ingredients.map((item) =>
        item.ingredient_id === ingredientId
            ? { ...item, unit: newUnit }
            : item
    );
    setFormData({ ...formData, recipe_ingredients: updatedIngredients });
  };

  return (
    <div style={{width: "80%", margin: "auto"}}>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
              >
                Save
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={handleNameChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={formData.description}
                  onChange={handleDescriptionChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TextField
                  label="Preparation Time"
                  variant="outlined"
                  fullWidth
                  type="time"
                  value={formData.preparation_time}
                  onChange={handlePreparationTimeChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <InputLabel>Categories</InputLabel>
              <Select
                  variant="outlined"
                  fullWidth
                  value={formData.recipe_type_id}
                  onChange={handleRecipeTypeChange}
              >
                {recipeTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                ))}
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <InputLabel>Ingredients</InputLabel>
              <Select
                  variant="outlined"
                  fullWidth
                  value={selectedIngredientIds.map((id) => availableIngredients.find((ingredient) => ingredient.id === id).name)}
                  onChange={handleIngredientsChange}
                  multiple
              >
                {availableIngredients.map((ingredient) => (
                    <MenuItem key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </MenuItem>
                ))}
              </Select>
            </TableCell>
          </TableRow>
          {selectedIngredientIds.map((id) => (
              <TableRow key={id}>
                <TableCell>
                  <TextField
                      label="Amount"
                      variant="outlined"
                      fullWidth
                      value={formData.recipe_ingredients.find((item) => item.ingredient_id === id).amount}
                      onChange={(e) => handleAmountChange(e, id)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                      label="Unit"
                      variant="outlined"
                      fullWidth
                      value={formData.recipe_ingredients.find((item) => item.ingredient_id === id).unit}
                      onChange={(e) => handleUnitChange(e, id)}
                  />
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeForm;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Select,
  InputLabel,
} from "@mui/material";
import IngredientModal from "./IngredientModal";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    preparation_time: "",
    recipe_type_id: "",
    recipe_ingredients: [],
    recipe_tags: []
  })
  const navigate = useNavigate();
  const [recipeTypes, setRecipeTypes] = useState([])
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [isAddIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
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
          recipe_tags: recipeData.recipe_tags.map((tag) => tag.tag_id),
          recipe_ingredients: recipeData.recipe_ingredients.map((ingredient) => ({
            ingredient_id: ingredient.ingredient_id,
            amount: ingredient.amount,
            unit: ingredient.unit,
          })),
        });
      });
    }

    actions.loadIngredients((ingredients) => {
      setAvailableIngredients(ingredients);
    });

    actions.loadTags((tags) => {
      setAvailableTags(tags);
    });
  }, [id]);

  const handleSave = () => {
    if (id === "new") {
      const dataToSend = {
          name: formData.name,
          description: formData.description,
          preparation_time: formData.preparation_time,
          recipe_type_id: formData.recipe_type_id,
          recipe_ingredients_attributes: formData.recipe_ingredients,
          recipe_tags_attributes: formData.recipe_tags.map((tagId) => ({
          tag_id: tagId,
        })),
      };
      actions.saveRecipe(dataToSend, () => {
        navigate('/recipes');
      });
    } else {
      actions.saveRecipe({
          id: id,
          name: formData.name,
          description: formData.description,
          preparation_time: formData.preparation_time,
          recipe_type_id: formData.recipe_type_id,
          recipe_ingredients_attributes: formData.recipe_ingredients,
          recipe_tags_attributes: formData.recipe_tags.map((tagId) => ({
          tag_id: tagId,
        })),
      }, () => {
        navigate('/recipes');
      });
    }
  };

  const openAddIngredientModal = () => {
    setEditingIngredient(null);
    setAddIngredientModalOpen(true);
  };

  const closeAddIngredientModal = () => {
    setAddIngredientModalOpen(false);
    setEditingIngredient(null);
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

  const handleTagChange = (e) => {
    const selectedTags = e.target.value;
    setFormData({ ...formData, recipe_tags: selectedTags });
  };


  const updateFormData = (newIngredient) => {
    const existingIngredientIndex = formData.recipe_ingredients.findIndex((item) => item.ingredient_id === newIngredient.ingredient_id);

    if (existingIngredientIndex !== -1) {
      const updatedIngredients = [...formData.recipe_ingredients];
      updatedIngredients[existingIngredientIndex] = newIngredient;

      setFormData({
        ...formData,
        recipe_ingredients: updatedIngredients,
      });
    } else {
      setFormData({
        ...formData,
        recipe_ingredients: [...formData.recipe_ingredients, newIngredient],
      });
    }
  };


  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient);
    setAddIngredientModalOpen(true);
  };

  const handleDelete = (ingredientId) => {
    const updatedIngredients = formData.recipe_ingredients.filter(
        (ingredient) => ingredient.ingredient_id !== ingredientId
    );
    setFormData({
      ...formData,
      recipe_ingredients: updatedIngredients,
    });
  };

  return (
      <div style={{ width: "80vw", margin: "0 auto" }}>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: '16px' }}>
              <img
                  src="/recipe_icon.svg"
                  alt="Recipe Icon"
                  style={{
                    maxWidth: '24px',
                    maxHeight: '24px',
                    verticalAlign: 'middle',
                    marginRight: '8px'
                  }}
              />
            {formData.id ? `Recipes > ${formData.name}` :' Recipes > New'}
          </TableCell>
            <TableCell style={{textAlign: "right"}}>
              <Button
                  variant="contained"
                  style={{background: '#867DF0', borderRadius: "5px", textTransform: 'capitalize'}}
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
                  variant="outlined"
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
              <InputLabel>Tags</InputLabel>
              <Select
                  variant="outlined"
                  fullWidth
                  value={formData.recipe_tags}
                  onChange={handleTagChange}
                  multiple
              >
                {availableTags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </MenuItem>
                ))}
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <InputLabel>Ingredients</InputLabel>
            </TableCell>
            <TableCell>
              <InputLabel>Amount</InputLabel>
            </TableCell>
            <TableCell>
              <InputLabel>Unit</InputLabel>
            </TableCell>
          </TableRow>
          {formData.recipe_ingredients.map((ingredient) => (
              <TableRow key={ingredient.ingredient_id}>
                <TableCell>
                  {availableIngredients.find((item) => item.id === ingredient.ingredient_id)?.name}
                </TableCell>
                <TableCell>
                  {ingredient.amount}
                </TableCell>
                <TableCell>
                  {ingredient.unit}
                </TableCell>
                <TableCell>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(ingredient)}
                  >
                    Edytuj
                  </Button>
                  <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(ingredient.ingredient_id)}
                  >
                    Usuń
                  </Button>
                </TableCell>
              </TableRow>
          ))}

          <TableRow>
            <TableCell>
              <Button variant="contained" style={{background: '#867DF0', borderRadius: "5px", textTransform: 'capitalize'}} onClick={openAddIngredientModal}>
                Add Ingredient
              </Button>
            </TableCell>
          </TableRow>
          <IngredientModal
              open={isAddIngredientModalOpen}
              onClose={closeAddIngredientModal}
              onAddIngredient={(newIngredient) => updateFormData(newIngredient, editingIngredient?.ingredient_id)}
              availableIngredients={availableIngredients}
              editingIngredient={editingIngredient}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeForm;

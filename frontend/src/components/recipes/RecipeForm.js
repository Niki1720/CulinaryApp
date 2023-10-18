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
    name: "" ,
    description: "",
    preparation_time: "",
    recipe_type_id: "",
  });
  const navigate = useNavigate();
  const [recipeTypes, setRecipeTypes] = useState([])
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
        });
      });
    }
  }, [id]);

  const handleSave = () => {
    if (id === "new") {
      actions.saveRecipe(formData, () => {
        navigate('/recipes');
      });
    } else {
      actions.saveRecipe({ ...formData, id: id }, () => {
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
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeForm;

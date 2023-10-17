import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './RecipeTypesActions';
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper} from "@mui/material";

const RecipeType = () => {
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (id !== "new") {
      actions.getRecipeType(id, (recipeTypeData) => {
        setFormData({ name: recipeTypeData.name });
      });
    }
  }, [id]);


  const handleSave = () => {
    if (id === "new") {
      actions.saveRecipeType(formData, () => {
        navigate('/recipe_types');
      });
    } else {
      actions.saveRecipeType({ ...formData, id: id }, () => {
        navigate('/recipe_types');
      });
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData({ name: newName });
  };

  return (
    <div style={{width: "80%", margin: "auto"}}>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
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
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeType;

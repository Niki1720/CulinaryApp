import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './IngredientsActions';
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper} from "@mui/material";

const Ingredient = () => {
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (id) {
      actions.getIngredient(id, (ingredientData) => {
        setFormData({ name: ingredientData.name });
      });
    }
  }, [id]);

  const handleSave = () => {
    actions.saveIngredient(formData, () => {
      navigate('/ingredients');
    });
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
            <TableCell>Ingredient</TableCell>
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

export default Ingredient;

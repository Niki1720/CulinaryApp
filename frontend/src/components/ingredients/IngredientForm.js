import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './IngredientsActions';
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper} from "@mui/material";
import '../../App.scss'

const Ingredient = () => {
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (id !== "new") {
      actions.getIngredient(id, (ingredientData) => {
        setFormData({ name: ingredientData.name });
      });
    }
  }, [id]);

  const handleSave = () => {
    if (id === "new") {
      actions.saveIngredient(formData, () => {
        navigate('/ingredients');
      });
    } else {
      actions.saveIngredient({ ...formData, id: id }, () => {
        navigate('/ingredients');
      });
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData({ name: newName });
  };

  return (
    <div style={{width: "80%", height: '90vh', margin: "auto"}}>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: '20px' }}>
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
              {formData.id ? `Ingredients > ${formData.name}` :' Ingredients > New'}
            </TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span></span>
              <Button
                  variant="contained"
                  style={{ backgroundColor: '#867DF0', borderRadius: '10px', textTransform: 'capitalize' }}
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ margin: 'auto 100px', fontSize: "18px", color: '#6E7180'}}>
                  Name
                </div>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={handleNameChange}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Ingredient;

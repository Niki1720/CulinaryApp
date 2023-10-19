import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MenuItem, Select } from "@mui/material";
import './IngredientModal.scss'
import {Label} from "@mui/icons-material";

const IngredientModal = ({ open, onClose, onAddIngredient, availableIngredients, editingIngredient }) => {
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');
    const [selectedIngredientId, setSelectedIngredientId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingIngredientId, setEditingIngredientId] = useState(null);

    useEffect(() => {
        if (editingIngredient) {
            setSelectedIngredientId(editingIngredient.ingredient_id);
            setAmount(editingIngredient.amount);
            setUnit(editingIngredient.unit);
            setIsEditing(true);
            setEditingIngredientId(editingIngredient.ingredient_id);
        } else {
            clearForm();
        }
    }, [editingIngredient]);;

    const clearForm = () => {
        setSelectedIngredientId('');
        setAmount('');
        setUnit('');
        setIsEditing(false);
        setEditingIngredientId(null);
    };

    const handleAddIngredient = () => {
        const selectedIngredient = availableIngredients.find((ingredient) => ingredient.id === selectedIngredientId);

        if (selectedIngredient) {
            const newIngredient = {
                ingredient_id: selectedIngredient.id,
                amount,
                unit
            };

            if (isEditing) {
                onAddIngredient(newIngredient, editingIngredientId);
            } else {
                onAddIngredient(newIngredient);
            }

            clearForm();
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={() => { clearForm(); onClose(); }}>
            <div className="add-ingredient-modal">
                <Select
                    value={selectedIngredientId}
                    onChange={(e) => setSelectedIngredientId(e.target.value)}
                    className="form-input"
                >
                    {availableIngredients.map((ingredient) => (
                        <MenuItem key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-input"
                />
                <TextField
                    label="Unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="form-input"
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddIngredient}
                    className="form-button"
                >
                    {isEditing ? 'Save Ingredient' : 'Add Ingredient'}
                </Button>
            </div>
        </Dialog>
    );
};

export default IngredientModal;

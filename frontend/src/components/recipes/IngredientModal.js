import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './IngredientModal.scss';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const IngredientModal = ({
                             open,
                             onClose,
                             onAddIngredient,
                             availableIngredients,
                             editingIngredient,
                         }) => {
    const [isEditing, setIsEditing] = useState(false);

    const formik = useFormik({
        initialValues: {
            selectedIngredientId: '',
            amount: '',
            unit: '',
        },
        validationSchema: Yup.object({
            selectedIngredientId: Yup.string().required('Ingredient is required'),
            amount: Yup.number()
                .required('Amount is required')
                .moreThan(0, 'Amount must be greater than 0')
                .typeError('Amount must be a valid number'),
            unit: Yup.string().required('Unit is required'),
        }),
        onSubmit: (values) => {
            const selectedIngredient = availableIngredients.find(
                (ingredient) => ingredient.id === values.selectedIngredientId
            );

            if (selectedIngredient) {
                const newIngredient = {
                    ingredient_id: selectedIngredient.id,
                    _destroy: false,
                    amount: values.amount,
                    unit: values.unit,
                };

                onAddIngredient(newIngredient);
                clearForm();
                onClose();
            }
        },
    });

    useEffect(() => {
        if (editingIngredient) {
            setIsEditing(true);
            formik.setValues({
                selectedIngredientId: editingIngredient.ingredient.id,
                amount: editingIngredient.amount,
                unit: editingIngredient.unit,
            });
        } else {
            clearForm();
        }
    }, [editingIngredient]);

    const clearForm = () => {
        setIsEditing(false);
        formik.resetForm();
    };

    return (
        <Dialog open={open} onClose={() => clearForm()}>
            <div className="add-ingredient-modal">
                <Select
                    value={formik.values.selectedIngredientId}
                    onChange={formik.handleChange}
                    name="selectedIngredientId"
                    className="form-input"
                    error={
                        formik.touched.selectedIngredientId &&
                        Boolean(formik.errors.selectedIngredientId)
                    }
                >
                    {availableIngredients.map((ingredient) => (
                        <MenuItem key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                        </MenuItem>
                    ))}
                </Select>
                {formik.touched.selectedIngredientId &&
                    formik.errors.selectedIngredientId && (
                        <FormHelperText error>
                            {formik.errors.selectedIngredientId}
                        </FormHelperText>
                    )}

                <TextField
                    label="Amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    name="amount"
                    type="number"
                    className="form-input"
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                />
                {formik.touched.amount && formik.errors.amount && (
                    <FormHelperText error>{formik.errors.amount}</FormHelperText>
                )}

                <TextField
                    label="Unit"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                    name="unit"
                    className="form-input"
                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                />
                {formik.touched.unit && formik.errors.unit && (
                    <FormHelperText error>{formik.errors.unit}</FormHelperText>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={formik.handleSubmit}
                    className="form-button"
                >
                    {isEditing ? 'Save Ingredient' : 'Add Ingredient'}
                </Button>
            </div>
        </Dialog>
    );
};

export default IngredientModal;

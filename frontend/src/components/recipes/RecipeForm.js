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
    Select,
    InputLabel, FormHelperText, Grid, TextareaAutosize,
} from "@mui/material";
import IngredientModal from "./IngredientModal";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import RecipeIcon from "../RecipeIcon";
import theme from "../../theme";
import EditIcon from "../EditIcon";
import DeleteIcon from "../DeleteIcon";
import tagForm from "../tags/TagForm";

const RecipeForm = () => {
    const navigate = useNavigate();
    const [recipeTypes, setRecipeTypes] = useState([])
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [isAddIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        actions.loadRecipeTypes((types) => {
            setRecipeTypes(types);
        });

        actions.loadIngredients((ingredients) => {
            setAvailableIngredients(ingredients);
        });

        actions.loadTags((tags) => {
            setAvailableTags(tags);
        });

        if (id !== "new") {
            actions.getRecipe(id, (recipeData) => {
                formik.setValues({
                    name: recipeData.name,
                    description: recipeData.description,
                    preparation_time: recipeData.preparation_time,
                    recipe_type_id: recipeData.recipe_type.id,
                    recipe_tags: recipeData.tags.map(tag => tag.id),
                    recipe_ingredients: recipeData.recipe_ingredients
                });
            });
        }
    }, [id]);

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            preparation_time: "",
            recipe_type_id: "",
            recipe_ingredients: [],
            recipe_tags: []
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(5, 'Name must be at least 5 characters'),
            description: Yup.string()
                .required('Description is required')
                .min(15, 'Description must be at least 15 characters')
                .max(500, 'Description can be at most 500 characters'),
            preparation_time: Yup.number()
                .required('Preparation Time is required'),
            recipe_type_id: Yup.string()
                .required('Recipe Type is required'),
            recipe_tags: Yup.array()
                .min(1, 'At least one tag is required'),
            recipe_ingredients: Yup.array()
                .test('ingredients-check', 'At least one ingredient is required', function (value) {
                    const activeIngredients = value.filter(ingredient => !ingredient._destroy);
                    return activeIngredients.length > 0;
                })
        }),
        onSubmit: (values) => {
            const dataToSend = {
                name: values.name,
                description: values.description,
                preparation_time: values.preparation_time,
                recipe_type_id: values.recipe_type_id,
                recipe_ingredients_attributes: values.recipe_ingredients,
                tag_ids: values.recipe_tags
            };
            if (id === "new") {
                actions.saveRecipe(dataToSend, () => {
                    navigate('/recipes');
                });
            } else {
                actions.saveRecipe(
                    {
                        id: id, ...dataToSend,
                    },
                    () => {
                        navigate('/recipes');
                    }
                );
            }
        },
    });

    const openAddIngredientModal = () => {
        setEditingIngredient(null);
        setAddIngredientModalOpen(true);
    };

    const closeAddIngredientModal = () => {
        setAddIngredientModalOpen(false);
        setEditingIngredient(null);
    };

    const updateFormData = (newIngredient) => {
        const existingIngredientIndex = formik.values.recipe_ingredients.findIndex(
            (ingredient) => ingredient.ingredient.id === newIngredient.ingredient_id
        );

        if (existingIngredientIndex !== -1) {
            formik.setFieldValue(`recipe_ingredients[${existingIngredientIndex}].amount`, newIngredient.amount);
            formik.setFieldValue(`recipe_ingredients[${existingIngredientIndex}].unit`, newIngredient.unit);
        } else {
            const selectedIngredient = availableIngredients.find(
                (ingredient) => ingredient.id === newIngredient.ingredient_id
            );

            if (selectedIngredient) {
                newIngredient.ingredient = selectedIngredient;
                formik.values.recipe_ingredients.push(newIngredient);
                formik.setTouched({
                    ...formik.touched,
                    recipe_ingredients: formik.values.recipe_ingredients.map(() => true),
                });
            }
        }
    };

    const handleEdit = (ingredient) => {
        setEditingIngredient(ingredient);
        setAddIngredientModalOpen(true);
    };

    const handleDelete = (ingredientId) => {
        const index = formik.values.recipe_ingredients.findIndex(
            (ingredient) => ingredient.ingredient.id === ingredientId
        );

        if (index !== -1) {
            formik.setFieldValue(`recipe_ingredients[${index}]._destroy`, true);
        }
    };

    return (
        <Table component={Paper}>
            <TableHead>
                <TableRow>
                    <TableCell style={{...theme.tableCell, width: '100%'}}>
                        <div style={theme.flexContainer}>
                            <RecipeIcon/>
                            Recipe > {id === "new" ? "New" : formik.values.name}
                        </div>
                    </TableCell>
                    <TableCell style={theme.tableCell}>
                        <Button
                            variant="contained"
                            style={theme.buttonStyle}
                            onClick={formik.handleSubmit}
                        >
                            Save
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <Grid container style={{margin: "20px 0"}}>
                        <Grid item xs={4}>
                            <div style={theme.tableRow}>Name</div>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                    </Grid>
                </TableRow>
                <TableRow>
                    <Grid container style={{margin: "20px 0"}}>
                        <Grid item xs={4}>
                            <div style={theme.tableRow}>
                                Description
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <TextareaAutosize
                                minRows={10}
                                maxRows={15}
                                style={theme.texAreaStyle}
                                variant="outlined"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                    </Grid>
                </TableRow>
                <TableRow>
                    <Grid container style={{margin: "20px 0"}}>
                        <Grid item xs={4}>
                            <div style={theme.tableRow}>
                                Preparation time
                            </div>
                        </Grid>
                        <Grid item xs={8} style={{ display: 'flex', alignItems: 'flex-end'}}>
                            <TextField
                                variant="outlined"
                                type="number"
                                style={{width: "100px"}}
                                name="preparation_time"
                                value={formik.values.preparation_time}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.preparation_time && Boolean(formik.errors.preparation_time)}
                                helperText={formik.touched.preparation_time && formik.errors.preparation_time}
                            />
                            <div>
                                <span style={theme.recipeSpan}>min</span>
                            </div>
                        </Grid>
                    </Grid>
                </TableRow>
                <TableRow>
                    <Grid container style={{margin: "20px 0"}}>
                        <Grid item xs={4}>
                            <div style={theme.tableRow}>
                                Categories
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                variant="outlined"
                                fullWidth
                                name="recipe_type_id"
                                value={formik.values.recipe_type_id}
                                error={formik.touched.recipe_type_id && Boolean(formik.errors.recipe_type_id)}
                                onChange={formik.handleChange}
                            >
                                {recipeTypes.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.recipe_type_id && formik.errors.recipe_type_id && (
                                <FormHelperText error>{formik.errors.recipe_type_id}</FormHelperText>
                            )}
                        </Grid>
                    </Grid>
                </TableRow>
                <TableRow>
                    <Grid container style={{margin: "20px 0"}}>
                        <Grid item xs={4}>
                            <div style={theme.tableRow}>
                                Tag
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                variant="outlined"
                                fullWidth
                                name="recipe_tags"
                                value={formik.values.recipe_tags}
                                onChange={formik.handleChange}
                                multiple
                                error={formik.touched.recipe_tags && Boolean(formik.errors.recipe_tags)}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((tagId) => (
                                            <div
                                                key={tagId}
                                                style={theme.tagStyle}
                                            >
                                                {availableTags.find((tag) => tag.id === tagId)?.name.charAt(0)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            >
                                {availableTags.map((tag) => (
                                    <MenuItem key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.recipe_tags && formik.errors.recipe_tags && (
                                <FormHelperText error>{formik.errors.recipe_tags}</FormHelperText>
                            )}
                        </Grid>
                    </Grid>
                </TableRow>
                <Grid container style={{margin: "20px 0"}}>
                    <Grid item xs={4}>
                        <div style={theme.tableRow}>
                            Ingredients
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{...theme.tableHeadRecipe}}>
                            Ingredient
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={theme.tableHeadRecipe}>
                            Amount
                        </div>
                    </Grid>
                </Grid>
                {formik.values.recipe_ingredients
                    .filter((ingredient) => !ingredient._destroy)
                    .map((ingredient, index) => (
                        <div key={index}>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                </Grid>
                                <Grid item xs={4}>
                                    <div style={theme.tableRow}>
                                        {ingredient.ingredient.name}
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={theme.tableRow}>
                                            {ingredient.amount} {ingredient.unit}
                                        </div>
                                        <div style={{display: 'flex', gap: '4px'}}>
                                            <EditIcon onClick={() => handleEdit(ingredient)}/>
                                            <DeleteIcon onClick={() => handleDelete(ingredient.ingredient.id)}/>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ))
                }
                <Grid container style={{margin: "20px 0"}}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant="contained"
                                style={theme.buttonRecipe}
                                onClick={openAddIngredientModal}
                        >
                        <span style={{...theme.tableCell, padding: "5px"}}>
                                    + Add new
                        </span>
                        </Button>
                        {formik.values.recipe_ingredients
                            .filter((ingredient) => !ingredient._destroy)
                            .length === 0 && (
                            <FormHelperText error>
                                {formik.errors.recipe_ingredients}
                            </FormHelperText>
                        )}
                    </Grid>
                </Grid>
            </TableBody>
            <IngredientModal
                open={isAddIngredientModalOpen}
                onClose={closeAddIngredientModal}
                onAddIngredient={(newIngredient) => updateFormData(newIngredient, editingIngredient?.ingredient_id)}
                availableIngredients={availableIngredients}
                editingIngredient={editingIngredient}
            />
        </Table>

    )
        ;
};

export default RecipeForm;

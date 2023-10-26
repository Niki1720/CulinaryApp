import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './RecipeTypesActions';
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import RecipeIcon from "../icons/RecipeIcon";
import theme from "../../theme";
import ErrorsMessage from "../ErrorsMessage";

const RecipeType = () => {
  const [existingRecipeTypes, setExistingRecipeTypes] = useState([]);
  const [error, setError] = useState(null)
  const [initialRecipeTypeName, setInitialRecipeTypeName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const hideError = () => {
    setError(null);
  };

  useEffect(() => {
    actions.loadRecipeTypes((data) => {
      setExistingRecipeTypes(data);
    });

    if (id !== "new") {
      actions.getRecipeType(id, (recipeTypeData) => {
        formik.setValues({
          name: recipeTypeData.name
        })
        setInitialRecipeTypeName(recipeTypeData.name)
      });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
          .required('Name is required')
          .min(3, 'Name is too short')
          .test('is-unique', 'This name is already taken', (value) => {
            return !existingRecipeTypes.some((type) => type.name === value);
          }),
    }),
    onSubmit: (values) => {
      if (id === "new") {
        actions.saveRecipeType(values, (data, error) => {
          if (error) {
            if (error.response && error.response.status === 403) {
              setError("Nie masz uprawnień do tej operacji.");
            } else {
              setError("Wystąpił nieznany błąd podczas zapisywania kategorii.");
            }
            setTimeout(hideError, 5000);
          } else {
            setError(null);
            navigate('/recipe_types');
          }
        });
      } else {
        actions.saveRecipeType({ ...values, id: id }, (data, error) => {
          if (error) {
            if (error.response && error.response.status === 403) {
              setError("Nie masz uprawnień do tej operacji.");
            } else {
              setError("Wystąpił nieznany błąd podczas aktualizacji kategorii.");
            }
            setTimeout(hideError, 5000);
          } else {
            setError(null);
            navigate('/recipe_types');
          }
        });
      }
    }
  })

  return (
    <div style={{margin: "auto"}}>
      {error && (
          <ErrorsMessage message={error} />
      )}
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell style={theme.tableCell}>
              <div style={theme.flexContainer}>
                <RecipeIcon/>
                Category > {id === "new" ? "New" : initialRecipeTypeName}
              </div>
            </TableCell>
            <TableCell style={theme.flexButtonContainer}>
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
            <TableCell>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={theme.tableRow}>
                  Name
                </div>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeType;

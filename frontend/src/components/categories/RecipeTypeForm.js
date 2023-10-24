import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './RecipeTypesActions';
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import RecipeIcon from "../RecipeIcon";
import theme from "../../theme";

const RecipeType = () => {
  const [existingRecipeTypes, setExistingRecipeTypes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    actions.loadRecipeTypes((data) => {
      setExistingRecipeTypes(data);
    });

    if (id !== "new") {
      actions.getRecipeType(id, (recipeTypeData) => {
        formik.setValues({
          name: recipeTypeData.name
        })
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
        actions.saveRecipeType(values, () => {
          navigate('/recipe_types');
        });
      } else {
        actions.saveRecipeType({ ...values, id: id }, () => {
          navigate('/recipe_types');
        });
      }
    }
  })

  return (
    <div style={{margin: "auto"}}>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell style={theme.tableCell}>
              <div style={theme.flexContainer}>
                <RecipeIcon/>
                Category > {id === "new" ? "New" : formik.values.name}
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

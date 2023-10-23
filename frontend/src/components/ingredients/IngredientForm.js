import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './IngredientsActions';
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper} from "@mui/material";
import '../../App.scss'
import {useFormik} from "formik";
import * as Yup from 'yup';

const Ingredient = () => {
  const [existingIngredients, setExistingIngredients] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    actions.loadIngredients((data) => {
      setExistingIngredients(data);
    });

    if (id !== "new") {
      actions.getIngredient(id, (ingredientData) => {
        formik.setValues({
          name: ingredientData.name
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
            return !existingIngredients.some((ingredient) => ingredient.name === value);
          }),
    }),
    onSubmit: (values) => {
      if (id === "new") {
        actions.saveIngredient(values, () => {
          navigate('/ingredients');
        });
      } else {
        actions.saveIngredient({ ...values, id: id }, () => {
          navigate('/ingredients');
        });
      }
    },
  })

  return (
      <div style={{width: "80%", margin: "auto"}}>
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
              Ingredient > {id === "new" ? "New" : formik.values.name}
            </TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span></span>
              <Button
                  variant="contained"
                  style={{ backgroundColor: '#867DF0', borderRadius: '10px', textTransform: 'capitalize' }}
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
                <div style={{ margin: 'auto 100px', fontSize: "18px", color: '#6E7180'}}>
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

export default Ingredient;

import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './UsersActions';
import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Paper,
    Grid,
    Checkbox, FormControlLabel
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import theme from "../../theme";
import UserIcon from "../icons/UserIcon";

const UserForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(() => {
        if (id !== "new") {
            actions.getUser(id, (userData) => {
                formik.setValues({
                    email: userData.email,
                    password: userData.password,
                    admin: userData.admin
                })
            });
        }
    }, [id]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: '',
            admin: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email is required')
                .email('Invalid email format')
                .min(6, 'Email is too short')
                .max(30, 'Email is too long'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values) => {
            if (id === "new") {
                actions.saveUser(values, () => {
                    navigate('/users');
                });
            } else {
                actions.saveUser({...values, id: id}, () => {
                    navigate('/users');
                });
            }
        },
    })

    return (
        <div style={{margin: "auto"}}>
            <Table component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell style={theme.tableCell}>
                            <div style={theme.flexContainer}>
                                <UserIcon/>
                                User > {id === "new" ? "New" : formik.values.email}
                            </div>
                        </TableCell>
                        <TableCell style={theme.flexButtonContainer}>
                            <span></span>
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
                                <div style={theme.tableRow}>Email</div>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        name="admin"
                                        checked={formik.values.admin}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                }
                                    label="Admin"
                                    style={{...theme.customSpan, paddingLeft: "50px"}}
                                    />
                            </Grid>
                        </Grid>
                    </TableRow>
                    <TableRow>
                        <Grid container style={{margin: "20px 0"}}>
                            <Grid item xs={4}>
                                <div style={theme.tableRow}>Password</div>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                        </Grid>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default UserForm;

import React, { useState } from "react";
import { Button, FormGroup, Grid, TextField } from "@mui/material";
import "./LoginPage.scss";
import * as actions from './LoginActions';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorsMessage from "../ErrorsMessage";
import {useFormik} from "formik";
import * as Yup from "yup";

const LoginPage = () => {
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const hideError = () => {
        setError(null);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email is required')
                .email('Invalid email format')
                .min(6, 'Email is too short')
                .max(30, 'Email is too long'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            actions.login(values, (data, token, error) => {
                if (token) {
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token;
                    localStorage.setItem('isAdmin', data.admin ? 'true' : 'false');

                    const redirectToPath = data.admin ? "/users" : "/recipes";
                    navigate(redirectToPath);
                } else if (error.response.status === 401) {
                    setError('Nieprawidłowe dane logowania. Spróbuj ponownie.');
                    formik.resetForm();
                    setTimeout(hideError, 5000);
                } else {
                    setError('Wystąpił błąd podczas logowania. Spróbuj ponownie później.');
                    setTimeout(hideError, 5000);
                }
            });
        },
    });

    return (
        <div className="login-container">
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <form className="form-sign-in" onSubmit={formik.handleSubmit}>
                    <h2 className="form-sign-in-heading">Please sign in</h2>
                    {error && (
                        <ErrorsMessage message={error} />
                    )}
                    <FormGroup controlId="email">
                        <TextField
                            type="text"
                            name="email"
                            placeholder="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button className="sign-in-button" type="submit" fullWidth>
                            Sign in
                        </Button>
                    </FormGroup>
                </form>
            </Grid>
        </div>
    );
};

export default LoginPage;

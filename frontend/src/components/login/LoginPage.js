import React, { useState } from "react";
import { Button, FormGroup, Grid, TextField } from "@mui/material";
import "./LoginPage.scss";
import * as actions from './LoginActions';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorsMessage from "../ErrorsMessage";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = () => {
        actions.login(credentials, (data, token, error) => {
            if (token) {
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token;
                localStorage.setItem('isAdmin', data.admin ? 'true' : 'false');

                const redirectToPath = data.admin ? "/users" : "/recipes";
                navigate(redirectToPath);
            } else if (error) {
                setErrorMessage('Nieprawidłowe dane logowania. Spróbuj ponownie.');
                setCredentials({ email: "", password: "" });
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            } else {
                setErrorMessage('Wystąpił błąd podczas logowania. Spróbuj ponownie później.');
            }
        });
    };

    return (
        <div className="login-container">
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <form className="form-sign-in">
                    <h2 className="form-sign-in-heading">Please sign in</h2>
                    {errorMessage && (
                        <ErrorsMessage message={errorMessage} />
                    )}
                    <FormGroup controlId="email">
                        <TextField
                            type="text"
                            name="email"
                            placeholder="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={credentials.email}
                            onChange={handleChange}
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
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button className="sign-in-button" onClick={handleLogin} fullWidth>
                            Sign in
                        </Button>
                    </FormGroup>
                </form>
            </Grid>
        </div>
    );
};

export default LoginPage;

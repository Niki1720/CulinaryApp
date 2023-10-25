import React, { useState } from "react";
import { Button, FormGroup, Grid, TextField } from "@mui/material";
import "./LoginPage.scss";
import * as actions from './LoginActions';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = () => {
        actions.login(credentials, (data, token) => {
            if (token) {
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token;
                localStorage.setItem('isAdmin', data.admin ? 'true' : 'false');

                const redirectToPath = data.admin ? "/users" : "/recipes";
                navigate(redirectToPath);
            } else {
                navigate('/login');
            }
        });
    };

    return (
        <div className="login-container">
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <form className="form-sign-in">
                    <h2 className="form-sign-in-heading">Please sign in</h2>
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

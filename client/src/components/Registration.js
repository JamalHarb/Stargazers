import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const Registration = () => {
    const [formInfo, setFormInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const changeHandler = e => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', formInfo, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate('/userform');
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    }

    function SignForm(props) {
        const color = grey[50];
        return (
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                {...props}
            >
                {"Copyright © "}
                <Link color="inherit">
                    Stargazers
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        );
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: grey[50],
            },
        },
    });

    return (
        <div
            style={{
                backgroundColor: "hsl(0 0% 100% / 0.5)",
                maxWidth: "50%",
                marginLeft: "25%",
                borderRadius: "8px",
            }}
        >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={submitHandler}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={changeHandler}
                                    />
                                    {errors.firstName ? <p style={{ color: "gold" }}>{errors.firstName.message}</p> : ""}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={changeHandler}
                                    />
                                    {errors.lastName ? <p style={{ color: "gold" }}>{errors.lastName.message}</p> : ""}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={changeHandler}
                                    />
                                    {errors.email ? <p style={{ color: "gold" }}>{errors.email.message}</p> : ""}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={changeHandler}
                                    />
                                    {errors.password ? <p style={{ color: "orange" }}>{errors.password.message}</p> : ""}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={changeHandler}
                                    />
                                    {errors.confirmPassword ? <p style={{ color: "gold" }}>{errors.confirmPassword.message}</p> : ""}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link sx={{ color: "black" }} href="/" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <SignForm sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </div>






        // <div>
        //     <h1>Registration</h1>
        //     <form onSubmit={submitHandler}>
        //         <p>
        //             <label>First Name</label>
        //             <input type={"text"} name={"firstName"} onChange={changeHandler} />
        //             {errors.firstName ? <p style={{ color: "red" }}>{errors.firstName.message}</p> : ""}
        //         </p>
        //         <p>
        //             <label>Last Name</label>
        //             <input type={"text"} name={"lastName"} onChange={changeHandler} />
        //             {errors.lastName ? <p style={{ color: "red" }}>{errors.lastName.message}</p> : ""}
        //         </p>
        //         <p>
        //             <label>Email</label>
        //             <input type={"email"} name={"email"} onChange={changeHandler} />
        //             {errors.email ? <p style={{ color: "red" }}>{errors.email.message}</p> : ""}
        //         </p>
        //         <p>
        //             <label>Password</label>
        //             <input type={"password"} name={"password"} onChange={changeHandler} />
        //             {errors.password ? <p style={{ color: "red" }}>{errors.password.message}</p> : ""}
        //         </p>
        //         <p>
        //             <label>Confirm Password</label>
        //             <input type={"password"} name={"confirmPassword"} onChange={changeHandler} />
        //             {errors.confirmPassword ? <p style={{ color: "red" }}>{errors.confirmPassword.message}</p> : ""}
        //         </p>
        //         <input type={"submit"} value={"Register"} />
        //     </form>
        // </div>
    )
}

export default Registration

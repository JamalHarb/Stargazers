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

const Login = () => {

    const [formInfo, setFormInfo] = useState({
        email: "",
        password: ""
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
        axios.post('http://localhost:8000/api/login', formInfo, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate('/userform')
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.message);
            });
    }

    function LoginForm(props) {
        const color= grey[50];
      return (
        <Typography
          variant="body2"
          color="black"
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
      palette:{
        primary:{
            main:grey[50],
        }
      }
    });

    return (
        <div
      style={{
        backgroundColor: "hsl(0 0% 100% / 0.5)",
        maxWidth: "50%",
        marginLeft: "25%",
        borderRadius: "8px",
        maxHeight: "510px"
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
              Sign in
            </Typography>
            
            <Box
              component="form"
              onSubmit={submitHandler}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={changeHandler}
              />
              <TextField
                margin="normal"
                color="primary"
                sx={{ input: { color: "gold" } }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changeHandler}
              />
              {errors? <p style={{color: "gold", fontSize: "1.5rem"}}>{errors}</p>: ""}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link sx={{ color: "black" }} href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link sx={{ color: "black" }} href="/register" variant="body2">
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <LoginForm sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>







        // <div>
        //     <h1>Login</h1>
        //     {errors? <p style={{color: "red"}}>{errors}</p>: ""}
        //     <form onSubmit={submitHandler}>
        //         <p>
        //             <label>Email</label>
        //             <input type={"email"} name={"email"} onChange={changeHandler} />
        //         </p>
        //         <p>
        //             <label>Password</label>
        //             <input type={"password"} name={"password"} onChange={changeHandler} />
        //         </p>
        //         <input type={"submit"} value={"Login"} />
        //     </form>
        // </div>
    )
}

export default Login

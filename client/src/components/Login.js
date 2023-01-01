import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.message);
            });
    }

    return (
        <div>
            <h1>Login</h1>
            {errors? <p style={{color: "red"}}>{errors}</p>: ""}
            <form onSubmit={submitHandler}>
                <p>
                    <label>Email</label>
                    <input type={"email"} name={"email"} onChange={changeHandler} />
                </p>
                <p>
                    <label>Password</label>
                    <input type={"password"} name={"password"} onChange={changeHandler} />
                </p>
                <input type={"submit"} value={"Login"} />
            </form>
        </div>
    )
}

export default Login

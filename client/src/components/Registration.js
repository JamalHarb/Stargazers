import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        axios.post('http://localhost:8000/api/register', formInfo, {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate('/dashbord');
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    }

    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={submitHandler}>
                <p>
                    <label>First Name</label>
                    <input type={"text"} name={"firstName"} onChange={changeHandler} />
                    {errors.firstName? <p style={{color: "red"}}>{errors.firstName.message}</p>: ""}
                </p>
                <p>
                    <label>Last Name</label>
                    <input type={"text"} name={"lastName"} onChange={changeHandler} />
                    {errors.lastName? <p style={{color: "red"}}>{errors.lastName.message}</p>: ""}
                </p>
                <p>
                    <label>Email</label>
                    <input type={"email"} name={"email"} onChange={changeHandler} />
                    {errors.email? <p style={{color: "red"}}>{errors.email.message}</p>: ""}
                </p>
                <p>
                    <label>Password</label>
                    <input type={"password"} name={"password"} onChange={changeHandler} />
                    {errors.password? <p style={{color: "red"}}>{errors.password.message}</p>: ""}
                </p>
                <p>
                    <label>Confirm Password</label>
                    <input type={"password"} name={"confirmPassword"} onChange={changeHandler} />
                    {errors.confirmPassword? <p style={{color: "red"}}>{errors.confirmPassword.message}</p>: ""}
                </p>
                <input type={"submit"} value={"Register"} />
            </form>
        </div>
    )
}

export default Registration

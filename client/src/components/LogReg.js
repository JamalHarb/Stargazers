import React from 'react';
import Login from './Login';
import Registration from './Registration';

const LogReg = () => {
    const formStyle = {
        display: "flex",
        justifyContent: "space-around"
    }

    return (
        <div style={formStyle}>
            <Login />
            <Registration />
        </div>
    )
}

export default LogReg

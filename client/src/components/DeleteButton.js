import axios from 'axios';
import React from 'react';
import { Grid, Button } from "@mui/material";

const DeleteButton = (props) => {
    const deleteEvent = e => {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.delete('http://localhost:8000/api/events/' + props.eventId)
                .then(res => {
                    props.successCallback();
                })
        }
    }

    return (
        <div>
            <Button style={{
              background: "white",
              color: "black",
              border: "black",
              marginTop: '2%',
            }} onClick={deleteEvent}>Delete</Button>
        </div>
    )
}

export default DeleteButton

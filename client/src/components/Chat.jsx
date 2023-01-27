import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Chat = () => {
  const [socket] = useState(() => io(':8000'));

  const [text, setText] = useState("");
  const [loggedUser, setLoggedUser] = useState({});
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const [userId, setUserId] = useState("");

  const [error,setError] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/messages')
      .then(res => {
        console.log(res);
        setMessages(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    socket.on("chat", data => setMessages([data, ...messages]));
    // socket.on("user", data=> setMessage(data));
  }, [messages]);

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/message', {
      message: text,
      sender_id: userId,
    })
      .then(res => {
        console.log("response after creating message", res);
        socket.emit("chat1", {message: text, sender_id: loggedUser.firstName});
      })
      .catch(err => {
        console.log(err);
        setError(err.response.data.errors);
      });
    setText("");
  }

  const head = {
    margin: "0 auto",
    width: "50%",
    backgroundColor: "#dddddd",
    color: "black",
    // marginTop: "2rem",
    height: "4rem",
    border: "0.1rem solid black",
    fontWeight: "500",
  }

  const forMain = {
    margin: "0 auto",
    width: "50%",
    border: "0.1rem solid black",
    overflowY: "scroll",
  }

  const formessages = {
    backgroundColor: "#9fc5f8",
    width: "50%",
    overflowY: "auto",
    border: "0.1rem solid black",
    borderRadius: "1rem",
    margin:"0 auto",
    fontFamily:"cursive",
  }

  const forInput={
    width: "85%",
    height: "2rem",
    margin: "0.5rem 1rem 0.5rem 0",
  }

  const button={
    color: "white",
    backgroundColor: "#2b78e4",
    borderRadius: "0.5rem",
    boxShadow: "0.1rem 0.1rem black",
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/logged', { withCredentials: true })
      .then(res => {
        console.log(res);
        setUserId(res.data.user._id);
        setLoggedUser(res.data.user)
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      })
  }, []);

  return (loaded &&
    <>
    <NavBar />
    
    <div>
      <h2 style={head}>Welcome to Chat</h2>
      <br></br>
      <main style={forMain}>
        <p style={formessages}>{messages.map((msg, index) =>
          <p key={index}>{msg.sender_id.firstName? msg.sender_id.firstName:msg.sender_id} said {msg.message}</p>
        )}</p>
        <form onSubmit={onSubmit}>
          <input style={forInput} type="text" onChange={(e) => setText(e.target.value)} value={text} />
          {error.message? <p style={{color:"red"}}>{error.message.message}</p>: ""}
          <button disabled={text.replace(/\s/g,"").length<1} style={button}>Send</button>
        </form>
      </main>
    </div>
    </>
  )
}

export default Chat

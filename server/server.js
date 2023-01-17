const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookies = require('cookie-parser');
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookies());

require("./config/mongoose.config");
    
const AllMyUserRoutes = require("./routes/user.routes");
AllMyUserRoutes(app);

const AllMyEventRoutes = require("./routes/event.routes");
AllMyEventRoutes(app);

const AllMessagesRoutes = require ("./routes/message.routes");
AllMessagesRoutes(app);
    
const port = 8000;
const server = app.listen(port, () => console.log("The server is listening on port", port));

const io = require('socket.io')(server, {cors: true});
io.on("connection", socket =>{
    console.log(socket.id);
    socket.on("chat1",data=>{io.emit("chat",data)});
})
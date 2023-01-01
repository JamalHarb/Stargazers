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
    
const port = 8000;
app.listen(port, () => console.log("The server is listening on port", port));
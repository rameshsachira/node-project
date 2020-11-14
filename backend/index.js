const express = require('express');
const cors = require('cors');
require('dotenv').config();
require("./DBConnect/connectDB");
const app = express();

// import routes
const Routes = require("./Routes/routes");


app.use(express.json());
app.use(cors());

// middleware
app.use('/api', Routes)

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server is running on port : ${PORT}`));
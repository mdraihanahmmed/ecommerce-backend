require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConnection.js");
const routes = require("./routes");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
dbConnection();
app.use(routes);

app.listen(8000);

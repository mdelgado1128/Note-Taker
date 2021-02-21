
const express = require('express');
const path = require('path');
const htmlroute = require('./routes/htmlroutes')
const apiroute = require('./routes/apiroutes');
const fs = require("fs");
const uuid = require("uuid");


// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.use(apiroute);
app.use(htmlroute);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
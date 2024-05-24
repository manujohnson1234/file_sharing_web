const express = require('express');
const cros = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const dbconnection = require('./db/dbConnect');

const PORT = 8080;

app.use(express.json());
app.use(cros());
app.use(cookieParser());
dbconnection();

app.use('/',require('./router/router'));


app.listen(PORT, ()=>console.log(`server is listening in ${PORT}`));
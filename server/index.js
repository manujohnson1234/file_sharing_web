const express = require('express');
const cors = require('cors');
const app = express();
const dbconnection = require('./db/dbConnect');

const PORT = 8080;

app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
// app.use(cookieParser());
dbconnection();

app.use('/',require('./router/router'));


app.listen(PORT, ()=>console.log(`server is listening in ${PORT}`));
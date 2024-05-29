const express = require('express');
const bodyparser = require('body-parser');
const myReqLogger = require('./Utilities/requestLogger');
const route = require('./Routes/routing');
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin:"*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(bodyparser.json());
app.use(myReqLogger);
app.use('/', route);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

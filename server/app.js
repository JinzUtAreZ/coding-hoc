const express = require("express");

require("./connectdb/connectmongoose");
require("dotenv/config");
//require("dotenv").config();
const morgan = require("morgan");
const usersRoutes = require("./routers/users");
const jwtAuth = require("./utilities/jwtAuth");
const errorHandler = require("./utilities/errorHandler");

const app = express();
const api = process.env.API_URL;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny")); //TODO: logger of requests
app.use(jwtAuth()); // TODO: verifier of authentication
//console.log(api);

// TODO: api routes
app.use(`${api}/users`, usersRoutes);

app.use(errorHandler);

app.listen(port, () => {
  var datenow = new Date();
  console.log("Server is running in " + port + " starting: " + datenow);
});

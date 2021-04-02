const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" }); /// TODO: get file path of .env to access

let connectenv, connectparam;

// uncomment to production test
//if (!(!process.env.NODE_ENV || process.env.NODE_ENV === "development")) {
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  connectenv = process.env.MONGO_DB_LOCAL;
  /// TODO: for local ROBO 3t
  connectparam = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
} else {
  // production code
  connectenv = process.env.MONGO_DB_PROD;
  /// TODO: mongo atlas 2021
  connectparam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "coding-hoc",
  };
}

//console.log(connectenv);
mongoose
  .connect(
    connectenv,
    connectparam
    ///{
    /// TODO: for localhost connection
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
    /// TODO: end of localhost

    /// TODO: start of live connect
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //dbName: "coding-hoc",
    /// TODO: end mongo atlas 2021
    ///}
  )
  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => {
    console.error(err);
  });

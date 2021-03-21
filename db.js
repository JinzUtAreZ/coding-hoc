var firstRoute = require("./src/database/users.json");
var secondRoute = require("./src/database/products.json");
var thirdRoute = require("./src/database/db.json");

module.exports = () => ({
  users: firstRoute,
  products: secondRoute,
  dblist: thirdRoute,
});

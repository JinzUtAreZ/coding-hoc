var firstRoute = require("../client/src/database/users.json");
var secondRoute = require("../client/src/database/products.json");
var thirdRoute = require("../client/src/database/db.json");

module.exports = () => ({
  users: firstRoute,
  products: secondRoute,
  dblist: thirdRoute,
});

const db = require("./scalebydb");

db.addCat({ name: "biscuit", color: "orange" });
db.addCat({ name: "jungle", color: "black" });
db.addCat({ name: "smokey", color: "orange" });
db.addCat({ name: "fancy", color: "yellow" });
db.addCat({ name: "peep", color: "white" });
db.addCat({ name: "bread", color: "grey" });
db.addCat({ name: "crappy", color: "orange" });

var biscuit = db.findCatByName("biscuit");
var orange_cats = db.findCatsByColor("orange");

console.log("biscuit: ", biscuit);
console.log("orange cats: ", orange_cats);

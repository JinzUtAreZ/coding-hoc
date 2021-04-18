const http = require("http");
const { LocalStorage } = require("node-localstorage");
const db = new LocalStorage("./data");

/// IMPORTANT: COUNT has a SINGLE SOURCE of TRUTH
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    let requests = db.getItem("requests");
    db.setItem("requests", ++requests);
    console.log(`${process.pid}: ${requests}`);
    res.end(JSON.stringify(requests));
  }
});

server.listen(3000);
console.log("counting requests");

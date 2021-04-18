const http = require("http");
const options = [
  "Go for it!",
  "Maybe sleep on it",
  "Do some research",
  "I don't know",
  "Cut the crap",
  "Stop the bullshit",
];

/// IMPORTANT: pm2 modules testing check advancedNode.md

const server = http.createServer((req, res) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  const advice = options[randomIndex];
  const payload = JSON.stringify({
    processID: process.pid,
    advice,
  });
  console.log(`advice from  ${process.pid}: ${advice}`);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(payload);
});

server.listen(3000);
console.log("advice service running");

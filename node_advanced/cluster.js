const http = require("http");
const cluster = require("cluster");
const numCpus = require("os").cpus().length;
// IMPORTANT: Zero downtime
if (cluster.isMaster) {
  console.log("this is the master process", `${process.pid}`);
  for (let i = 0; i < numCpus; i++) {
    // NOTE: renew cpu instance
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`worker process ${process.pid} had died`);
    console.log(`only ${Object.keys(cluster.workers).length} remaining`);
    cluster.fork();
    console.log(`new worker process ${process.pid} started`);
  });
} else {
  console.log(`this is the worker process at ${process.pid}`);

  http
    .createServer((req, res) => {
      res.end(`process: ${process.pid}`);

      if (req.url === "/kill") {
        process.exit();
      } else if (req.url === "/") {
        console.log(`serving from ${process.pid}`);
      }
    })
    .listen(3000);
}

// NOTE: check processors
//const cpus = require("os").cpus();
//console.log(cpus);

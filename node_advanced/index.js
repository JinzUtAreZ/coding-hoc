const { fork } = require("child_process");
// IMPORTANT: FORKING to MULTIPLE instances
const processes = [
  fork("./app", ["3001"]),
  fork("./app", ["3002"]),
  fork("./app", ["3003"]),
];

console.log(`forked ${processes.length} processes`);

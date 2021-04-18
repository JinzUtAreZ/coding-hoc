# FORKING

multiple instances of http servers

# Cluster

multiple cores distributed to main and workers per cpu
install pm2 for zero downtime
sudo npm i -g pm2

# for load testing

1. sudo npm install loadtest -g
2. loadtest -n 300 http://localhost:3000
3. pm2 start app.js -i 3 (run 3 instances of app)
4. pm2 stop app (stop pm2, ctrl c not applicable) OR pm2 stop all
5. pm2 delete app (remove instances in pm2) OR pm2 delete all
6. pm2 start app.js -i -1 (run instances based on processor)
7. pm2 list (check all runned instances)
8. pm2 logs (check logs)
9. pm2 monit (visual)
10. pm2 reload app (refresh)

# for count in several instances

1. npm i node-localstorage

# Sharding = horizontal partitioning-scaling

1. run node scalebyname.js
   this will generate data-a-m, data-m-z and scale through scalebydb.js to distribute data by name

# Microservices focus in single function modules, that is pieces of an app work independently, but together as system.

# Orchestration

1. API Orchestration - single api to colaborate all microservices to users.
2. Messaging Layer - middleware to communicate to microservices,
   queue when service is down

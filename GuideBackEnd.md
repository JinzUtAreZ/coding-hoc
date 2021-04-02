# IMPORTANT always go to server folder then run

1. npm run dev -- client and server (mock db)
2. npm run mongo -- server (robo3t { dev } or mongo atlas { live })

# backEnd RESTFUL API

1. npm install concurrently json-server
2. package.json (files client (front) server (back) separate folder)

# "scripts": {

    "start": "cd ../ && npm start --prefix client",
    "mock": "json-server --watch db.js --port 5000",
    "dev": "concurrently \"npm run mock\" \"npm run start\"",
    "client-install": "npm install --prefix client"
    "mongo": "nodemon app.js"

}

3. check gitignore files in both folders
4. npm i express jsonwebtoken nodemon dotenv mongoose morgan validator bcrypt
5. create main routes named app.js and connectdb mongoose
6. store key values in .env file for security include in .gitignore
7. create models of all schemas
8. mongoose can create 'pre' for middleware before mongoose operations, 'statics' for custom function when querying documents, 'methods' for custom data manipulation.
9. npm i express-jwt
10.

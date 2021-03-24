# IMPORTANT always go to server folder then run npm run dev

# backEnd RESTFUL API

1. npm install concurrently json-server
2. package.json (files client (front) server (back) separate folder)

# "scripts": {

    "start": "cd ../ && npm start --prefix client",
    "mock": "json-server --watch db.js --port 5000",
    "dev": "concurrently \"npm run mock\" \"npm run start\"",
    "client-install": "npm install --prefix client"

}

3. check gitignore files in both folders

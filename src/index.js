const fs = require("fs");
const config = require("../config.json");
const Avon = require("./structures/Client.js");
const client = new Avon();
module.exports = client;

if (config.repl_user) {
  const express = require("express");
  const http = require("http");

  const app = express();

  app.get("/", (req, res) => {
    
  });

  const server = http.createServer(app);

  server.listen(3000, () => {
    console.log("Replit Mode On Webpage Online Port 3000");
  });
}

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;
const ping = require("ping");

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET route for /listen
app.get("/listen", async (req, res) => {
  console.log("Received GET requestt from Alpha Server!!! ");
  res.send("I am listening ");
  // await getPublicIP();
});

// POST route for /listen
app.post("/listen", (req, res) => {
  console.log("Received POST request on /listen");
  console.log("Request body:", req.body);
  res.send("POST request received");
});
const targetServers = [
  "103.232.255.91",
  "103.232.255.90",
  "103.232.255.92",
  "202.59.254.101",
];

app.get("/pingservers", async (req, res) => {
  const pingResults = await Promise.all(
    targetServers.map(async (targetServer) => {
      // Ping the target server
      const isAlive = await ping.promise.probe(targetServer);
      const status = isAlive ? "alive" : "dead";
      return { targetServer, status };
    })
  );

  console.log("Ping results:", pingResults);
  res.json(pingResults);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

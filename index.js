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

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 10, // limit each IP to 10 requests per windowMs
});

app.use(limiter);

// GET route for /pingserversalpha
app.get("/pingserversalpha", async (req, res) => {
  const pingResults = await Promise.allSettled(
    targetServers.map(async (targetServer) => {
      try {
        const response = await axios.get(`http://${targetServer}`, {
          timeout: 5000, // Timeout after 5 seconds
        });

        if (response.status === 200) {
          return { targetServer, status: "alive" };
        } else {
          throw new Error("Server returned non-200 status code");
        }
      } catch (error) {
        return { targetServer, status: "dead", error: error.message };
      }
    })
  );

  const formattedResults = pingResults.map((result) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        targetServer: "N/A",
        status: "dead",
        error: result.reason.message,
      };
    }
  });

  console.log("Ping results:", formattedResults);
  res.json(formattedResults);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

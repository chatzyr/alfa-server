const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;


async function getPublicIP() {
  try {
    const response = await axios.get('https://api64.ipify.org?format=json');
    const ip = response.data.ip;
    console.log('Your public IP address is:', ip);
  } catch (error) {
    console.error('Error fetching public IP:', error.message);
  }
}
// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET route for /listen
app.get('/listen', async (req, res) => {
    console.log('Received GET requestt ');

    await getPublicIP();
res.send('TAHIR');
   // const queryParam = req.query.queryParam; // assuming your query parameter is named 'queryParam'
   // console.log('Query Pramsss '+queryParam);
  // Make sure a query parameter is provided
  // if (!queryParam) {
  //   return res.status(400).json({ error: 'Query parameter is required' });
  // }
// try {
//     // Define the URL to which you want to send the POST request
//     const apiUrl = queryParam; // Replace with your desired URL
    
//     // Send the POST request using Axios
//     const response = await axios.post(apiUrl, { queryParam });

//     // Send the JSON response from the other API to the client
//     res.json(response.data);
//   } catch (error) {
//     // Handle any errors that may occur during the request
//     console.error('Error making Axios POST request:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
  

});

// POST route for /listen
app.post('/listen', (req, res) => {
  console.log('Received POST request on /listen');
  console.log('Request body:', req.body);
  res.send('POST request received');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

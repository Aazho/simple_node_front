const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const fastApiUrl = process.env.FASTAPI_URL;
const apiUrl = `${fastApiUrl}/post-example/`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
  try {
    const username = req.body.username;

    const response = await axios.post(apiUrl, {
      username: username
    });

    if (response.status === 200) {
      res.send('Username sent successfully!');
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal server error');
  }
});

app.listen(80, () => {
  console.log('Server is running on http://localhost:80');
});
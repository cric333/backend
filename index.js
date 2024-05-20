const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');
// Middleware to enable CORS
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get("/",async (req, res)=>{
  return res.status(200).json({
    title:"Backend",
    message:'Working Fine'
  })})

app.get([ '/api/data1','/api/data2', '/api/data3', '/api/data4', '/api/data5'], async (req, res) => {
  try {
    const storedData = fs.readFileSync(FILE_PATH, 'utf8');
    const parsedData = JSON.parse(storedData);

    const userIds = {
      '/api/data1': parsedData.id1,
      '/api/data2': parsedData.id2,
      '/api/data3': parsedData.id3,
      '/api/data4': parsedData.id4,
      '/api/data5': parsedData.id5
    };
    const userId = userIds[req.path];
    if (!userId) {
      throw new Error('User ID not found for this route');
    }
    const headers = {
      'Accept-Encoding': 'gzip',
      'Accept-Language': 'en',
      'appId': 'in.probo.pro',
      'Authorization': 'Bearer DmcIY/X8DY3G25csSB7WmmsaVM4WX+siNWD7c8l70rk=',
      'Connection': 'Keep-Alive',
      'Content-Type': 'application/json',
      'Host': 'prod.api.probo.in',
      'If-None-Match': 'W/"2f-wzv4xhcQLCJjwXnFBenza8nQjdk"',
      'session_id': 'fb334833-442b-4db7-948e-845cb6458cf8',
      'User-Agent': 'okhttp/4.10.0',
      'x-device-id': '32db1ea301e4eff8',
      'x-device-os': 'ANDROID',
      'x-os-version': '31',
      'x-version-code': '301',
      'x-version-name': '5.81.4'
    };

    // Make request to the API
    const response = await axios.get(`https://prod.api.probo.in/api/v1/user/${userId}/tradedEvents?page=1&live_event=1`, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  app.get([ '/api/profile1','/api/profile2', '/api/profile3', '/api/profile4', '/api/profile5'], async (req, res) => {
    const storedData = fs.readFileSync(FILE_PATH, 'utf8');
    const parsedData = JSON.parse(storedData);
    const profileIds = {
      '/api/profile1': parsedData.id1,
      '/api/profile2': parsedData.id2,
      '/api/profile3': parsedData.id3,
      '/api/profile4': parsedData.id4,
      '/api/profile5': parsedData.id5
    };
    try {
      const profile = profileIds[req.path];
      if (!profile) {
        throw new Error('User ID not found for this route');
      }
      const headers = {
        'Accept-Encoding': 'gzip',
        'Accept-Language': 'en',
        'appId': 'in.probo.pro',
        'Authorization': 'Bearer DmcIY/X8DY3G25csSB7WmmsaVM4WX+siNWD7c8l70rk=',
        'Cache-Control': 'public, max-age=60',
        'Connection': 'Keep-Alive',
        'Content-Type': 'application/json',
        'Host': 'prod.api.probo.in',
        'If-None-Match': 'W/"ab3-sEymgQEpEGCaSnklL7Rmvl7Oxmc"',
        'session_id': 'fb334833-442b-4db7-948e-845cb6458cf8',
        'User-Agent': 'okhttp/4.10.0',
        'x-device-id': '32db1ea301e4eff8',
        'x-device-os': 'ANDROID',
        'x-os-version': '31',
        'x-version-code': '301',
        'x-version-name': '5.81.4'
      };
  
      // Make request to the API
      const response = await axios.get(`https://prod.api.probo.in/api/v2/user/${profile}/profile`, { headers });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  const FILE_PATH = 'data.json';

  // Define a route to handle POST requests for storing data
  app.post('/store', (req, res) => {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }
    try {
      fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
      return res.json({ message: 'Data stored successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.get('/retrieve', (req, res) => {
    try {
      const storedData = fs.readFileSync(FILE_PATH, 'utf8');
      const parsedData = JSON.parse(storedData);
      return res.json(parsedData);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
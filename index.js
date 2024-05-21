const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const PORT = process.env.PORT || 5000;
const URL = process.env.PORT || 5000;
// Middleware to enable CORS
app.use(cors());
const bodyParser = require('body-parser');

FILE_PATH='./data.json'

const uri = 'mongodb+srv://cricketzone333:ddHcjyXiXfX57Vlr@cluster0.snxxpyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        db = client.db('data');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

connectToDatabase();

app.use(bodyParser.json());

  app.get("/",async (req, res)=>{
    return res.status(200).json({
      title:"Backend",
      message:'Working Fine'
    })})

  app.get([ '/api/data1','/api/data2', '/api/data3', '/api/data4', '/api/data5'], async (req, res) => {
    try {
      // const storedData = fs.readFileSync(FILE_PATH, 'utf8');
      // const parsedData = JSON.parse(storedData);
      const collection = db.collection('main');
      const parsedData = await collection.findOne({});
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
    // const storedData = fs.readFileSync(FILE_PATH, 'utf8');
    // const parsedData = JSON.parse(storedData);
    const collection = db.collection('main');
    const parsedData = await collection.findOne({});

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

  app.post('/store', async (req, res) => {
      const data = req.body;
      if (!data) {
          return res.status(400).json({ error: 'No data provided' });
      }
      try {
          const collection = db.collection('main');
          if (!data._id) {
              data._id = new ObjectId();
          }
          const result = await collection.findOneAndUpdate(
              { _id: data._id },
              { $set: data },
              { upsert: true }
          );
          return res.json({ message: 'Data stored/updated successfully', id: data._id });
      } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  });

  const retrieveData = async (req, res) => {
    try {
        const collection = db.collection('main');
        const responseData = await collection.findOne({});
        return res.json(responseData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  };
  app.get('/retrieve',retrieveData), 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
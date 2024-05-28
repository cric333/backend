const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const uri = 'mongodb+srv://cricketzone333:ddHcjyXiXfX57Vlr@cluster0.snxxpyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const URL = process.env.PORT || 5000;
// Middleware to enable CORS
app.use(cors());
app.use(bodyParser.json());

FILE_PATH='./data.json'

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
}

connectToDatabase();

  app.get("/",async (req, res)=>{
    return res.status(200).json({
      title:"Backend",
      message:'Working Fine'
    })})

  app.get([ '/api/data1','/api/data2', '/api/data3', '/api/data4', '/api/data5'], async (req, res) => {
    try {
      // const storedData = fs.readFileSync(FILE_PATH, 'utf8');
      // const parsedData = JSON.parse(storedData);
      const db = client.db('data');
      const collection = db.collection('main');
      const objectId = new ObjectId('6656111a7a5d01ddd0a81ec8');
      const parsedData = await collection.findOne({ _id: objectId });
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
        'Authorization': 'Bearer 6gbXLGYJE706+r3w0wbznHxLOh4O0IcerWuX93LMunQ=',
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
    const db = client.db('data');
    const collection = db.collection('main');
    const objectId = new ObjectId('6656111a7a5d01ddd0a81ec8');
    const parsedData = await collection.findOne({ _id: objectId });

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
        'Authorization': 'Bearer 6gbXLGYJE706+r3w0wbznHxLOh4O0IcerWuX93LMunQ=',
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

  app.get([ '/api/cricket/data1','/api/cricket/data2', '/api/cricket/data3', '/api/cricket/data4', '/api/cricket/data5'], async (req, res) => {
    try {
      const db = client.db('data');
      const collection = db.collection('main');
      const objectId = new ObjectId('665611607a5d01ddd0a81ecd');
      const parsedData = await collection.findOne({ _id: objectId });
      const userIds = {
        '/api/cricket/data1': parsedData.id1,
        '/api/cricket/data2': parsedData.id2,
        '/api/cricket/data3': parsedData.id3,
        '/api/cricket/data4': parsedData.id4,
        '/api/cricket/data5': parsedData.id5
      };
      const userId = userIds[req.path];
      if (!userId) {
        throw new Error('User ID not found for this route');
      }
      const headers = {
        'Accept-Encoding': 'gzip',
        'Accept-Language': 'en',
        'appId': 'in.probo.pro',
        'Authorization': 'Bearer 6gbXLGYJE706+r3w0wbznHxLOh4O0IcerWuX93LMunQ=',
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

  app.get([ '/api/cricket/profile1','/api/cricket/profile2', '/api/cricket/profile3', '/api/cricket/profile4', '/api/cricket/profile5'], async (req, res) => {
    // const storedData = fs.readFileSync(FILE_PATH, 'utf8');
    // const parsedData = JSON.parse(storedData);
    const db = client.db('data');
    const collection = db.collection('main');
    const objectId = new ObjectId('665611607a5d01ddd0a81ecd');
    const parsedData = await collection.findOne({ _id: objectId });
  
    const profileIds = {
      '/api/cricket/profile1': parsedData.id1,
      '/api/cricket/profile2': parsedData.id2,
      '/api/cricket/profile3': parsedData.id3,
      '/api/cricket/profile4': parsedData.id4,
      '/api/cricket/profile5': parsedData.id5
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
        'Authorization': 'Bearer 6gbXLGYJE706+r3w0wbznHxLOh4O0IcerWuX93LMunQ=',
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

  app.get([ '/api/youtube/data1','/api/youtube/data2', '/api/youtube/data3', '/api/youtube/data4', '/api/youtube/data5'], async (req, res) => {
    try {
      const db = client.db('data');
      const collection = db.collection('main');
      const objectId = new ObjectId('6656116a7a5d01ddd0a81ece');
      const parsedData = await collection.findOne({ _id: objectId });
      const userIds = {
        '/api/youtube/data1': parsedData.id1,
        '/api/youtube/data2': parsedData.id2,
        '/api/youtube/data3': parsedData.id3,
        '/api/youtube/data4': parsedData.id4,
        '/api/youtube/data5': parsedData.id5
      };
      const userId = userIds[req.path];
      if (!userId) {
        throw new Error('User ID not found for this route');
      }
      const headers = {
        'Accept-Encoding': 'gzip',
        'Accept-Language': 'en',
        'appId': 'in.probo.pro',
        'Authorization': 'Bearer 6gbXLGYJE706+r3w0wbznHxLOh4O0IcerWuX93LMunQ=',
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

  app.get([ '/api/youtube/profile1','/api/youtube/profile2', '/api/youtube/profile3', '/api/youtube/profile4', '/api/youtube/profile5'], async (req, res) => {
    // const storedData = fs.readFileSync(FILE_PATH, 'utf8');
    // const parsedData = JSON.parse(storedData);
    const db = client.db('data');
    const collection = db.collection('main');
    const objectId = new ObjectId('6656116a7a5d01ddd0a81ece');
    const parsedData = await collection.findOne({ _id: objectId });
    const profileIds = {
      '/api/youtube/profile1': parsedData.id1,
      '/api/youtube/profile2': parsedData.id2,
      '/api/youtube/profile3': parsedData.id3,
      '/api/youtube/profile4': parsedData.id4,
      '/api/youtube/profile5': parsedData.id5
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
        'Authorization': 'Bearer 6gbXLGYJE706+r3w0wbznHxLOh4O0IcerWuX93LMunQ=',
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

  app.post([ '/store1','/store2', '/store3'], async (req, res) => {
      const data = req.body;
      if (!data) {
          return res.status(400).json({ error: 'No data provided' });
      }
      try {
          const db = client.db('data');
          const collection = db.collection('main');
          const filter = { _id: new ObjectId(data._id) };
          const { _id, ...updateData } = data;
          const result = await collection.updateOne(filter, { $set: updateData });
          return res.json({ message: 'Data stored/updated successfully' });
      } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  });

  const retrieveData = async (req, res) => {
    try {
        const db = client.db('data');
        const collection = db.collection('main');
        let Id;
        switch(req.path) {
            case '/retrieve1':
                Id = '6656111a7a5d01ddd0a81ec8';
                break;
            case '/retrieve2':
                Id = '665611607a5d01ddd0a81ecd';
                break;
            case '/retrieve3':
                Id = '6656116a7a5d01ddd0a81ece';
                break;
            default:
                return res.status(404).json({ error: 'Invalid route' });
        }
        const objectId = new ObjectId(Id);
        const responseData = await collection.findOne({ _id: objectId });
        if (!responseData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        return res.json(responseData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

app.get(['/retrieve1', '/retrieve2', '/retrieve3'], retrieveData);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
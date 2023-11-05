const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
    res.send('Jobs related server is running')
})

app.listen(port, () => {
    console.log(`jobs  is Running on port ${port}`);
});
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// jobsrelated
// OImWWW3SdcOyX9uI



// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jobsrelated:OImWWW3SdcOyX9uI@cluster0.lnrotgp.mongodb.net/?retryWrites=true&w=majority";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const jobsCollection = client.db('jobsDB').collection('jobs');
        const bidsCollection = client.db('jobsDB').collection('dids');


        app.get('/jobs', async (req, res) => {
            const result = await jobsCollection.find().toArray();
            res.send(result)
        })

        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await jobsCollection.findOne(query);
            res.send(result)
        })
        app.get('/jobs/posted', async (req, res) => {
            const email = req.query.email;
            console.log(email)
            if (!email) {
                res.send([])
            }
            const query = { email: email };
            const result = await jobsCollection.find(query).toArray();
            res.send(result);

            // const query = { email: email }
            // const result = await jobsCollection.find(query).toArray();
            // res.send(result)
        })

        app.post('/mybids', async (req, res) => {
            const data = req.body;
            const result = await bidsCollection.insertOne(data);
            res.send(result)
        })
        app.post('/jobs', async (req, res) => {
            const data = req.body;
            const result = await jobsCollection.insertOne(data);
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Jobs related server is running')
})

app.listen(port, () => {
    console.log(`jobs  is Running on port ${port}`);
});
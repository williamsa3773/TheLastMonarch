const express = require('express');
const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;
const mongoUser = process.env.MONGO_USERNAME;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function run() {
	try	
	{
		await client.connect();
		await client.db(mongoUser).command({ ping: 1});
		console.log("Pinged your deployment");
	} finally {
		await client.close();
	}
}

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
	try {
		await run();
		res.send('Express server for The Last Monarch');
	} catch (error) {
		console.error(error)
		res.status(500).send('Error connecting to the database')
	}
});

app.listen(port, () => {
	console.log(`[Server]: Server is running at http://localhost:${port}`);
});
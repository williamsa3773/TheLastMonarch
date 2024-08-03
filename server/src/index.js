const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/', async (req, res) => {
	res.send('Express server for The Last Monarch');
});

app.listen(port, () => {
	console.log(`[Server]: Server is running at http://localhost:${port}`);
});
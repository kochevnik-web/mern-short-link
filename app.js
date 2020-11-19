const express = require('express');
const config = require('config');

const PORT = config.get('port') || 5000;

const app = express();

app.listen(PORT, ()=> console.log(`Server has been started on port ${PORT}...`));
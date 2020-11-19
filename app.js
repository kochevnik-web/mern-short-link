const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('port') || 5000;

const app = express();

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, ()=> console.log(`Server has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();
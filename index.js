require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/allRouter');

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.log('MONGO_URI is missing in .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(function () {
        console.log('Connection successful to MongoDB');

        app.listen(PORT, function () {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(function (err) {
        console.log('DB connection error:', err);
        process.exit(1);
    });
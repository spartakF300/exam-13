const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const users = require('./app/users');
const place = require('./app/place');
const comment = require('./app/comment');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);



    app.use('/users', users);
    app.use('/place', place);
    app.use('/comment', comment);

    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});
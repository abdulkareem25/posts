const express = require('express');
const postModel = require('./models/post.model');

const app = express();

app.use(express.json());

app.post('/create-post', (req, res) => {

});

app.get('/all-posts', (req, res) => {

});


module.exports = app;
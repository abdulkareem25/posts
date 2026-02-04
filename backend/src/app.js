const express = require('express');
const postModel = require('./models/post.model');

const app = express();

app.use(express.json());

app.post('/api/create-post', (req, res) => {

});

app.get('/api/all-posts', (req, res) => {

});


module.exports = app;
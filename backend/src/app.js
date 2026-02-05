const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
const postModel = require('./models/post.model');
const uploadImage = require('./services/storage.service');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/create-post', upload.single('image'), async (req, res) => {

    const { buffer } = req.file;
    const { caption } = req.body;

    const result = await uploadImage(buffer);

    const post = await postModel.create({
        image: result.url,
        caption
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    });
});

app.get('/api/all-posts', async (req, res) => {

    const posts = await postModel.find();

    res.status(200).json({
        message:"All posts fetched successfully",
        posts
    });
});


module.exports = app;
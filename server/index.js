const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const cors = require('cors');
const pool = require('./db');
const BlogList = require('./Model/blog');

// middleware
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: '*'
}));

const crawl = async (url) => {
    let blogsList = [];
    try {
        const urlResponse = await axios({
            method: 'get',
            url: url,
            withCredentials: false,
        })
        let data = urlResponse.data;
        // fs.writeFileSync('./file.html', data);
        blogsList = new BlogList(data).list;
    } catch (err) {
        console.log(err.message);
    }

    return blogsList;
};

// create routes

// create a todo
app.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { tag, creator, title, details } = req.body;
        // const blogData = req.body;

        /*
        const newBlog = await pool.query("INSERT INTO blog (tag, creator, title, details) VALUES($1, $2, $3, %4) RETURNING *",
            [tag, creator, title, details]);
        res.json(newBlog)
        */
        res.json(req.body)
    } catch (err) {
        console.log(err.message);
    }
});

// get all blogs tags
app.get('/', async (req, res) => {
    try {
        // res.send("<h1>HELLO WORLD !</h1>");
        /*
        const allBlogs = await pool.query('SELECT * FROM blog');
        res.json(allBlogs);
        */
        console.log('Home Route');
    } catch (err) {
        console.log(err.message);
    }
})

// get a blog tag
app.get('/:tag', async (req, res) => {
    try {
        console.log('In /:tag');
        const { tag } = req.params;
        /*
        // fetching from DB
        const blog = await pool.query('SELECT * FROM blog WHERE tag = $1',
            [tag]);
        res.json(blog.rows[0]);
        */
        let blogs = await crawl('https://medium.com/tag/' + tag);
        // console.log('blogs');
        // console.log(blogs);
        res.send(blogs);
    } catch (err) {
        console.log('in /tag error: ' + err.message);
    }
});

app.listen(port, () => {
    console.log('server started at ', port);
});

module.exports = app;
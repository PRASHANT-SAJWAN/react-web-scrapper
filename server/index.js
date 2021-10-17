const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');
const fs = require('fs');

const cors = require('cors');
const pool = require('./db');
const BlogList = require('./Model/blog');
const Article = require('./Model/article');

// middleware
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: '*'
}));

const crawlBlogs = async (url) => {
    try {
        const urlResponse = await axios({
            method: 'get',
            url: url,
            withCredentials: false,
        })
        let data = urlResponse.data;
        fs.writeFileSync('./file.html', data);
        // fetch each article and store it inside BlogList
        return new BlogList(data).list;
    } catch (err) {
        console.log(err.message);
    }
    return [];
};

const crawlArticles = async ({ url, article }) => {
    try {
        if (url.startsWith("http") === false)
            url = `https://medium.com${url}`;
        const urlResponse = await axios({
            method: 'get',
            url: url,
            withCredentials: false,
        });
        let data = urlResponse.data;
        // fs.writeFileSync('./file2.html', data);
        // console.log('article data response ', new Article(data, article));
        return new Article(data, article);
    } catch (err) {
        console.log('crawl article error: ', err.message);
    }
};

// ROUTES
// get a blog tag
app.get('/tag/:tag', async (req, res) => {
    try {
        console.log('In /:tag');
        const { tag } = req.params;
        /*
        // fetching from DB
        const blog = await pool.query('SELECT * FROM blog WHERE tag = $1',
            [tag]);
        res.json(blog.rows[0]);
        */
        let blogs = await crawlBlogs('https://medium.com/tag/' + tag);
        res.send(blogs);
    } catch (err) {
        console.log('in /tag error: ' + err.message);
    }
});

app.get('/article/:article', async (req, res) => {
    try {
        // console.log('In /:article: ', req.query);
        const { url, article } = req.query;     // sent by params in react frontend Article controller
        // console.log('In /:article: ', req.body);
        // const { url, article } = req.body;     // for postman
        /*
        // fetching from DB
        const blog = await pool.query('SELECT * FROM blog WHERE article = $1',
            [article]);
        res.json(blog.rows[0]);
        */
        let data = await crawlArticles({ url: url, article: article });
        // console.log('article data', data);
        res.send(data);
    } catch (err) {
        console.log('in /article error: ' + err.message);
    }
});

app.listen(port, () => {
    console.log('server started at ', port);
});

module.exports = app;
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({
    origin: '*'
}));

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

const crawlBlogs = async (url) => {
    try {
        const urlResponse = await axios({
            method: 'get',
            url: url,
            withCredentials: false,
        })
        let data = urlResponse.data;
        // fs.writeFileSync('./file.html', data);
        // fetch each article and store it inside BlogList

        let blogs = new BlogList(data).list;

        for (let i = 0; i < blogs.length; ++i) {
            let articleData = await crawlArticles({ url: blogs[i].link, article: blogs[i].title });
            blogs[i].setArticleData(articleData);
        }
        return blogs;
    } catch (err) {
        console.log(err.message);
    }
    return [];
};

const filter = (dbData) => {
    let data = [];
    for (let i = 0; i < dbData.length; ++i) {
        let articleData = JSON.parse(dbData[i].article);
        data.push({
            'title': dbData[i].title,
            'creator': dbData[i].creator,
            'link': dbData[i].link,
            'details': dbData[i].details,
            'articleData': articleData,
        });
    }
    return data;
}

// ROUTES
// get a blog tag
app.get('/tag/:tag', async (req, res) => {
    try {
        console.log('In /:tag');
        const { tag } = req.params;

        let savedData = await pool.query('SELECT * FROM blog WHERE tag = $1', [tag]);

        if (savedData.rowCount > 0) {
            let data = filter(savedData.rows);
            res.send(data);
        } else {
            let blogs = await crawlBlogs('https://medium.com/tag/' + tag);
            // fetching from DB
            for (let i = 0; i < blogs.length; ++i) {
                let content = blogs[i].articleData.list;
                let article = {
                    'title': blogs[i].title,
                    'imgSrc': blogs[i].articleData.imgSrc,
                    'list': content,
                    'relatedTags': blogs[i].articleData.relatedTags,
                };
                await pool.query('INSERT INTO blog (tag, creator, title, details, link, article) values ($1,$2,$3,$4,$5,$6)',
                    [tag, blogs[i].creator, blogs[i].title, blogs[i].details, blogs[i].link, JSON.stringify(article)]);
            }
            // console.log(blogs);
            res.send(blogs);
        }
    } catch (err) {
        console.log('in /tag error: ' + err.message, err.stack);
    }
});

app.listen(port, () => {
    console.log('server started at ', port);
});

module.exports = app;
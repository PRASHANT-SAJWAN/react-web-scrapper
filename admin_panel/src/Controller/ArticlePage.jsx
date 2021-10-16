import axios from "axios";

const crawlArticleData = async ({ url, articleName }) => {
    console.log('crawling article data', { url, articleName });
    try {
        let response = await axios.get('http://localhost:5000/article/' + articleName, {
            params: { url: url, article: articleName }, // access by query in js backend
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

export default crawlArticleData;
import axios from "axios";

const crawlBlogData = async (tag) => {
    console.log('crawling tag data');
    try {
        let response = await axios.get('http://localhost:5000/tag/' + tag, {
            params: { tag: tag },
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

export default crawlBlogData;
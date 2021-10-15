import axios from "axios";

const crawlData = async (tag) => {
    console.log('crawling data');
    try {
        let response = await axios.get('http://localhost:5000/' + tag, {
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

export default crawlData;
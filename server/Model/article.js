const cheerio = require('cheerio');

class Article {
    constructor(html, article) {
        let $ = cheerio.load(html);
        this.title = article;
        this.imgSrc = $($('figure img').get(0)).attr('src');
        this.list = [];

        // console.log($($($('.n.p').children().get(5)).find('p')).text());

        /// todo:  check for each ('.n.p') if there are more than 5 'p' inside use this block
        let storyData = $($($('.n.p')).children().get(4)).find('p');

        console.log($(storyData).html());
        storyData.each((i, element) => {
            // console.log('element => ', $(element).get(0).tagName, $(element).text());
            if ($(element).get(0).tagName === 'h2') {
                console.log('h', $(element).text());
                this.list.push({ 'h': $(element).text() });
            } else if ($(element).get(0).tagName === 'p') {
                this.list.push({ 'p': $(element).text() });
            }
        });
        console.log(this.list);
    }
}

module.exports = Article;
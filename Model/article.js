const cheerio = require('cheerio');

class Article {
    constructor(html, article) {
        let $ = cheerio.load(html);
        this.title = article;
        this.imgSrc = $($('figure img').get(0)).attr('src');
        this.list = [];

        let allSections = $('.n.p');
        let storyData, maxPTagsTillNow = 0;

        // fetch those which have maximum 'p' tags in it
        allSections.each((i, element) => {
            let pTagsOfThisElement = $(element).find('p').length;
            if (pTagsOfThisElement > maxPTagsTillNow) {
                maxPTagsTillNow = pTagsOfThisElement;
                storyData = $(element).find('p');
            }
        });

        storyData.each((i, element) => {
            // console.log('element => ', $(element).get(0).tagName, $(element).text());
            if ($(element).get(0).tagName === 'h2') {
                console.log('h', $(element).text());
                this.list.push({ 'h': $(element).text() });
            } else if ($(element).get(0).tagName === 'p') {
                this.list.push({ 'p': $(element).text() });
            }
        });

        ///todo: for related topics, get tag with 'ul li' last found in whole page
        this.relatedTags = []
        $('ul').last().find('li').each((i, relatedTag) => {
            this.relatedTags.push($(relatedTag).text());
        })
        // console.log(this.list);
        // console.log(this.relatedTags);
    }
}

module.exports = Article;
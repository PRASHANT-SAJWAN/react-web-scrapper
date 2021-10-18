const cheerio = require('cheerio');

class Blog {
    constructor({ creator, title, details, link }) {
        this.creator = creator;
        this.title = title;
        this.details = details;
        this.link = link;
    }
    setArticleData(articleData) {
        this.articleData = articleData;
    }
}

class BlogList {
    // declare final vars
    list = []
    // named construct fromHTML
    constructor(html) {
        let $ = cheerio.load(html);
        $('.fn.ar.l').each((i, element) => {
            if (i <= 10) {
                let link = '';
                $(element).find('a').each((j, subElement) => {
                    if ($(subElement).find('h2').length > 0) {
                        link = $(subElement).attr('href');
                    }
                });
                this.list.push(new Blog({
                    creator: $($(element).find('h4')).text(),
                    title: $($(element).find('h2')).text(),
                    details: $($(element).find('.ae.t')).text(),
                    link: link,
                }));
            }
        });
    }
}

module.exports = BlogList;
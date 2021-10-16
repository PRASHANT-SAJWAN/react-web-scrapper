const cheerio = require('cheerio');

class Blog {
    constructor({ creator, title, uploadTime, readTime, link }) {
        this.creator = creator;
        this.title = title;
        this.details = uploadTime + ", " + readTime;
        this.link = link;
    }
}

class BlogList {
    // declare final vars
    list = []
    // named construct fromHTML
    constructor(html) {
        let $ = cheerio.load(html);
        $('.fn.ar.l.gx').each((i, element) => {
            this.list.push(new Blog({
                creator: $($(element).find('.ha.t.ag.eg a')).text(),
                title: $($(element).find('.gy.l h2')).text(),
                uploadTime: $($(element).find('.ae.t p')).text(),
                readTime: $($(element).find('.ae.t span.az.b.eb.ep.ee')).text(),
                link: $(element).find('.hn.l a').attr('href'),
            }));
        });
    }
}

module.exports = BlogList;
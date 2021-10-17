import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import crawlArticleData from '../Controller/ArticlePage';
import './ArticlePage.css';

function ArticlePage() {
    const location = useLocation();
    const [articleData, setArticleData] = useState(null);

    const fetchArticle = async () => {
        const url = location.state.link
        const articleName = location.state.article;
        // console.log('fetch article ', { url, articleName });

        let data = await crawlArticleData({ url, articleName });
        setArticleData(data);
        // console.log('article data ', data);
    }

    useEffect(async () => {
        await fetchArticle();
    }, []);

    return (
        <div className="container">
            {articleData === null || articleData === {} ?
                <div>LOADING ARTICLE</div> :
                <div>
                    <h1>{articleData.title}</h1>
                    <img className="article-img" src={articleData.imgSrc} alt="article thumbnail" />
                    {articleData.list === [] || articleData.list === undefined ?
                        <div>No Data</div> :
                        articleData.list.map((contentObj) => {
                            return (Object.keys(contentObj)[0] === 'p' ?
                                <p>{contentObj['p']}</p> :
                                <h1>{contentObj['h']}</h1>)
                        })}
                    {articleData.relatedTags === undefined || articleData.relatedTags === [] ?
                        <div></div> :
                        <div>
                            <div className="heading"> Related Topics </div>
                            <div className="related-tags-list">
                                {articleData.relatedTags.map((tag) => {
                                    return (<div className="related-tags">
                                        {tag}
                                    </div>)
                                })}
                            </div>
                        </div>}
                </div>
            }
        </div>
    )
}

export default ArticlePage;
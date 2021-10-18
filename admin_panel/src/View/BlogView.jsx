import React from 'react'
import './BlogView.css';
import { Link, useHistory } from "react-router-dom";

function BlogView({ blog }) {
    const history = useHistory();
    const articleName = blog.title.split(' ').join('-');
    const url = `/${articleName}`;
    const handleClick = () => {
        localStorage.setItem('articleData', JSON.stringify({
            articleData: blog.articleData,
            link: blog.link
        }));
    }
    return (
        blog === undefined ?
            <div>Loading</div> :
            <Link className="link"
                to={url}
                target="_blank">
                <div className="blog-container" onClick={handleClick}>
                    <p className="creator-name">{blog.creator}</p>
                    <h2>{blog.title}</h2>
                    <p>{blog.details}</p>
                </div>
            </Link>
    )
}

export default BlogView;
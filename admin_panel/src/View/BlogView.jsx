import React from 'react'
import './BlogView.css';
import { useHistory } from "react-router-dom";

function BlogView({ blog }) {
    const history = useHistory();

    const handleClick = () => {
        let articleName = blog.title.split(' ').join('-');
        let url = `/${articleName}`;
        history.push({
            pathname: url,
            state: {
                article: articleName,
                link: blog.link
            }
        });
        console.log(blog.link);
    }
    return (
        <div className="blog-container" onClick={handleClick}>
            <p className="creator-name">{blog.creator}</p>
            <h2>{blog.title}</h2>
            <p>{blog.details}</p>
        </div>
    )
}

export default BlogView;
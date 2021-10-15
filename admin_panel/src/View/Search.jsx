import React, { useState } from 'react';
import './Seach.css';

import crawlData from '../Controller/Search';

function Search() {
    const [tag, setTag] = useState("culture");
    // const [error, setError] = useState("");
    const [blogs, setBlogs] = useState([]);
    const url = 'https://medium.com/';

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            // enter pressed
            await fetchBlog();
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault(); // to prevent refresh
        // search in DB
        // else crawl medium
        await fetchBlog();
    }

    const fetchBlog = async () => {
        setBlogs([]);
        let data = await crawlData(tag);
        setBlogs(data);

    }
    return (
        <form className="container" onSubmit={onFormSubmit}>
            <input type="text" onChange={(e) => { setTag(e.target.value) }} value={tag} onKeyPress={handleKeyPress} />
            <button onClick={async () => {
                await fetchBlog();
            }}> Send </button>
            <div>{blogs.map((blog) => {
                return <div key={blog.details}>
                    <p>{blog.creator}</p>
                    <h1>{blog.title}</h1>
                    <p>{blog.details}</p>
                </div>
            })}</div>
        </form>
    )
}

export default Search;
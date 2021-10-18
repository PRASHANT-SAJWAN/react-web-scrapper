import React, { useState } from 'react';
import './Seach.css';

import crawlBlogData from '../Controller/Search';
import BlogView from './BlogView';

function Search() {
    const [tag, setTag] = useState("culture");
    // const [error, setError] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [history, setHistory] = useState([]);

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
        // localstorage m history save
        let data = await crawlBlogData(tag);
        setBlogs(data);
    }

    return (
        <form className="container" onSubmit={onFormSubmit}>
            <input type="text" onChange={(e) => { setTag(e.target.value) }} value={tag} onKeyPress={handleKeyPress} />
            <button onClick={async () => {
                await fetchBlog();
            }}> Send </button>
            {
                blogs === null || blogs === undefined ?
                    <div>No Results Found</div> :
                    <div>{blogs.map((blog) => {
                        return (
                            <BlogView key={blog.details} blog={blog}></BlogView>
                        )
                    })}</div>
            }
        </form>
    )
}

export default Search;
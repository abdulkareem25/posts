import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        await axios.get('http://localhost:3000/api/all-posts')
            .then((res) => {
                setPosts(res.data.posts);
            })
            .catch((err) => {
                console.error('Error in fetching posts:', err);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='posts'>
            <h1>All Posts</h1>
            <div className="container">
                {posts.map((post) => (
                    <div className="post-card" key={post._id}>
                        <img src={post.image} alt="Post" />
                        <h4>{post.caption}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    let nvaigate = useNavigate();

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:3000/api/all-posts');
            setPosts(res.data.posts);
            setError('');
        } catch (err) {
            console.error('Error in fetching posts:', err);
            setError('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        nvaigate('/create-post');
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='posts'>
            <h1>All Posts</h1>
            <div className="container">
                {loading && <div style={{ color: '#999', textAlign: 'center' }}>Loading posts...</div>}
                {error && <div style={{ color: '#fca5a5', textAlign: 'center' }}>{error}</div>}
                {!loading && posts.length === 0 && <div style={{ color: '#999', textAlign: 'center' }}>No posts yet</div>}
                {posts.map((post) => (
                    <div className="post-card" key={post._id}>
                        <img src={post.image} alt="Post" />
                        <h4>{post.caption}</h4>
                    </div>
                ))}
            </div>
            <button
                onClick={handleClick}
            >Create Post</button>
        </div>
    )
}

export default Posts

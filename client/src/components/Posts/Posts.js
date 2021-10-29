import React from 'react';
import {CircularProgress}  from '@material-ui/core';
import { useSelector } from 'react-redux';
import './Posts.scss'
import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  
  if (!posts.length && !isLoading) return 'No posts';
  return (
    isLoading ? <div className="loader"><CircularProgress /></div>  : (
      <div className="posts-container">
        {posts?.map((post,index) => (
            <Post id={index+1} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
    )
  );
};

export default Posts;

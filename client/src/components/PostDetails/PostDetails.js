import React, { useEffect } from 'react';
import {CircularProgress} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams} from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

import './postDetails.scss'

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <div>
        <CircularProgress size="7em" />
      </div>
    );
  }

  return (
    <div className="post-details-container">
      <div>
        <div>
          <h1>{post.title}</h1>
          <p>{post.message}</p>
          <span className="creator">By {post.name} </span>
          <span className="creator">{moment(post.createdAt).fromNow()}</span>
          <div>
            <img className="post-img" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
          <CommentSection post={post} />
        </div>
      </div>
    </div>
  );
};

export default Post;

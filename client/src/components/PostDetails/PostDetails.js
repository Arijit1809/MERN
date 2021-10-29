import React, { useEffect } from 'react';
import {CircularProgress} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

import './postDetails.scss'

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
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

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <div>
        <CircularProgress size="7em" />
      </div>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <div className="post-details-container">
      <div>
        <div>
          <h1>{post.title}</h1>
          <p>{post.message}</p>
          ------------------------------------------------------------------------------
          <p>Created by: {post.name}</p>
          <p>{moment(post.createdAt).fromNow()}</p>
          {/* {post?.tags??<h2>{post.tags.map((tag) => `#${tag} `)}</h2>} */}
          <div>
            <img className="post-img" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
          <CommentSection post={post} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div>
          <h5>You might also like:</h5>
          <div>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <h6>{title}</h6>
                <p>{name}</p>
                <p>{message}</p>
                <p>Likes: {likes.length}</p>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

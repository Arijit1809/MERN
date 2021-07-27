import React, { useState } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { likePost, deletePost } from '../../../actions/posts';
import './Post.scss'

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <div className="sabkapapa">
      <div
        className="post-container"
        onClick={openPost}
      >
        <div style={{position: 'relative'}}>
        <img className="media" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        <div className="img-overlay"/>
        </div>
        {/*name and time overlay over the image*/}
        <div className="creator-container">
          <h3>{post.name}</h3>
          <h3>{moment(post.createdAt).fromNow()}</h3>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          //three dots to edit
        <div className="dots">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </button>
        </div>
        )}
        <div>
          <p>{post.tags.map((tag) => `#${tag} `)}</p>
        </div>
        <h4>{post.title}</h4>
        <div>
          <p>{post.message.split(' ').splice(0, 20).join(' ')}...</p>
        </div>
      </div>
      <div className="like-del-container">
        <button onClick={handleLike}>
          <Likes />
        </button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <button onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;

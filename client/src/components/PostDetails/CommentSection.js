import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

import './postDetails.scss'

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{color: 'white'}}>
      <div>
        <div>
          <input placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
          <button onClick={handleComment}>
            Comment
          </button>
        </div>
        <div>
          <h1>Comments</h1>
          {comments?.map((comment, i) => {
            return (
              <CommentBubble comment={comment} key={i}/>
            )
          })}
          <div ref={commentsRef} />
        </div>
      </div>
    </div>
  );
};

const CommentBubble = ({comment})=>{
  return(
    <div className="comment-bubble">
        <h4>{comment.split(': ')[0]}</h4>
        <p>{comment.split(': ')[1]}</p>
    </div>
  )
}

export default CommentSection;

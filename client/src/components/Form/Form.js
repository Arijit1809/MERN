import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import './Form.scss'
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const fileRef = useRef()

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div className="post-form-login">
        <div>
          <div className="signup-msg">
          <Link to="/auth" style={{ textDecoration: 'none' , color: 'white' }}><h1>Please login to post</h1></Link>
          </div>
          <div className="post-form blur">
            <form autoComplete="off">
              <div className="form-container">
                <h1>What's on your mind</h1>
                <label>Title</label>
                <input className="title" name="title" />
                <label>Message</label>
                <textarea style={{ resize: 'none' }} className="message" name="message" rows="4" />
                <div className="choose_file">
                  <button type="button">
                    <img src="image.jpeg" /> <span>Upload Image</span>
                  </button>
                  {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /> */}
                </div>
                <div className="submit-btn-cnt">
                  <button type="submit">Submit</button>
                  <button type="button">Clear</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }


  return (
    <div className="post-form">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-container">
          <h1 >{currentId ? `Editing "${post?.title}"` : "What's on your mind"}</h1>
          <label>Title</label>
          <input className="title" name="title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <label>Message</label>
          <textarea style={{ resize: 'none' }} className="message" name="message" rows="4" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <div ref={fileRef} className="choose_file">
            <button type="button" onClick={(e) => { fileRef.current.children[1].click() }}>
              <img src="image.jpeg" /> <span>Upload Image</span>
            </button>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          </div>
          <div className="submit-btn-cnt">
            <button type="submit">Submit</button>
            <button type="button" onClick={clear}>Clear</button>
          </div>
        </div>
      </form>
    </div>
  );

};

export default Form;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { createPost, updatePost } from '../../actions/posts';
import './Form.scss'
const Form = ({ currentId, setCurrentId, show,closeForm }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

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
      <div>
        <h2>
          Please Sign In
        </h2>
      </div>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };
  if (show) {
    return (
      <div className="post-form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-container">
            <h1 >{currentId ? `Editing "${post?.title}"` : 'POST'}</h1>
            <button onClick={closeForm}>Close</button>
            <label>Title</label>
            <textarea name="title" label="Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <label>Message</label>
            <textarea name="message" label="Message" rows="4" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <div>
              <ChipInput
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
              />
            </div>
            <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
            <button type="submit">Submit</button>
            <button onClick={clear}>Clear</button>
          </div>
        </form>
      </div>
    );
  } else {
    return null
  }
};

export default Form;

import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { getPostsBySearch } from '../../actions/posts';

import * as actionType from '../../constants/actionTypes';
import './Navbar.scss'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div className="nav-container">
      <Link to="/" style={{ textDecoration: 'none' , color: 'white' }}>
        <h2>Postzilla</h2>
      </Link>
      <div className="search-container">
        <input onKeyDown={handleKeyPress} value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={searchPost}>Search</button>
      </div>
      {user?.result ? (
        <div className="profile-container">
          <img alt={user?.result.name} src={user?.result.imageUrl}></img>
          <h2>{user?.result.name}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => { history.push("/auth") }}>Sign In</button>
      )}
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import OtherPosts from '../OtherPosts/OtherPosts';

import './home.scss'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [currentId, setCurrentId] = useState(0);
  const [tags, setTags] = useState([]);

  return (
    <div className="home">
      <div className="form-post-container">
      <div className="home-grid-item">
          <OtherPosts>
          {(!searchQuery && !tags.length) && (
            <div className="pagination-home">
              <Pagination page={page} />
            </div>
          )}
          </OtherPosts>
        </div>
        <div className="home-grid-item">
          <Posts setCurrentId={setCurrentId} />
        </div>
        
        <div className="home-grid-item">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default Home;

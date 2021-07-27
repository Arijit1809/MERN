import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import OpenForm from '../OpenForm/OpenForm';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [currentId, setCurrentId] = useState(0);
  const [tags, setTags] = useState([]);
  const [formOpen,setFormOpen] = useState(false);

  const openForm = ()=>{
    setFormOpen(true);
  }

  const closeForm = ()=>{
    setFormOpen(false);
  }

  return (
    <div>
      <Posts setCurrentId={setCurrentId} />
      <OpenForm onClick={openForm}/>
      <Form show={formOpen} closeForm={closeForm} currentId={currentId} setCurrentId={setCurrentId} />
      {(!searchQuery && !tags.length) && (
        <div>
          <Pagination page={page} />
        </div>
      )}
    </div>
  );
};

export default Home;

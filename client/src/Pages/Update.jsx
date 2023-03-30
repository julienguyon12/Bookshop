import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    cover: '',
    price: null,
  });
  const location = useLocation();
  const idPage = location.pathname.split('/');
  console.log(idPage[2]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(book);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8800/books/' + idPage[2], book);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='form'>
      <h1>Update new book</h1>
      <input
        type='text'
        placeholder='title'
        onChange={handleChange}
        name='title'
      />
      <input
        type='text'
        placeholder='desc'
        onChange={handleChange}
        name='desc'
      />
      <input
        type='text'
        placeholder='cover'
        onChange={handleChange}
        name='cover'
      />
      <input
        type='number'
        placeholder='price'
        onChange={handleChange}
        name='price'
      />
      <button onClick={handleClick} className='formButton'>
        Update{' '}
      </button>
    </div>
  );
};

export default Update;

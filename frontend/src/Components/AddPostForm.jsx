import React, { useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { FiImage, FiTag, FiEdit3, FiSend } from 'react-icons/fi';
import Navbar from './Navbar';

const AddPostForm = () => {
  const titleRef = useRef('');
  const descRef = useRef('');
  const photoUrlRef = useRef('');
  const keywordRef = useRef('');
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleImageChange = () => {
    setPreviewImage(photoUrlRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const title = titleRef.current.value;
      const desc = descRef.current.value;
      const photoUrl = photoUrlRef.current.value;
      const keyword = keywordRef.current.value.split(",");

      const res = await axios.post(`${BASE_URL}/user/post/add`, { title, desc, photoUrl, keyword }, { withCredentials: true });
      console.log(res.data);

      titleRef.current.value = '';
      descRef.current.value = '';
      photoUrlRef.current.value = '';
      keywordRef.current.value = '';
      setPreviewImage('');
      setSuccessMessage('Post created successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <> 
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-gray-900 to-black text-white pt-14">
      
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>

      {error && <div className="bg-red-500 text-white p-2 rounded mb-3">{error}</div>}
      {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-3">{successMessage}</div>}
      
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 p-4 rounded-lg shadow-md">
        {previewImage && (
          <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded mb-3" />
        )}
        
        <div className="relative mb-3">
          <input
            type="text"
            ref={titleRef}
            placeholder="     Title"
            className="w-full pl-10 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative mb-3">
          <textarea
            ref={descRef}
            placeholder="     Write a caption..."
            className="w-full pl-10 p-2 h-24 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative mb-3">
          <input
            type="text"
            ref={photoUrlRef}
            placeholder="     Photo URL"
            className="w-full pl-10 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageChange}
          />
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            ref={keywordRef}
            placeholder="     Keywords (comma separated)"
            className="w-full pl-10 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold">
          <FiSend className="text-lg" /> 
        </button>
      </form>
    </div>
    </>
  );
};

export default AddPostForm;
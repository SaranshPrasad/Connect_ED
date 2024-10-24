import React, { useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';


const AddPostForm = () => {

  const titleRef = useRef('');
  const descRef = useRef('');
  const photoUrlRef = useRef('');
  const keywordRef = useRef('');
  


  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
        const title = titleRef.current.value;
        console.log(title)
        const desc = descRef.current.value;
        const photoUrl = photoUrlRef.current.value;
        const keyword = keywordRef.current.value.split(",");
          const res = await axios.post(`${BASE_URL}/user/post/add`, {
            title,desc,photoUrl,keyword

          }, {withCredentials:true});
          console.log(res.data)
      

      
      titleRef.current.value = '';
      descRef.current.value = '';
      photoUrlRef.current.value = '';
      keywordRef.current.value = "";
      setSuccessMessage('Post created successfully!');
    } catch (err) {
     
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error creating post');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black inset-0  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Add New Post</h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              id="title"
              type="text"
              ref={titleRef}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
       
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="content"
              ref={descRef}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              rows="5"
           
            ></textarea>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
              Photo Url 
            </label>
            <input
              id="image"
              type="text"
              ref={photoUrlRef}
              className="mt-1 block w-full px-3 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
              Keywords
            </label>
            <input
              id="keywords"
              type="text"
              ref={keywordRef}
              className="mt-1 block w-full px-3 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;

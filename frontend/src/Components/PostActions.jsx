import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const PostActions = ({ post }) => {
  const handleDelete = async (postId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/posts/${postId}`, { withCredentials: true });
      if (res.status >= 200 && res.status < 300) {
        window.location.reload(); // Refresh the page after deletion
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="mt-4 flex justify-between">
      {/* Show actions only if post belongs to logged-in user */}
      <button
        className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
        onClick={() => handleDelete(post._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default PostActions;

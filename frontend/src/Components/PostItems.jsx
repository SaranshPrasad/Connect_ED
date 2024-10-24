import React from 'react';

const PostItem = ({ post }) => {
  const photoUrl = post?.photoUrl || 'https://via.placeholder.com/600'; // Fallback image if needed

  return (
    <div className="  w-1/2 min-h-1/2 rounded-lg shadow-lg  mb-6 transition-transform transform hover:scale-105  bg-slate-800 text-white">
      {/* Post Image */}
      <div className="">
        <img
          src={photoUrl}
          alt="Post"
          className="inset-0 h-44 w-full  object-cover transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>

      {/* Post Content */}
      <div className="p-4">
        {/* Post Description */}
        <p className="text-gray-900 text-lg font-semibold mb-2">
          {post.desc || 'No description provided'}
        </p>

        {/* Post Keywords */}
        <div className="flex flex-wrap gap-2">
          {post.keywords.length > 0 ? (
            post.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                #{keyword}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No keywords</span>
          )}
        </div>

        {/* Additional Features (Optional) */}
        <div className="mt-4">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition">
            Like
          </button>
          <button className="ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

import React, { useEffect, useState } from 'react';
import PostItem from './PostItems'; 
import { useParams } from 'react-router-dom';
import { getUserPost } from '../utils/getDatas';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userId} = useParams();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const res = await getUserPost(userId);
        setPosts(res);
      } catch (err) {
        setError('Error fetching user posts');
        console.error('Error fetching user posts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);
console.log(posts)
  if (loading) return <div className="text-black">Loading posts...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!posts.length) return <div className="text-black">This user has no posts.</div>;

  return (
    <div className="w-screen mx-auto p-6 space-y-6  bg-black text-wrap  inset-0  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] min-h-screen">


      <h2 className="text-2xl text-white font-bold mb-4">{posts[0].fromUserId?.firstName}'s Posts</h2>
      <div className='flex justify-between gap-5 '>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
      </div>
    </div>
  );
};

export default UserPosts;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPost } from "../utils/getDatas";
import Navbar from "./Navbar";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRipple,
} from "mdb-react-ui-kit";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const res = await getUserPost(userId);
        setPosts(res);
      } catch (err) {
        setError("Error fetching user posts");
        console.error("Error fetching user posts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);
  console.log(posts)

  if (loading) return <div className="text-center text-white py-10 text-lg  ">Loading posts...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!posts.length) return <div className="text-center  py-10">This user has no posts.</div>;

  return (
    <>
      <Navbar />

      <MDBContainer fluid className="min-h-screen py-6 px-4 pt-20 bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {posts[0]?.fromUserId?.firstName}'s Posts
        </h2>

        <MDBRow className="g-4">
          {posts.map((post) => (
            <MDBCol md="6" lg="4" key={post._id}>
              <MDBCard className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                  <MDBCardImage
                    src={post.photoUrl || "https://via.placeholder.com/500"}
                    alt="Post"
                    position="top"
                    className="w-full h-64 object-cover"
                  />
                  <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}></div>
                </MDBRipple>
                <MDBCardBody className="bg-gray-900">
                  <MDBCardTitle className="text-xl font-semibold">{post.title}</MDBCardTitle>
                  <MDBCardText className="text-gray-400">{post.desc}</MDBCardText>
                  <p className="text-sm text-blue-400 mt-2">
                    Keywords: {post.keyword?.join(", ") || "None"}
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default UserPosts;

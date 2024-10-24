import React, { useEffect, useState } from 'react'
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import Feed from './Components/Feed';
import UserPosts from './Components/UserPosts';
import AddPostForm from './Components/AddPostForm';


const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home/>}></Route>
        <Route path='/auth' element={ <Login/>}></Route>
        <Route path='/user/profile' element={<UserProfile/>}></Route>
      <Route path='/user/feed' element={<Feed/>}></Route>
      <Route path='user/post/:userId' element={ <UserPosts/>}></Route>
      <Route path='user/post' element={ <AddPostForm/>}></Route>

      </Routes>
    </Router>
  )
}

export default App;
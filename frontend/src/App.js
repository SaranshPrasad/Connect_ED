import React from 'react'
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import UserProfile from './Components/UserProfile';
import RequestReceived from './Components/RequestReceived';
import Connections from './Components/Connections';
import Feed from './Components/Feed';
import UserPosts from './Components/UserPosts';
import Herosection from './Components/Herosection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/auth' element={<Login/>}></Route>
        <Route path='/user/profile' element={<UserProfile/>}></Route>
        <Route path='/user/request/received' element={<RequestReceived/>}></Route>
      <Route path='/user/all/connections' element={<Connections/>}></Route>
      <Route path='/user/feed' element={<Feed/>}></Route>
      <Route path='user/post/all' element={<UserPosts/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
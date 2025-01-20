import React, { useEffect, useState } from 'react'
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import Feed from './Components/Feed';
import UserPosts from './Components/UserPosts';
import AddPostForm from './Components/AddPostForm';
import ProfilePage from './Components/ProfilePage';
import ProfileCards from './Components/ProfileCards';
import Chat from './Components/Chat';
import Connections from './Components/Connections';
import { Provider } from 'react-redux';
import appStore from "./utils/appStore";
import ConnectionRequests from './Components/ConnectionRequests';

const App = () => {
  
  return (
    <Provider store={appStore}>
    <Router>
      <Routes>
        <Route path='/' element={ <Home/>}></Route>
        <Route path='/auth' element={ <Login/>}></Route>
        <Route path='/user/profile' element={<UserProfile/>}></Route>
      <Route path='/user/feed' element={<Feed/>}></Route>
      <Route path='user/post/:userId' element={ <UserPosts/>}></Route>
      <Route path='/user/post' element={ <AddPostForm/>}></Route>
      <Route path='/profilepage' element={ <ProfilePage/>}></Route>
      <Route path='/profilecard' element={ <ProfileCards/>}></Route>
      <Route path='/chat/:toUserName/:toUserId' element={ <Chat/>}></Route>
      <Route path='/connections' element={ <Connections/>}></Route>
      <Route path='/connections/requests' element={ <ConnectionRequests/>}></Route>



      </Routes>
    </Router>
    </Provider>
  )
}

export default App;
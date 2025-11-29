import React, { useEffect } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ForgotPasswod from './pages/ForgotPasswod';
import PasswordReset from './pages/PasswordReset';
import ManageSkills from './pages/ManageSkills';
import ManageTimeLine from './pages/ManageTimeLine';
import ManageProjects from './pages/ManageProjects';
import ViewProjects from './pages/ViewProjects';
import UpdateProjects from './pages/UpdateProjects';
import { toast, ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import PasswordUpdate from './pages/PasswordUpdate';
import { useDispatch } from 'react-redux';
import { getUser } from './store/userSlice';
import HomePage from './pages/HomePage';
import "./App.css"
import { getAllMessages } from './store/messageSlice';
import { getAllTimeline } from './store/timelineSlice';
import { getAllSkills } from './store/skillSlice';

const App = () => {

  const disapatch = useDispatch();


  useEffect(() => {
    disapatch(getUser());
    disapatch(getAllMessages());
    disapatch(getAllTimeline());
    disapatch(getAllSkills());
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/password/update' element={<PasswordUpdate />} />
        <Route path='/password/forgot' element={<ForgotPasswod />} />
        <Route path='/password/reset' element={<PasswordReset />} />
        <Route path='/manage/skills' element={<ManageSkills />} />
        <Route path='/manage/timeline' element={<ManageTimeLine />} />
        <Route path='/manage/projects' element={<ManageProjects />} />
        <Route path='/view/projects/:id' element={<ViewProjects />} />
        <Route path='/update/project/:id' element={<UpdateProjects />} />

      </Routes>
      <ToastContainer position='top-center' theme='dark' />
    </BrowserRouter>
  )
}

export default App;

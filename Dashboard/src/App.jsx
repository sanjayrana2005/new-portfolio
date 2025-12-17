import React, { useEffect } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ForgotPasswod from './pages/ForgotPasswod';
import PasswordReset from './pages/PasswordReset';
import ManageSkills from './pages/ManageSkills';
import ManageTimeLine from './pages/ManageTimeLine';
import ManageProjects from './pages/ManageProjects';
import ViewProjects from './pages/ViewProjects';
import UpdateProjects from './pages/UpdateProjects';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import PasswordUpdate from './pages/PasswordUpdate';
import { useDispatch } from 'react-redux';
import { getUser } from './store/userSlice';
import HomePage from './pages/HomePage';
import "./App.css"
import { getAllMessages } from './store/messageSlice';
import { getAllTimeline } from './store/timelineSlice';
import { getAllSkills } from './store/skillSlice';
import { getAllApplication } from './store/applicationSlice';
import { getAllProjects } from './store/projectSlice';
import { ProtectedRoute } from './pages/ProtectedRoute';

const App = () => {

  const disapatch = useDispatch();


  useEffect(() => {
    disapatch(getUser());
    disapatch(getAllMessages());
    disapatch(getAllTimeline());
    disapatch(getAllSkills());
    disapatch(getAllApplication());
    disapatch(getAllProjects());
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />

        <Route path='/login' element={<Login />} />

        <Route path='/password/update' element={
          // <ProtectedRoute>
            <PasswordUpdate />
          /* </ProtectedRoute> */
        } />

        <Route path='/password/forgot' element={
            <ForgotPasswod />
        } />

        <Route path='/password/reset' element={<PasswordReset />} />

        <Route path='/manage/skills' element={
          // <ProtectedRoute>
            <ManageSkills />
          // </ProtectedRoute>
        } />

        <Route path='/manage/timeline' element={
          // <ProtectedRoute>
            <ManageTimeLine />
          /* </ProtectedRoute> */
        } />

        <Route path='/manage/projects' element={
          // <ProtectedRoute>
            <ManageProjects />
          /* </ProtectedRoute> */
        } />

        <Route path='/view/projects/:id' element={
          // <ProtectedRoute>
            <ViewProjects />
          // </ProtectedRoute>
        } />

        <Route path='/update/project/:id' element={
          // <ProtectedRoute>
            <UpdateProjects />
          /* </ProtectedRoute> */
        } />

      </Routes>
      <ToastContainer position='top-center' theme='dark' />
    </BrowserRouter>
  )
}

export default App;

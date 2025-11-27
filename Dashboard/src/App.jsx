import React from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import ForgotPasswod from './pages/ForgotPasswod';
import PasswordReset from './pages/PasswordReset';
import ManageSkills from './pages/ManageSkills';
import ManageTimeLine from './pages/ManageTimeLine';
import ManageProjects from './pages/ManageProjects';
import ViewProjects from './pages/ViewProjects';
import UpdateProjects from './pages/UpdateProjects';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/'/>
        <Route path='/login'/>
        <Route path='/password/update' element={<ForgotPasswod/>}/>
        <Route path='/password/reset' element={<PasswordReset/>}/>
        <Route path='/manage/skills' element={<ManageSkills/>}/>
        <Route path='/manage/timeline' element={<ManageTimeLine/>}/>
        <Route path='/manage/projects' element={<ManageProjects />}/>
        <Route path='/view/projects/:id' element={<ViewProjects/>}/>
        <Route path='/update/project/:id' element={<UpdateProjects/>}/>
      </Routes> 
      <ToastContainer position='top-center' theme='dark'/>
    </Router>
  )
}

export default App;

import React from 'react'
import { Route,BrowserRouter, Routes } from 'react-router-dom';
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


const App = () => {
  return (
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<h1>hii</h1>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/password/update' element={<PasswordUpdate/>}/>
        <Route path='/password/forgot' element={<ForgotPasswod/>}/>
        <Route path='/password/reset' element={<PasswordReset/>}/>
        <Route path='/manage/skills' element={<ManageSkills/>}/>
        <Route path='/manage/timeline' element={<ManageTimeLine/>}/>
        <Route path='/manage/projects' element={<ManageProjects />}/>
        <Route path='/view/projects/:id' element={<ViewProjects/>}/>
        <Route path='/update/project/:id' element={<UpdateProjects/>}/>
        
    </Routes>
      <ToastContainer position='top-center' theme='dark'/>
   </BrowserRouter>
  )
}

export default App;

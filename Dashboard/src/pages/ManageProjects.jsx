import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllProjectSliceError, deleteProject, getAllProjects, resetProjectSlice, updateProject } from '../store/projectSlice';
import { toast } from 'react-toastify';


const ManageProjects = () => {
  const {loading,message,error,projects} = useSelector(state=>state.project);
  const dispatch = useDispatch();

  const handleDeleteProject = (_id) => {
    dispatch(deleteProject(_id))
  }

  const data = new FormData();

  const handleUpdateProject = (_id) => {
    dispatch(updateProject(id,data))
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllProjectSliceError())
    }
    if(message){
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  },[dispatch,error,loading])

  return (
    <div>
      
    </div>
  )
}

export default ManageProjects

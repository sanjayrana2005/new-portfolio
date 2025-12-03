import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ViewProjects() {
  const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [gitRepoLink, setGitRepoLink] = useState("")
    const [stack, setStack] = useState("")
    const [deployed, setDeployed] = useState("")
    const [projectLink, setProjectLink] = useState("")
    const [technologies, setTechnologies] = useState("")
    const [projectImage, setProjectImage] = useState("")

    const {id} = useParams();
    useEffect(()=>{
      const getProject = async () => {
        await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-single-project/${id}`)
        .then((res)=>{
          setTitle(res.singlePtoject?.title);
          setDescription(res.singlePtoject?.description);
          setGitRepoLink(res.singlePtoject?.gitRepoLink);
          setStack(res.singlePtoject?.stack);
          setDeployed(res.singlePtoject?.deployed);
          setProjectLink(res.singlePtoject?.projectLink);
          setTechnologies(res.singlePtoject?.);
          setProjectImage(res.singlePtoject?.);
        })
      }
    })
  return (
    <div>
      
    </div>
  )
}

export default ViewProjects

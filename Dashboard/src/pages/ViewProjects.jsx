import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
          setTitle(res.data.singleProject?.title);
          setDescription(res.data.singleProject?.description);
          setGitRepoLink(res.data.singleProject?.gitRepoLink);
          setStack(res.data.singleProject?.stack);
          setDeployed(res.data.singleProject?.deployed);
          setProjectLink(res.data.singleProject?.projectLink);
          setTechnologies(res.data.singleProject?.technologies);
          setProjectImage(res.data.singleProject?.projectImage && res.data.singleProject?.projectImage?.url);
          console.log(res.data.singleProject.projectImage.url)
        }).catch(error=>{
          toast.error(error.response?.data?.message);
        })
      }
      getProject();
    },[id]);

    const descriptionInListFormat = description.split(". ")
    const technologiesInListFormat = technologies.split(". ")
   return (
  <div className='flex justify-center min-h-screen sm:gap-4 sm:py-4 sm:pl-20'>
      <div className='w-full px-5 md:w-[650px]'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>

            <div className='mt-10 flex flex-col gap-5'>
              <div className='w-full sm:col-span-4'>
                <h1 className='text-2xl font-bold mb-4'>{title}</h1>
                <img src={projectImage} alt={title}  className='w-full h-auto'/>
              </div>

              <div className='w-full sm:col-span-4'>
                <p className='text-2xl mb-2'>Description</p>
                <ul className='list-disc'>
                    {
                      descriptionInListFormat.map((desc,index)=>{
                        return (
                          <li key={index}>{desc}</li>
                        )
                      })
                    }
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProjects

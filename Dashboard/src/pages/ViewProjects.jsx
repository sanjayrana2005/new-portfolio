import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from "lucide-react";

function ViewProjects() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("")
  const [stack, setStack] = useState("")
  const [deployed, setDeployed] = useState("")
  const [projectLink, setProjectLink] = useState("")
  const [technologies, setTechnologies] = useState("")
  const [projectImage, setProjectImage] = useState("")


  const { id } = useParams();
  useEffect(() => {
    const getProject = async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-single-project/${id}`)
        .then((res) => {
          setTitle(res.data.singleProject?.title);
          setDescription(res.data.singleProject?.description);
          setGitRepoLink(res.data.singleProject?.gitRepoLink);
          setStack(res.data.singleProject?.stack);
          setDeployed(res.data.singleProject?.deployed);
          setProjectLink(res.data.singleProject?.projectLink);
          setTechnologies(res.data.singleProject?.technologies);
          setProjectImage(res.data.singleProject?.projectImage && res.data.singleProject?.projectImage?.url);
        }).catch(error => {
          toast.error(error.response?.data?.message);
        })
    }
    getProject();
  }, [id]);

  const descriptionInListFormat = description.split(". ")
  const technologiesInListFormat = technologies.split(". ")
  return (
    <div className='flex justify-center min-h-screen sm:gap-4 sm:py-4 sm:pl-20 p-4'>
      <div className='w-full px-5 md:w-[650px]'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 flex flex-col gap-5'>
              <div className='w-full sm:col-span-4 '>
              <div className='flex items-center gap-2 mb-2'>
                <Link to="/manage/projects" title='Back'>
                  <ArrowLeft className='text-gray-600 hover:text-black'/>
                </Link>
                <h1 className='text-2xl font-bold'>{title}</h1>
                </div>
                <img src={projectImage} alt={title} className='w-full h-auto' />
              </div>
              <div className='w-full sm:col-span-4'>
                <p className='text-2xl mb-2'>Description</p>
                <ul className='list-disc'>
                  {
                    descriptionInListFormat.map((desc, index) => {
                      return (
                        <li key={index}>{desc}</li>
                      )
                    })
                  }
                </ul>
              </div>

              <div className='w-full sm:col-span-4'>
                <p className='text-2xl mb-2'>Technologies</p>
                <ul className='list-disc'>
                  {
                    technologiesInListFormat.map((technology, index) => {
                      return (
                        <li key={index}>{technology}</li>
                      )
                    })
                  }
                </ul>
              </div>

              <div className='w-full sm:col-span-4'>
                <p className='text-2xl mb-2'>Stack</p>
                <p>{stack}</p>
              </div>

              <div className='w-full sm:col-span-4'>
                <p className='text-2xl mb-2'>Deployed</p>
                <p>{deployed === "true" ? "Yes" : "No"}</p>
              </div>

              <div className='w-full sm:col-span-4'>
                <p className='text-2xl mb-2'>GitHub Repository Link</p>
                <Link to={gitRepoLink} target='_blank' className='text-blue-400 hover:text-blue-600'>
                  {gitRepoLink}
                </Link>
              </div>

              <div className='w-full sm:col-span-4'>
                <p className='text-2xl mb-2'>Project Link</p>
                <Link to={projectLink ? projectLink : "#"} className='text-blue-400 hover:text-blue-600' target='__blank'>
                  {`${projectLink ? projectLink : "Still not Deployed"}`}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProjects

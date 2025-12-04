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
          setTitle(res.singlePtoject?.title);
          setDescription(res.singlePtoject?.description);
          setGitRepoLink(res.singlePtoject?.gitRepoLink);
          setStack(res.singlePtoject?.stack);
          setDeployed(res.singlePtoject?.deployed);
          setProjectLink(res.singlePtoject?.projectLink);
          setTechnologies(res.singlePtoject?.technologies);
          setProjectImage(res.singlePtoject?.projectImage && res.singlePtoject?.projectImage?.url);
        }).catch(error=>{
          toast.error(error.response?.data?.message);
        })
      }
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
                {
                  title && title
                }
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Input
                      type="text" placeholder="Project Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Description
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <textarea
                      type="text" placeholder="Project Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Git Repository Link
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Input
                      type="text" placeholder="Git Repository Link"
                      value={gitRepoLink}
                      onChange={(e) => setGitRepoLink(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Project Link
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Input
                      type="text" placeholder="Project Live Link"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Technologies
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Input
                      type="text" placeholder="HTML CSS REACT NODE"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Stack
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Select value={stack} onValueChange={(SelectValue) => setStack(SelectValue)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project Stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Stack">Full Stack</SelectItem>
                        <SelectItem value="MERN">MERN</SelectItem>
                        <SelectItem value="MEAN">MEAN</SelectItem>
                        <SelectItem value="MEVN">MEVN</SelectItem>
                        <SelectItem value="REACT.JS">REACT JS</SelectItem>
                        <SelectItem value="NEXT.JS">NEXT JS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>


              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Deployed
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Select value={deployed} onValueChange={(SelectValue) => setDeployed(SelectValue)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project Stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProjects

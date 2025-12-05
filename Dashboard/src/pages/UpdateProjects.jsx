import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllProjectSliceError, getAllProjects, resetProjectSlice, updateProject } from '../store/projectSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImagePlus } from 'lucide-react';
import SpecialLoadingButton from './Sub-components/SpecialLoadingButton';

function UpdateProjects() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("")
  const [stack, setStack] = useState("")
  const [deployed, setDeployed] = useState("")
  const [projectLink, setProjectLink] = useState("")
  const [technologies, setTechnologies] = useState("")
  const [projectImage, setProjectImage] = useState("")
  const [projectImagePreview, setProjectImagePreview] = useState("")

  const { error, loading, message } = useSelector(state => state.project);
  const dispatch = useDispatch();

  const handleProjectImagePreview = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    setProjectImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectImagePreview(reader.result);
    }
  }

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
          setProjectImagePreview(res.data.singleProject?.projectImage && res.data.singleProject?.projectImage?.url)
        }).catch(error => {
          toast.error(error.response?.data?.message);
        })
    }
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
      setTitle("");
      setDescription("");
      setGitRepoLink("");
      setStack("");
      setDeployed("");
      setProjectLink("");
      setTechnologies("");
    }
  }, [id, message, loading, error, dispatch]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("projectImage", projectImage);
    dispatch(updateProject(id, formData));
  }

  return (
    <div className='flex justify-center min-h-screen sm:gap-4 sm:py-4 sm:pl-20'>
      <form className='w-full px-5 md:w-[650px]'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 p-5'>
            <h2 className='font-medium leading-7 text-gray-900 text-3xl text-center'>Update Project</h2>
            <Link to="/manage/projects" title="Back" className='text-gray-600 hover:text-black'>
              <ArrowLeft />
            </Link>
            <div className='mt-5 flex flex-col gap-5'>
              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Title
                </label>
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

              <div className="col-span-full">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                > Project Image
                </label>

                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                  <div className="text-center">
                    {
                      projectImagePreview ? (<img src={projectImagePreview} className='mx-auto h-[250px] w-full text-gray-300' viewBox="0 0 24 24" alt="svg" />) : (<ImagePlus className="mx-auto h-16 w-full text-gray-300"
                        aria-hidden="true" />)
                    }
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="svg"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleProjectImagePreview}
                        />
                      </label>

                      <p className="pl-1">or drag and drop</p>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className='w-full flex justify-center'>
            {
              loading ? <SpecialLoadingButton content={"Updating.."} width={"w-full sm:w-1/2"} /> : <Button type="submit" className="w-full sm:w-1/2 cursor-pointer" onClick={handleUpdateProject}>Update Project</Button>
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateProjects

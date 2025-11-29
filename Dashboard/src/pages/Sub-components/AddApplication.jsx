import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Input } from "@/components/ui/input"
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from "@/components/ui/button";
import { ImagePlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addApplication, clearAllApplicationSliceErrors, getAllApplication, resetApplicationSliceError } from '../../store/applicationSlice';

const AddApplication = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");
  const {loading,error,message} = useSelector((state)=>state.application)

  const dispatch = useDispatch();


  const handleSvg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSvg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (file) => {
      setSvgPreview(reader.result);
    }
  }

  const formData = new FormData();
  formData.append("name",name);
  formData.append("svg",svg);

  const handleAddApplication = (e) => {
    e.preventDefault();
    dispatch(addApplication(formData))
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllApplicationSliceErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetApplicationSliceError());
      dispatch(getAllApplication());
      setName("")
      setSvg("")
      setSvgPreview("")
    }
  },[error,dispatch,loading])
  return (
    <div className='flex justify-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20'>
      <form className='w-full px-5 md:w-[650px]'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='font-medium leading-7 text-gray-900 text-3xl text-center'>Add a new Application</h2>
            <div className='mt-10 flex flex-col gap-5'>
              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Name
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Input
                      type="text" placeholder="Application Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                > Application Image
                </label>

                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                  <div className="text-center">
                    {
                      svgPreview ? (<img src={svgPreview && svgPreview} className='mx-auto h-20 w-20 text-gray-300' viewBox="0 0 24 24" alt="svg" />) : (<ImagePlus className="mx-auto h-12 w-12 text-gray-300"
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
                          onChange={handleSvg}
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
              loading ? <SpecialLoadingButton content={"Adding.."} width={"w-full sm:w-1/2"} /> : <Button type="submit" className="w-full sm:w-1/2 cursor-pointer" onClick={handleAddApplication}>Add Skill</Button>
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddApplication

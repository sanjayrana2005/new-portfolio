import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux';
import { addTimeline, clearAllTimelineSliceError, getAllTimeline, resetTimelineSlice } from '../../store/timelineSlice';
import { toast } from "react-toastify"


const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { message, error, loading } = useSelector((state) => state.timeline);
  const dispatch = useDispatch()

  const handleAddTimeline = (e) => {
    e.preventDefault()
    dispatch(addTimeline(title, description, from, to))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineSliceError())
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
      setTitle("");
      setDescription("");
      setFrom("");
      setTo("");
    }

  }, [error, dispatch, loading])

  return (
    <div className='flex justify-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20'>
      <form className='w-[100%] px-5 md:w-[650px]'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='font-medium leading-7 text-gray-900 text-3xl text-center'>Add a new time line</h2>
            <div className='mt-10 flex flex-col gap-5'>
              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  Title
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Input
                      type="text" placeholder="Matriculation"
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
                      type="text" placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"

                    />
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  From
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Input
                      type="number" placeholder="Starting Period"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <label className='block text-sm font-medium left-6 text-gray-900'>
                  To
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Input
                      type="number" placeholder="Ending Period"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"

                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-center'>
            {
              loading ? <SpecialLoadingButton content={"Adding.."} width={"w-full sm:w-1/2"} /> : <Button type="submit" className="w-full sm:w-1/2 cursor-pointer" onClick={handleAddTimeline}>Add Timeline</Button>
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddTimeline

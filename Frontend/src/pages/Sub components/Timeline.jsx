import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Timeline = () => {
    const [timeline, setTimeline] = useState();

    useEffect(() => {
        const getMyTimeline = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/timeline/get-timeline`);
            setTimeline(data.timeline)
        }
        getMyTimeline();
    }, [])
    return (
        <div>
            <h1 className='overflow-x-hidden text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] mb-4 font-extrabold'>Timeline</h1>

            <ol class="relative border-s border-default">
                {
                    timeline && timeline.map((time) => {
                        return (
                            <li key={timeline._id} class="mb-10 ms-6">
                                <span class="absolute flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-4 ring-4 ring-buffer">
                                    <svg class="w-3 h-3 text-fg-brand-strong" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" /></svg>
                                </span>
                                <h3 class="my-2 text-lg font-bold text-heading">{time.title}</h3>
                                <p class="text-body text-gray-400">{time.description}</p>
                                <time class="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded text-gray-400">{time.timeline.from} - {time.timeline.to ? time.timeline.to : "Present"}</time>
                            </li>
                        )
                    })
                }

            </ol>



        </div>
    )
}

export default Timeline

import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
    const [projects, setProjects] = useState([])
    const [viewAll, setViewAll] = useState(false)

    useEffect(() => {
        const getMyProjects = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/getall-project`);
            setProjects(data.allProject);
        }

        getMyProjects()
    }, [])
    return (
        <div>
            <div className='relative mb-12'>
                <h1 className='hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-14 md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold ' style={{ background: "hsl(222.2 84% 4.9%" }}> My
                    <span className='text-tubeLight-effect font-extrabold'>PROJECTS</span>
                </h1>

                <h1 className='flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-14 md:leading-[67px] lg:leading-[90px] tracking-[10px] mx-auto w-fit font-extrabold ' style={{ background: "hsl(222.2 84% 4.9%" }}> My
                    <span className='text-tubeLight-effect font-extrabold'>WORK</span>
                </h1>
                <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200'></span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {(viewAll ? projects : projects.slice(0, 9)).map((project) => (
                    <Link key={project._id} to={`/project/${project._id}`}>
                        <div className="overflow-hidden rounded-lg relative group">
                            <img
                                src={project.projectImage?.url}
                                alt="Project image"
                                className="w-full h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-white text-black text-center py-2
                  translate-y-full opacity-0
                  transition-all duration-300 ease-in-out
                  group-hover:translate-y-0 group-hover:opacity-100">{project.title}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {
                projects && projects.length > 3 && (
                    <div className='w-full text-center my-9'>
                        <Button className="w-52 cursor-pointer" onClick={() => setViewAll(!viewAll)}>
                            {
                                viewAll ? "Show less" : "Show more"
                            }
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default Portfolio

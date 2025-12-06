import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { Linkedin, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button"


const Hero = () => {
    const [user, setUser] = useState({})
    console.log(user);



    useEffect(() => {
        const getMyProfile = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/me`, {
                withCredentials: true
            });
            setUser(data.user);
        }
        getMyProfile()
    }, [])
    return (
        <div className='w-full'>
            <div className='flex items-center gap-2 mb-2'>
                <span className='bg-green-400 rounded-full h-2 w-2'></span>
                <p>Online</p>
            </div>
            <h1 className='overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text[2.8rem] tracking-[2px] mb-4'>
                Hey, I am {user.fullName}
            </h1>
            <h1 className='text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text[2.8rem] tracking-[2px] sm:tracking-[15px]'>
                <Typewriter
                    words={["FULLSTACK DEVELOPER"]}
                    loop={50}
                    cursor
                    typeSpeed={100}
                    deleteSpeed={100}
                    delaySpeed={70} />
            </h1>
            <div className='flex gap-5 items-center mt-4 md:mt-8 lg:mt-10'>
                <div className='px-5 py-2 flex gap-5 bg-slate-50 rounded-[20px]'>
                    <Link to={user.linkedInURL ? user.linkedInURL : "#"} target={`${user.linkedInURL ? "_blank" : "_self"}`}>
                        <Linkedin className='text-sky-500 w-7 h-7 hover:drop-shadow-[0_0_10px_rgba(24,119,242,0.8)]' />
                    </Link>
                    <Link to={user.gitHubURL ? user.gitHubURL : "#"} target={`${user.gitHubURL ? "_blank" : "_self"}`}>
                        <Github className="w-7 h-7 text-gray-800 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]" />
                    </Link>
                </div>

                <div>
                    <Link to={user.resume ? user.resume.url : "#"} target={`${user.resume ? "_blank" : "_self"}`}>
                        <Button className='cursor-pointer bg-slate-50 rounded-[20px] py-5.5'>
                            <span><ExternalLink className='w-7 h-7' /></span>
                            <span>Resume</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <p className='mt-8 text-xl tracking-[2px]'>{user.aboutMe}</p>
            <hr className='my-8 md:my-10' />
        </div>
    )
}

export default Hero

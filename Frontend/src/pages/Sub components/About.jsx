import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";

const About = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const getMyProfile = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-user`);
            setUser(data.user);
        }
        getMyProfile()
    }, [])
    return (
        <div className='w-full flex flex-col overflow-x-hidden'>
            <div className='relative'>
                <h1 className='flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-14 md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold ' style={{ background: "hsl(222.2 84% 4.9%" }}> ABOUT
                    <span className='text-tubeLight-effect font-extrabold'>ME</span>
                </h1>
                <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200'></span>
            </div>
            <div>
                <div className='grid md:grid-cols-2 my-8 sm:my-20 gap-20'>
                    <div className='flex justify-center items-center'>
                        <img src={user.avatar && user.avatar.url} alt={user.fullName} className='bg-white p-2 sm:p-4 rotate-25 h-60 sm:h[340px] md:h-[350px] lg:h-[450px]' />
                    </div>
                    <div className='flex justify-center
                     flex-col tracking-[1px] text-xl gap-5'>
                        <p>Hi, I’m Sanjy Rana, a passionate Full-Stack Developer with experience in React, Node.js, and MongoDB. I love building interactive, responsive, and user-friendly web applications.These days, I’m learning React Native to create mobile apps and improving my DSA skills to solve coding problems more efficiently.</p>
                        <p>Take a look at my projects below to see what I’ve been working on — I’m always excited to connect, collaborate, and create meaningful digital experiences.</p>

                    </div>
                </div>
                <p className='tracking-[1px] text-xl'>I’m eager to take up internships or job opportunities where I can apply my skills, gain industry experience, and contribute to impactful projects.</p>
            </div>
        </div>
    )
}

export default About

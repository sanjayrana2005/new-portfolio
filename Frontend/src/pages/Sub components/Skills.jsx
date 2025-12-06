import { useState, useEffect } from 'react';
import axios from "axios";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const getMySkills = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-skill`);
            setSkills(data.skills);
        }
        getMySkills();
    }, [])
    return (
        <div className='w-full flex flex-col gap-8 ms:gap-12'>
            <h1 className='text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit text-tubeLight-effect justify-center'>Skills</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {
                skills.map((skill)=>{
                    return (
                        <Card key={skill._id} className="h-fit flex flex-col justify-center items-center p-7 gap-3">
                        <img 
                        src={skill.svg && skill.svg.url} 
                        alt={skill.title} 
                            className='h-12 sm:h-24 w-auto'
                        />
                            <p className='text-muted-foreground text-center'> {skill.title}</p>
                        </Card>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Skills

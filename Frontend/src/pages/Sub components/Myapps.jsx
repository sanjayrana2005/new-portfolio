import { useState, useEffect } from 'react';
import axios from "axios";
import {
    Card,
} from "@/components/ui/card"

const Myapps = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const getSwftware = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-software`);
            setApps(data.getAllApplication);
            console.log(data)
        }
        getSwftware();
    }, [])
    return (
        <div className='w-full flex flex-col gap-8 ms:gap-12'>
            <h1 className='text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit text-tubeLight-effect justify-center'>Softawre</h1>

            {
                apps.length === 0 ? <p>No any software added</p> :

                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                        {
                            apps.map((app) => {
                                return (
                                    <Card key={app._id} className="h-fit flex flex-col justify-center items-center p-7 gap-3">
                                        <img
                                            src={app.svg && app.svg.url}
                                            alt={app.title}
                                            className='h-12 sm:h-24 w-auto'
                                        />
                                        <p className='text-muted-foreground text-center'> {app.name}</p>
                                    </Card>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Myapps


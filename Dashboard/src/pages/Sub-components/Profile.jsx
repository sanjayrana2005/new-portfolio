import React from 'react'
import { useSelector } from 'react-redux'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
const Profile = () => {
    const { user } = useSelector((state) => state.user)    
    return (
        <div className='w-full h-full'>
            <div>
                <div className='grid w-full gap-6'>
                    <div className='grid gap-1'>
                        <h1 className='text-3xl font-bold'>Profile</h1>
                        <p className='mb-3'>Profile Preview</p>
                    </div>
                </div>

                <div className='grid gap-4 '>
                    <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-3'>
                        <div className='grid gap-2 w-full sm:w-72'>
                            <label>Profile Image</label>
                            <img
                                src={user && user.avatar?.url} alt="avatar"
                                className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'
                            />
                        </div>

                        <div className='grid gap-2 w-full sm:w-72'>
                            <label>Resume</label>
                            <img
                                src={user && user.resume?.url} alt="resume"
                                className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'
                            />
                        </div>
                    </div>
                    <div className='flex gap-2 sm:gap-10 flex-col sm:flex-row justify-between'>
                        <div className='grid gap-2'>
                            <label>Full Name</label>
                            <Input type="text" defaultValue={user.fullName} disabled className="border-gray-400" />
                        </div>
                        <div className='grid gap-2 '>
                            <label>Email</label>
                            <Input type="email" defaultValue={user.email} disabled
                                className="border-gray-400"
                            />
                        </div>
                        <div className='grid gap-2 '>
                            <label>Phone</label>
                            <Input type="text" defaultValue={user.phone} disabled
                                className="border-gray-400"

                            />
                        </div>
                    </div>
                    <div className='grid gap-2 '>
                        <label>About</label>
                        <Textarea defaultValue={user?.aboutMe} disabled
                            className='border-gray-400'
                        />
                    </div>
                    <div className='flex gap-2 sm:gap-10 flex-col sm:flex-row'>
                        <div className='grid gap-2 '>
                            <label>Github URL</label>
                            <Input value={user.gitHubURL} disabled
                                className='border-gray-400'
                            />
                        </div>
                        <div className='grid gap-2 '>
                            <label>Linkedin URL</label>
                            <Input value={user.linkedInURL} disabled
                                className='border-gray-400'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

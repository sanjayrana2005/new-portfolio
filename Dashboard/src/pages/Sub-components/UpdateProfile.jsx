import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import SpecialLoadingButton from './SpecialLoadingButton'
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '../../store/userSlice'
import { toast } from 'react-toastify'

const UpdateProfile = () => {
    const { user, loading, error, isUpdated, message } = useSelector((state) => state.user)

    const [fullName, setFullName] = useState(user && user.fullName);
    const [phone, setPhone] = useState(user && user.phone);
    const [aboutMe, setAboutME] = useState(user && user.aboutMe);
    const [gitHubURL, setGitHubURL] = useState(user && user.gitHubURL === "undefined" ? "" : user.gitHubURL);
    const [linkedInURL, setLinkedInURL] = useState(user && user.linkedInURL === "undefined" ? "" : user.linkedInURL);
    const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
    const [avatarPreview, setAvatarPreview] = useState();
    const [resume, setResume] = useState(user && user.resume && user.resume.url);
    const [resumePreview, setResumePreview] = useState();

    const dispatch = useDispatch();

    const avatarHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatarPreview(reader.result);
            setAvatar(file);
        }
    }

    const resumeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setResumePreview(reader.result);
            setResume(file);
        }
    }

    const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append("fullName",fullName)
        formData.append("phone",phone)
        formData.append("aboutMe",aboutMe)
        formData.append("gitHubURL",gitHubURL)
        formData.append("linkedInURL",linkedInURL)
        if(avatar instanceof File){
            formData.append("avatar",avatar)
        }
        if(resume instanceof File){
            formData.append("resume",resume)
        }
        dispatch(updateProfile(formData))
    }

    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch(clearAllUserErrors())
        }
        if(isUpdated){
            dispatch(getUser())
            dispatch(resetProfile())
        }
        if(message){
            toast.success(message)
        }
    },[dispatch,loading,error,isUpdated])

    return (
        <div className='w-full h-full'>
            <div>
                <div className='grid w-full gap-6'>
                    <div className='grid gap-1'>
                        <h1 className='text-3xl font-bold'>Profile</h1>
                        <p className='mb-3'>Update your profile</p>
                    </div>
                </div>

                <div className='grid gap-4 '>
                    <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-3'>
                        <div className='grid gap-2 w-full sm:w-72'>
                            <label>Profile Image</label>
                            <img
                                src={avatarPreview ? avatarPreview : user?.avatar?.url} alt="avatar"
                                className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'
                            />
                            <div className='relative'>
                                <Input type='file' className='avatar-update-btn border-gray-300 p-0  h-full m-0 ' onChange={avatarHandler} />
                            </div>
                        </div>

                        <div className='grid gap-2 w-full sm:w-72'>
                            <label>Resume</label>
                            <img
                                src={resumePreview ? resumePreview : user?.resume?.url} alt="resume"
                                className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'
                            />
                            <div className='relative '>
                                <Input type='file' className='avatar-update-btn border-gray-300 p-0  h-full m-0 ' onChange={resumeHandler} />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 sm:gap-10 flex-col sm:flex-row justify-between'>
                        <div className='grid gap-2'>
                            <label>Full Name</label>
                            <Input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="border-gray-400" />
                        </div>

                        <div className='grid gap-2 '>
                            <label>Phone</label>
                            <Input type="text" value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-gray-400"

                            />
                        </div>
                    </div>
                    <div className='grid gap-2 '>
                        <label>About Me</label>
                        <Textarea value={aboutMe}
                            onChange={(e) => setAboutME(e.target.value)}
                            className='border-gray-400'
                        />
                    </div>
                    <div className='flex gap-2 sm:gap-10 flex-col sm:flex-row'>
                        <div className='grid gap-2 '>
                            <label>Github URL</label>
                            <Input 
                            value={gitHubURL}
                            placeholder="Your GitHub URL"
                                onChange={(e) => setGitHubURL(e.target.value)}
                                className='border-gray-400'
                            />
                        </div>
                        <div className='grid gap-2 '>
                            <label>Linkedin URL</label>
                            <Input 
                            value={linkedInURL}
                            placeholder="Your Linkedin URL"
                                onChange={(e) => setLinkedInURL(e.target.value)}
                                className='border-gray-400'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-5'>{
                    !loading ? <Button className="w-full sm:w-1/2 cursor-pointer " onClick={handleUpdateProfile}>
                            Update Your Profile
                    </Button> : <SpecialLoadingButton content="Updating..."/>
                }</div>
            </div>
        </div>
    )
}

export default UpdateProfile

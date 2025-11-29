import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SpecialLoadingButton from './SpecialLoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '../../store/userSlice'
import { toast } from 'react-toastify'

const UpdatePassword = () => {
  const [currentPassword,setCurrentPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [confirmNewPassword,setConfirmNewPassword] = useState("")

  const dispatch = useDispatch()

  const {loading,error,message,isUpdated}=useSelector((state)=>state.user)

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword,newPassword,confirmNewPassword));
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if(isUpdated){
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if(message){
      toast.success(message);
    }
  },[dispatch,loading,error,isUpdated])
  return (
    <div className='w-full h-full'>
            <div>
                <div className='grid w-full gap-6'>
                    <div className='grid gap-1'>
                        <h1 className='text-3xl font-bold'>Profile</h1>
                        <p className='mb-3'>Update your password</p>
                    </div>
                </div>

                    <div className='flex gap-2 sm:gap-10 flex-col sm:w-1/2'>
                        <div className='grid gap-2 '>
                            <label>Current Password</label>
                            <Input 
                            value={currentPassword}
                            placeholder="Your Current Password"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className='border-gray-400'
                            />
                        </div>

                        <div className='grid gap-2 '>
                            <label>New Password</label>
                            <Input 
                            type="password"
                            value={newPassword}
                            placeholder="Your New Password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='border-gray-400'
                            />
                        </div>

                        <div className='grid gap-2 '>
                            <label>Confirm New Password</label>
                            <Input 
                            type="password"
                            value={confirmNewPassword}
                            placeholder="Confirm Your New Password"
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className='border-gray-400'
                            />
                        </div>
                    </div>
                
                <div className='flex justify-center mt-5'>{
                    !loading ? <Button className="w-full sm:w-1/2 cursor-pointer " onClick={handleUpdatePassword}>
                            Update Your Profile
                    </Button> : <SpecialLoadingButton content="Updating..."/>
                }</div>
            </div>
        </div>
  )
}

export default UpdatePassword

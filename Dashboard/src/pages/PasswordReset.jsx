import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { clearAllForgotPasswordErrors, forgotPassword } from '../store/forgotPasswordSlice';
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { PasswordResetForm } from './PasswordResetForm';

function PasswordReset() {
  const location = useLocation();
  const email = location.state?.email;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-4xl">
            <PasswordResetForm  email={email}/>
          </div>
        </div>
  )
}

export default PasswordReset

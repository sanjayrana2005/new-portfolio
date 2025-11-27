import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { clearAllForgotPasswordErrors, forgotPassword } from '../store/forgotPasswordSlice';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { ForgotPasswordForm } from './ForgotPasswordForm';

function ForgotPasswod() {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(state => state.forgotPassword);
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPAssword = () => {
    dispatch(forgotPassword(email));
    toast.success(message);
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors())
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, error, loading]);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-4xl">
            <ForgotPasswordForm />
          </div>
        </div>
  )
}

export default ForgotPasswod

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearAllForgotPasswordErrors, resetPassword } from "../store/forgotPasswordSlice"
import SpecialLoadingButton from "./Sub-components/SpecialLoadingButton"

export const PasswordResetForm = ( {email})=>{
    const [otp,setOtp]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const {loading,error,message}=useSelector(state=>state.forgotPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handResetPassword = (e) => {
        e.preventDefault();
        dispatch(resetPassword(email,otp,newPassword));
    }
useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearAllForgotPasswordErrors());
  }

  if (message) {
    toast.success(message);
    navigate("/");
  }

}, [error, message, dispatch, navigate]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-xl sm:text-2xl font-bold">Reset Password</h1>
              </div>
              <Field>
                <FieldLabel htmlFor="email">OTP</FieldLabel>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e)=>setOtp(e.target.value)}
                  required
                />

                <FieldLabel htmlFor="email">New Password</FieldLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
              {
                loading ? <SpecialLoadingButton content="Reseting Password..."/> :<Button 
                onClick={handResetPassword}
                className="cursor-pointer" type="submit">Reset Password</Button>
              }
                
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

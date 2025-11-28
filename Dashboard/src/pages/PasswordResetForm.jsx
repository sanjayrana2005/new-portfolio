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
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearAllForgotPasswordErrors, resetPassword } from "../store/forgotPasswordSlice"
import SpecialLoadingButton from "./Sub-components/SpecialLoadingButton"
import { getUser } from "../store/userSlice"

export const PasswordResetForm = ({ email }) => {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { loading, error, message,isAuthenticated } = useSelector(state => state.forgotPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handResetPassword = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Email not found! first request for OTP");
        dispatch(resetPassword(email, otp, newPassword));
    }
    const handleBack = () => {
        navigate("/password/forgot") ;
    }
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllForgotPasswordErrors());
        }
        if(isAuthenticated){
            navigate("/login");
        }

        if (message !==null ) {
            toast.success(message);
            dispatch(getUser());
        }

    }, [error,isAuthenticated, dispatch ,loading]);

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center  gap-2 text-center">

                                <h1 className="text-xl sm:text-2xl font-bold">Reset Password</h1>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="otp">OTP</FieldLabel>
                                <Input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />

                                <FieldLabel htmlFor="password">New Password</FieldLabel>
                                <Input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />

                            </Field>
                            <Field>

                                {
                                    loading ? <SpecialLoadingButton content="Reseting Password..." /> : <Button
                                        onClick={handResetPassword}
                                        className="cursor-pointer" type="submit">Reset Password</Button>
                                }
                                <button onClick= {handleBack
                                }className="cursor-pointer hover:underline">Back</button>
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

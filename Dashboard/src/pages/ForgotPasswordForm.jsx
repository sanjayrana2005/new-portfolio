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
import { clearAllForgotPasswordErrors, forgotPassword } from "../store/forgotPasswordSlice"
import SpecialLoadingButton from "./Sub-components/SpecialLoadingButton"

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("sanjayrana5113@gmail.com");
  const { loading, error, message } = useSelector(state => state.forgotPassword);
  const {isAuthenticated}=useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }
  useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }   
    if(isAuthenticated){
      navigate("/")
    }
    if(message !== null){
       toast.success(message);
        navigate("/password/reset",{ state: { email } });
    }
    
  }, [error,isAuthenticated, dispatch, loading]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-xl sm:text-2xl font-bold">Forgot Password</h1>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                {
                  loading ? <SpecialLoadingButton content="Sending OTP" /> : <Button
                    onClick={handForgotPassword}
                    className="cursor-pointer" type="submit">Send OTP</Button>
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

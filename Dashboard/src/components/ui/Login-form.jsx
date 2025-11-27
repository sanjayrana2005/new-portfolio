import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAllUserErrors, login } from "../../store/userSlice"
import { toast } from "react-toastify"
import SpecialLoadingButton from "../../pages/Sub-components/SpecialLoadingButton"

export const LoginForm = (  className,
  ...props)=>{
    const [email,setEmail]=useState("sanjayrana5113@gmail.com");
    const [password,setPassword]=useState("Sanjay@123");
    const {loading,isAuthenticated,error,message}=useSelector(state=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlelogin = (e) => {
        e.preventDefault();
        dispatch(login(email,password))
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if(isAuthenticated){
            toast.success(message)
            navigate("/");
        }
    },[dispatch,isAuthenticated,error,loading])
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-xl sm:text-2xl font-bold">Welcome back Sanjay</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your portfolio
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    to="/password/forgot"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required />
              </Field>
              <Field>
              {
                loading ? <SpecialLoadingButton content="Logging In"/> :<Button 
                onClick={handlelogin}
                className="cursor-pointer" type="submit">Login</Button>
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

'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface loginFormProps {
  openLogin: boolean
  setOpenLogin: Dispatch<SetStateAction<boolean>>
  setOpenRegister: Dispatch<SetStateAction<boolean>>
}

const LoginForm = ({ openLogin, setOpenLogin, setOpenRegister }: loginFormProps) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const handleSignIn = async () => {
    setLoading(prev => !prev)
    try {
      const res = await SignInWithEmailAndPassword(email, password)
      if (res?.user) {
        toast("logged in successfully")
        setEmail('')
        setPassword('')
        setOpenLogin(prev => !prev)
        setLoading(prev => !prev)
        router.push('dashboard')
      } else {
        toast("Invalid access")
        setLoading(prev => !prev)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleRegister = () => {
    setOpenLogin(prev => !prev)
    setOpenRegister(prev => !prev)
  }

  return (
    <Dialog open={openLogin} onOpenChange={() => setOpenLogin(prev => !prev)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Log in</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex mt-4">
          <Button className="w-full cursor-pointer" onClick={handleSignIn}>
            {loading === true && <a>Log In</a>}
            {loading === false && <LoaderCircle className="animate-spin" />}
          </Button>
        </div>
        <div className="flex items-center w-full justify-center">
          <Button variant='link' className="cursor-pointer" onClick={handleRegister}>
            Don't have an account? Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginForm;
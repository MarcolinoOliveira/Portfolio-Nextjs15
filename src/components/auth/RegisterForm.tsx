'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { auth } from "@/lib/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

interface registerFormProps {
  openRegister: boolean
  setOpenLogin: Dispatch<SetStateAction<boolean>>
  setOpenRegister: Dispatch<SetStateAction<boolean>>
}


const RegisterForm = ({ openRegister, setOpenLogin, setOpenRegister }: registerFormProps) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [CreateUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)

  // const checkEmailExists = async (email: string): Promise<boolean> => {
  //   try {
  //     const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  //     return signInMethods.length > 0;
  //   } catch (error) {
  //     console.error("Erro ao verificar email:", error);
  //     return false;
  //   }
  // }

  const handleSignUp = async () => {
    setLoading(prev => !prev)

    // const existEmail = await checkEmailExists(email);

    // if (existEmail) {
    //   toast('Este e-mail já está cadastrado!');
    //   setLoading(prev => !prev);
    //   return;
    // }

    try {
      const res = await CreateUserWithEmailAndPassword(email, password)

      if (res) {
        toast("Account created successfully")
        setEmail('')
        setPassword('')
        setLoading(prev => !prev)
        setOpenRegister(prev => !prev)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogin = () => {
    setOpenLogin(prev => !prev)
    setOpenRegister(prev => !prev)
  }

  return (
    <Dialog open={openRegister} onOpenChange={() => setOpenRegister(prev => !prev)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Create Account</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex-col gap-2">
          <Button className="w-full cursor-pointer mt-4" onClick={handleSignUp}>
            {loading === true && <a>Create</a>}
            {loading === false && <LoaderCircle className="animate-spin" />}
          </Button>
        </div>
        <div className="flex items-center w-full justify-center">
          <Button variant='link' className="cursor-pointer" onClick={handleLogin}>
            Already have an account? Log In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterForm;
'use client'

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../ui/button";
import { useState } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ToggleTheme from "../theme/ToggleTheme";
import { Avatar } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";

const TopBar = () => {

  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)

  const [user] = useAuthState(auth)

  const router = useRouter()
  const pathName = usePathname()

  const email = user?.email

  const handlePush = () => {
    setOpenLogin(prev => !prev)
  }

  const handleSignOut = () => {
    signOut(auth)
    router.push('/')
  }

  const menus = [
    { href: '/dashboard', title: 'Dashboard' },
    { href: '/wallet', title: 'Wallet' },
    { href: '/pools', title: 'Pools' },
    { href: '/portfolio', title: 'Portfolio' },
    { href: '/tradings', title: 'Tradings' },
  ]

  function stringAvatar(name: string | null | undefined) {
    return {
      children: `${name?.split(' ')[0][0].toUpperCase()}`,
    };
  }

  return (
    <div className="flex justify-between w-full items-center top-0 z-50">
      <div className="flex items-center justify-start w-1/6">Portfolio</div>
      <div className="hidden lg:flex flex-1 gap-8 justify-center">
        {user && menus.map((menu, index) => (
          <Link key={index} href={menu.href} className={`cursor-pointer font-semibold hover:text-primary
              ${menu.href === pathName ? 'text-primary' : ''}`}>
            {menu.title}
          </Link>
        ))}
      </div>
      {/* {!email &&
        <div className="flex items-center justify-end w-1/6">
          <LoaderCircle className="animate-spin" />
        </div>} */}

      <div className="flex items-center justify-end w-1/6 gap-1.5">
        {!user &&
          <a onClick={handlePush} className="cursor-pointer font-semibold hover:underline">
            Sign In
          </a>}
        {user &&
          <>
            <ToggleTheme />
            <Popover>
              <PopoverTrigger asChild className="cursor-pointer">
                <Avatar {...stringAvatar(user.email)} className="bg-primary flex items-center justify-center text-white" />
              </PopoverTrigger>
              <PopoverContent
                side="left"
                align="start"
                className="w-20"
              >
                <Button onClick={handleSignOut}>
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </>
        }
      </div>
      <LoginForm openLogin={openLogin} setOpenLogin={setOpenLogin} setOpenRegister={setOpenRegister} />
      <RegisterForm openRegister={openRegister} setOpenLogin={setOpenLogin} setOpenRegister={setOpenRegister} />
    </div>
  );
}

export default TopBar;
"use client";

import Link from "next/link";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { signOut } from "next-auth/react";
import { Avatar, Divider } from "@mui/material";

interface UserMenuProps {
  userName?: string | null;
  userImag?: string ;
}

export default function UserMenu({ userName, userImag }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(userName);

  const ref = useClickAway(() => {
    setIsOpen(false);
  });
  return (
    <>
      <div
        className="hover:cursor-pointer relative flex items-center justify-center gap-2"
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar src={userImag}/>
        {userName ? <h2 className="text-lg">{userName}</h2> : ""}
        {isOpen && (
          <ul className="absolute right-0 top-[120%] flex w-fit w-full min-w-fit flex-col gap-4 rounded-xl bg-slate-500 p-3 text-lg text-white shadow-sm transition-all">
            <li>
              <Link href={"/shopCard"}>You orders</Link>
            </li>
            <Divider className="bg-white" />
            {isAuth 
            ? 
            (
              <li>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link href={"/register"}>Registration</Link>
                </li>
                <li>
                  <Link href={"/login"}>Log in</Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

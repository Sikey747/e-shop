"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  label?: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  Icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  className,
  children,
  type = "button",
  label,
  disabled,
  outline,
  small,
  Icon,
  onClick,
  ...props
}: ButtonProps) {
  
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        type={type ? `${type}` : "button"}
        className={`h-full border-2 font-semibold text-md py-3 px-4  uppercase bg-slate-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all rounded-md hover:opacity-80 flex items-center justify-center gap-2 
        ${className} 
        ${outline ? "bg-transparent text-black shadow-sm" : "text-white"}
        ${small ? "text-sm py-1 px-2 font-light" : ""}
        `}
      >
        {Icon && <Icon size={24} />}
        {label}
        {children}
      </button>
    </>
  );
}

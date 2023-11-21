import { Reviews } from './../interfaces/index';
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const shortText = (str:string)=>{
    if(str.length<25) {
        return str
    }
    return str.substring(0,25)+"..."
}

export const formatPrice = (amount:number)=>{
    return new Intl.NumberFormat('en-US',{
            style: "currency",
            currency:'USD'
        }).format(amount)
}

export const formatRating=(rev:Reviews[]):number=>{
    return (
        rev.reduce((acc: number, el: any) => el.rating + acc, 0) /
        rev.length
    )
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
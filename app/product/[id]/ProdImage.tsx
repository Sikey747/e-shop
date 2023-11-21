"use client"

import { products } from "./../../../mocap/products";
import Image from "next/image";
import { Images,CardProdType,Product } from "./../../../interfaces/index";
import { useCallback, useState } from "react";

interface ProdImageProps{
    handlerImageColor:(value:string)=>void
    prod:Product
    cardProduct:CardProdType
}

export default function ProdImage({handlerImageColor,prod,cardProduct}:ProdImageProps) {
  return (
    <>
      <div className="flex gap-2  md:max-h-[30vw] max-h-[25rem] min-h-[13rem] md:min-h-[0]">
        <div className="w-full flex-[0_1_15%] flex flex-col gap-2 border-[1px]">
          {prod.images.map((el) => {
            return (
              <div
                onClick={() => handlerImageColor(el.color)}
                key={el.color}
                className="ibgc aspect-[626/728] cursor-pointer hover:border-[0.0625rem] hover:border-slate-500 hover:rounded-2xl"
              >
                <Image
                  className={`${
                    el.color === cardProduct.color
                      ? "border-[1px] border-slate-500 rounded-2xl "
                      : ""
                  } p-2`}
                  alt={el.color}
                  src={el.image}
                  fill
                  sizes="(min-width: 2040px) 103px, (min-width: 780px) calc(6.13vw - 21px), calc(13.04vw - 26px)"
                  priority={true}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full flex-auto flex min-h-[18.75rem]">
          <div key={prod.id} className="ibgc w-full">
            <Image
              className="p-2"
              alt={cardProduct.name}
              src={cardProduct.selectedImg}
              fill
              sizes="(min-width: 2040px) 791px, (min-width: 780px) calc(40.73vw - 32px), calc(86.96vw - 70px)"
            />
          </div>
        </div>
      </div>
    </>
  );
}

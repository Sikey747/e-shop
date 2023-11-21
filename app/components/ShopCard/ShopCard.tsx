"use client";

import Image from "next/image";
import { CardProdType } from "./../../../interfaces/index";
import Quantity from "./../Quantity/Quantity";
import { formatPrice, shortText } from "./../../../utils/utils";
import { Divider } from "@mui/material";
import Link from "next/link";
import Button from "../Button/Button";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "@/hook/useCart";

interface ShopCardProps {
  data: CardProdType;
  handlerClearItems?: (id: string, color: string) => void;
}

export default function ShopCard({ data, handlerClearItems }: ShopCardProps) {
  const { cartTotalQty,cardProducts,handlerQuantityDown,handlerQuantityUp } = useCart();
  const [ cardProduct, setCardProduct] = useState<CardProdType>(data);
  // const handlerDelete = (data: CardProdType) => {
  //   if (data) {
  //     handlerClearItems!(data.id, data.color);
  //   } else {
  //     console.log("data is undefined");
  //   }
  // };

  // const handlerQuantity = useCallback(
  //   (value: number): void => {
  //     if (value && value < 99) {
  //       setCardProduct((prev) => ({ ...prev, quantity: value }));
  //       handlerChangeQuantityProduct(cardProduct,value)
  //     }
  //   },
  //   [cardProduct.quantity]
  // );

  return (
    <article>
      <Divider />
      <div className="grid grid-cols-5 gap-4 items-center py-4 text-xs">
        <div className=" col-span-2 flex gap-4 items-center justify-self-start w-full">
          <Link
            href={`product/${data.id}`}
            className="ibgc pb-[12.5rem] w-1/2 "
          >
            <Image
              className=""
              src={data.selectedImg}
              alt={data.name}
              fill
              sizes="100wv"
            />
          </Link>
          <div className="flex flex-col gap-5 w-1/2">
            <Link href={`product/${data.id}`}>{shortText(data.name)}</Link>
            <p className="text-sm">COLOR: {data.color}</p>
            <Button
              className="w-fit underline  px-4 py-2 "
              onClick={() => handlerClearItems!(data.id, data.color)}
              outline={true}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className="justify-self-center">
          <p>{formatPrice(data.price)}</p>
        </div>
        <div className="justify-self-center">
          <Quantity
            valueProps={cardProduct.quantity}
            handlerQuantityUp={()=>handlerQuantityUp(cardProduct)}
            handlerQuantityDown={()=>handlerQuantityDown(cardProduct)}
          />
        </div>
        <div className="justify-self-end font-semibold text-lg">
          <p>{formatPrice(data.price * data.quantity)}</p>
        </div>
      </div>
      <Divider />
    </article>
  );
}

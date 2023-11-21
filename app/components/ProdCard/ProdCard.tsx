"use client";

import { Rating } from "@mui/material";
import { Product } from "./../../../interfaces/index";
import { shortText, formatPrice,formatRating } from "./../../../utils/utils";
import Image from "next/image";
import Link from "next/link";

interface ProdCardProps {
  product: Product;
}

export default function ProdCard({ product }: ProdCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex w-full cursor-pointer flex-col items-center justify-center
        gap-1 rounded-sm border-[0.075rem] border-slate-200 bg-slate-50 p-2 text-center text-sm transition hover:scale-105"
    >
      <div className="ibgc aspect-[626/780] w-full pb-[20%]">
        <Image
          alt={product.name}
          src={product.images[0].image}
          fill
          sizes="100vw"
        />
      </div>

      <h4 className="capitalize">{shortText(product.name)}</h4>
      <Rating
        name="read-only"
        value={formatRating(product.reviews)}
        readOnly
        precision={0.25}
      />
      <p>{product.reviews.length}</p>
      <strong className="font-semibold">{formatPrice(product.price)}</strong>
    </Link>
  );
}

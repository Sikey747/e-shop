"use client"

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { Badge as BadgeUi } from "@mui/material";
import { useCart } from "@/hook/useCart";

export default function Badge({}){
    const { cartTotalQty } = useCart();
    return (
      <Link href={"/shopCard"}>
        <BadgeUi badgeContent={cartTotalQty} color="primary">
          <FaShoppingCart size={24} />
        </BadgeUi>
      </Link>
    );
}
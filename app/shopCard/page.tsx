"use client";

import Container from "./../components/Container/Container";
import { useCart } from "./../../hook/useCart";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "./../components/Button/Button";
import { Divider } from "@mui/material";
import ShopCards from "./../components/ShopCard/ShopCard";
import { formatPrice } from "./../../utils/utils";
import { CardProdType } from "./../../interfaces/index";

export default function ShopCard({}) {
  const {
    cardProducts,
    handlerDeleteProductFromCart,
    handlerDeleteAllProductFromCart,
    handlerQuantityUp
  } = useCart();

  const subtotal =
    cardProducts?.reduce((acc: number, el: CardProdType) => {
      return acc + el.price * el.quantity;
    }, 0) || 0;

  const handlerClearItems = (id: string, color: string): void => {
    if (cardProducts) {
      const selectProd =
        cardProducts.find((el) => el.id === id && el.color === color) || null;
      if (selectProd != null) {
        handlerDeleteProductFromCart(selectProd);
      }
    } else {
      console.log("error");
    }
  };

  return (
    <Container>
      {!cardProducts && (
        <section className="flex flex-col items-center">
          <h1 className="text-2xl">Your cart is empty</h1>
          <Link
            href={"/"}
            className="mb-2 flex items-center gap-2 text-slate-500"
          >
            <AiOutlineArrowLeft sizes={24} />
            <span>Start Shop</span>
          </Link>
        </section>
      )}
      {cardProducts && (
        <section>
          <h1 className="mb-14 text-center text-2xl font-semibold">
            Shopping Card
          </h1>
          <div className="mb-4 grid grid-cols-5 gap-4 uppercase">
            <h3 className="col-span-2 justify-self-start">Product</h3>
            <h3 className="justify-self-center">Price</h3>
            <h3 className="justify-self-center">Quantity</h3>
            <h3 className="justify-self-end">Total</h3>
          </div>
          <div>
            {cardProducts &&
              cardProducts.map((el) => {
                return (
                  <ShopCards
                    key={`${el.color}+${el.id}`}
                    data={el}
                    handlerClearItems={handlerClearItems}
                  ></ShopCards>
                );
              })}
          </div>
          <Divider />
          <div className="flex justify-between gap-4 py-4">
            <Button
              className="w-full md:w-[200px]"
              small={true}
              outline={true}
              onClick={() => handlerDeleteAllProductFromCart()}
            >
              Clear Cart
            </Button>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-3xl font-semibold">Subtotal</span>
                <span className="text-3xl font-semibold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p>Texes and shipping calculate at checkout</p>
              <Link href={"/payload"}>
                <Button className="w-full md:w-[400px]">Checkout</Button>
              </Link>
              <Link
                href={"/"}
                className="flex items-center gap-4 text-slate-500"
              >
                <AiOutlineArrowLeft size={18} />
                <p>Continue Shopping</p>
              </Link>
            </div>
          </div>
        </section>
      )}
    </Container>
  );
}

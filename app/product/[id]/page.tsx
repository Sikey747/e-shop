"use client";

import { CardProdType } from "./../../../interfaces/index";
import Container from "./../../components/Container/Container";
import { products } from "./../../../mocap/products";
import { formatPrice, formatRating } from "./../../../utils/utils";
import { Alert, Divider, Rating } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Radio from "./../../components/Radio/Radio";
import Quantity from "./../../components/Quantity/Quantity";
import Button from "./../../components/Button/Button";
import { useCallback, useEffect, useState } from "react";
import ProdImage from "./ProdImage";
import ProdReview from "./ProdReview";
import { useCart } from "@/hook/useCart";
import {
  AiFillCheckCircle,
  AiOutlineArrowRight,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Link from "next/link";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const prodIdx = products.findIndex((el) => el.id === params.id);
  const prod = products[prodIdx];
  const { cardProducts, handlerAddProductToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [cardProduct, setCardProduct] = useState<CardProdType>({
    id: prod.id,
    name: prod.name,
    category: prod.category,
    brand: prod.brand,
    selectedImg: prod.images[0].image,
    quantity: 1,
    price: prod.price,
    color: prod.images[0].color,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  useEffect(() => {
    const hasProduct = !!cardProducts?.find((el) => el.id === prod.id);
    setIsAdded(hasProduct);
  }, [cardProducts, prod.id]);

  const handlerImageColor = useCallback(
    (value: string): void => {
      const selectImg = prod.images.find((el) => el.color === value);
      if (selectImg) {
        setCardProduct((prev) => ({
          ...prev,
          color: value,
          selectedImg: selectImg.image,
        }));
      }
    },
    [cardProduct.color],
  );

  const handleCloseSnecbar = () => {
    setSnackbar({ ...snackbar, open: !snackbar.open });
  };

  const handlerSubmit = () => {
    setIsAdded(true);
    handlerAddProductToCart(cardProduct);
    handleCloseSnecbar();
  };

  const handlerQuantityUp = (value: number) => {
    setCardProduct((prev) => {
      if (prev.quantity >= 99) {
        return { ...prev, quantity: 99 };
      } else {
        return { ...prev, quantity: prev.quantity + value };
      }
    });
  };

  const handlerQuantityDown = (value: number) => {
    setCardProduct((prev) => {
      if (prev.quantity <= 1) {
        return { ...prev, quantity: 1 };
      } else {
        return { ...prev, quantity: prev.quantity + value };
      }
    });
  };

  return (
    <main>
      <Container className="flex flex-col gap-8">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProdImage
            handlerImageColor={handlerImageColor}
            prod={prod}
            cardProduct={cardProduct}
          />
          <div className="flex flex-col gap-2 text-sm text-slate-500">
            <h1 className=" text-3xl font-medium text-slate-700">
              {prod.name}
            </h1>
            <p className="text-5xl font-bold">{formatPrice(prod.price)}</p>
            <div className="flex gap-2">
              <Rating
                name="read-only"
                value={formatRating(prod.reviews)}
                readOnly
                precision={0.25}
              />
              <p>{prod.reviews.length} reviews</p>
            </div>
            <Divider />
            <p className="text-justify text-base">{prod.description}</p>
            <p className="font-semibold">
              CATEGORY:
              <span className="ml-2">{prod.category}</span>
            </p>
            <p className="font-semibold">
              BRAND: <span className="ml-2">{prod.brand}</span>
            </p>
            <p className={prod.inStock ? "text-green-400" : "text-rose-400"}>
              {prod.inStock ? `in Stock` : `Out of Stock`}
            </p>
            <Divider />
            <form className="flex flex-col gap-4">
              <Radio
                data={prod.images}
                handlerColorSelect={handlerImageColor}
                value={cardProduct.color}
              />
              <Divider />
              <Quantity
                handlerQuantityUp={() => handlerQuantityUp(+1)}
                handlerQuantityDown={() => handlerQuantityDown(-1)}
                valueProps={cardProduct.quantity}
              />
              <Divider />
              {isAdded && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-slate-500">
                    <AiFillCheckCircle size={24} className={"fill-green-500"} />
                    <p>Product added to cart</p>
                  </div>
                  <Link className="text-lg" href={"/shopCard"}>
                    <div className="flex gap-3 capitalize transition-all hover:opacity-75">
                      <AiOutlineShoppingCart
                        size={24}
                        className={"fill-blue-500"}
                      />
                      Go to Card
                      <AiOutlineArrowRight
                        size={24}
                        className={"fill-blue-500"}
                      />
                    </div>
                  </Link>
                </div>
              )}
              <Button
                className="md:max-w-[18.75rem]"
                onClick={() => handlerSubmit()}
              >
                Add to card
              </Button>
            </form>
          </div>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={handleCloseSnecbar}
          >
            <Alert
              className="text-white"
              onClose={handleCloseSnecbar}
              sx={{ width: "200%", backgroundColor: "green", color: "white" }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </section>
        <ProdReview data={prod} />
      </Container>
    </main>
  );
}

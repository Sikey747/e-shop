import { createContext, useContext, useEffect, useState } from "react";
import { CardProdType } from "./../interfaces/index";

//интерфейс для контекста
interface CartContextType {
  cartTotalQty: number;
  cardProducts: CardProdType[] | null;
  handlerAddProductToCart: (product: CardProdType) => void;
  handlerDeleteProductFromCart: (product: CardProdType) => void;
  handlerDeleteAllProductFromCart: () => void;
  handlerChangeQuantityProduct: (product: CardProdType) => void;
  handlerQuantityUp:(product: CardProdType) => void;
  handlerQuantityDown:(product: CardProdType) => void;
}
//интерфейс для провайдера
interface Props {
  [propName: string]: any;
}
//создание контекста и резервация метса для него
export const CartContext = createContext<CartContextType | null>(null);

//Наполнения контексат начальными данными
//Управленеи для сменны данных контекста
export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cardProducts, setCardProducts] = useState<CardProdType[] | null>(null);
  
  useEffect(() => {
    const LocalProductCardsJson: any = localStorage.getItem("eShopCardItems");
    const LocalProductCards: CardProdType[] | null = JSON.parse(
      LocalProductCardsJson
    );
    setCardProducts(LocalProductCards);
  
  }, []);

  useEffect(() => {
    
    if(cardProducts){
      const totalQty = cardProducts.reduce((acc:number,el:CardProdType)=>{
        return acc + el.quantity},0)
        setCartTotalQty(totalQty)
    }
  }, [cardProducts]);

  //функция для изминения выбраного товара с любого компонента
  const handlerAddProductToCart = (product: CardProdType) => {

    setCardProducts((prev) => {
      if (prev) {
        //проверка на наличие совпадений
        const existingProductIndex = prev.findIndex(
          (p) => p.id === product.id && p.color === product.color
        );     

        //если совпадения есть тоесть нашелся индекс масива больше -1 а єто может быть и 0
        if (existingProductIndex > -1) {
          //тогда присваеваеваем переменной преведущий массив
          const updatedCart = [...prev];
  
          //обращаемся у индексу масива где было совпадение
          updatedCart[existingProductIndex] = {
            //гооври что оно равно тамуже самому
            ...updatedCart[existingProductIndex],
            //но квантит равно новому значению
            quantity:
              updatedCart[existingProductIndex].quantity + product.quantity,
          };
          //возвращаем новый масив
 
               localStorage.setItem(
                 "eShopCardItems",
                 JSON.stringify(updatedCart),
               );
          return updatedCart;
        } else {
                localStorage.setItem(
                  "eShopCardItems",
                  JSON.stringify([...prev, product]),
                );
          return [...prev, product];
        }
      } else {         
               localStorage.setItem(
                 "eShopCardItems",
                 JSON.stringify([product]),
               );
        return [product];
      }
    });

  };

  const handlerDeleteProductFromCart = (product: CardProdType) => {
    setCardProducts((prev) => {
      if (prev) {
        const updatedCart = prev.filter((el) => el !== product);
        return updatedCart;
      } else {
        return prev;
      }
    });
    localStorage.setItem("eShopCardItems", JSON.stringify(cardProducts));
  };

  const handlerDeleteAllProductFromCart = () => {
    setCardProducts(null);
    setCartTotalQty(0)
    localStorage.setItem("eShopCardItems", JSON.stringify(null));
  };

  const handlerChangeQuantityProduct = (product: CardProdType) => {
    if (cardProducts) {
      const updateProd = cardProducts.findIndex(
        (el) => el.id === product.id && el.color === product.color
      );
      setCardProducts((prev) => {
        if (prev) {
          let updateProducts = [...prev];
          updateProducts[updateProd].quantity = product.quantity;   
          return updateProducts;
        } else {
          return prev;
        }
      });
    }
    localStorage.setItem("eShopCardItems", JSON.stringify(cardProducts));
  };

  const handlerQuantityUp = (product:CardProdType) => {
    let updatedCart;

    if(cardProducts){
      updatedCart = [...cardProducts]
      const indexExect = cardProducts.findIndex(
        (el) => el.id === product.id && el.color === product.color
      );

      if(indexExect >-1){
        if( updatedCart[indexExect].quantity >= 99){
          updatedCart[indexExect].quantity = 99
        }else{
          updatedCart[indexExect].quantity = ++updatedCart[indexExect].quantity
        }
      }
      setCardProducts(updatedCart)
    }
    localStorage.setItem("eShopCardItems", JSON.stringify(cardProducts));
  }

  const handlerQuantityDown = (product:CardProdType) => {
    let updatedCart;

    if(cardProducts){
      updatedCart = [...cardProducts]
      const indexExect = cardProducts.findIndex(
        (el) => el.id === product.id && el.color === product.color
      );

      if(indexExect >-1){
        if( updatedCart[indexExect].quantity <= 1){
          updatedCart[indexExect].quantity = 1
        }else{

          
          updatedCart[indexExect].quantity = --updatedCart[indexExect].quantity
        }
      }
      setCardProducts(updatedCart)
    }
    localStorage.setItem("eShopCardItems", JSON.stringify(cardProducts));
  }

  //формирование общедоступных свойств и функций
  const value = {
    cartTotalQty,
    cardProducts,
    handlerAddProductToCart,
    handlerDeleteProductFromCart,
    handlerDeleteAllProductFromCart,
    handlerChangeQuantityProduct,
    handlerQuantityUp,
    handlerQuantityDown
  };

  //создание провайдера и внедрение обекта для того что быбыл доступ у всех компонентах анутри провайдера
  return <CartContext.Provider value={value} {...props} />;
};

//создание хука что бы запрашивать дынные из контексат
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CortContectPeovider");
  }
  return context;
};

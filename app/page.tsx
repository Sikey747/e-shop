import Container from "./components/Container/Container";
import Swiper from "./components/Swiper/Swiper";
import ProdCard from "./components/ProdCard/ProdCard";
import { products } from "./../mocap/products";

export default function Home() {
  return (
    <>
      <Container className="flex flex-col gap-8">
        <section>
          <Swiper />
        </section>
        <section className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(18.125rem,_1fr))] gap-4 lg:gap-7">
          {products.map((el) => {
            return <ProdCard key={el.name} product={el} />;
          })}
        </section>
      </Container>
    </>
  );
}

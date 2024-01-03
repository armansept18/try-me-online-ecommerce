import { Carousel } from "../../components/carousel/carousel";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navigation/navbar";
import { NewArrivalProducts } from "../../components/products/new-arrival";
import { TrendingProducts } from "../../components/products/trending-products";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <TrendingProducts />
      <NewArrivalProducts />
      <Footer />
    </>
  );
};

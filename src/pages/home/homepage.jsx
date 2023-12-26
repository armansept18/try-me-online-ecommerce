import { Carousel } from "../../components/carousel/carousel";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { TrendingProducts } from "../../components/trending-products/trending-products";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <TrendingProducts />
      <Footer />
    </>
  );
};

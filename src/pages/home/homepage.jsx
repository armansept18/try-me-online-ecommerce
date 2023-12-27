import { Carousel } from "../../components/carousel/carousel";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { OfferPromotionProducts } from "../../components/products/offers-promotion-products";
import { TrendingProducts } from "../../components/products/trending-products";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <TrendingProducts />
      <OfferPromotionProducts />
      <Footer />
    </>
  );
};

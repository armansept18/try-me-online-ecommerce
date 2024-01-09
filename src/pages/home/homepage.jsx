import { Carousel } from "../../components/carousel/carousel";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navigation/navbar";
import { NewArrivalProducts } from "../../components/products/new-arrival";
import { TrendingProducts } from "../../components/products/trending-products";
import { motion } from "framer-motion";

const visible = { opacity: 1, x: 0, transition: { duration: 3 } };

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        exit={{ opacity: 0, transition: { duration: 2 } }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible,
        }}
      >
        <TrendingProducts />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit={{ opacity: 0, transition: { duration: 2 } }}
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible,
        }}
      >
        <NewArrivalProducts />
      </motion.div>
      <Footer />
    </>
  );
};

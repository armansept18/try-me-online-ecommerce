import { Box, Button, Paper, Typography } from "@mui/material";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navigation/navbar";
import { SearchBar } from "../../components/search/search-bar";
import { ProductList } from "../../components/products/products-list";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { ProductModal } from "../../components/modal/product";
import { CategoryModal } from "../../components/modal/category";
import { motion } from "framer-motion";

const visible = { opacity: 1, x: 0, y: 0, transition: { duration: 3 } };

export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const fetchProduct = async (page = 1) => {
    try {
      const params = {
        page,
        search: searchQuery,
      };
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      const response = await api.get(`/api/products`, {
        params,
      });
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      console.log("Error fetch products:", err);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/categories");
      if (!response.data) throw new Error();
      setCategories(response.data);
    } catch (err) {
      console.log("Error fetching category :", err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchProduct(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchProduct();
  };

  const handlePageChange = (newPage) => {
    fetchProduct(newPage);
  };
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      setTimeout(() => {
        fetchProduct(nextPage);
      }, 500);
    }
  };
  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setTimeout(() => {
        fetchProduct(prevPage);
      }, 500);
    }
  };

  const toggleProductModal = () => {
    setIsProductModalOpen(!isProductModalOpen);
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Navbar />
      <Paper elevation={0} sx={{ background: "transparent" }}>
        <Box
          margin="112px 20px"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit={{ opacity: 0, transition: { duration: 2 } }}
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: -100 },
              visible,
            }}
          >
            <Box
              marginBottom="80px"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography fontFamily="Quicksand" fontSize="16px">
                PRODUCTS
              </Typography>
              <Typography
                fontFamily="Russo One"
                fontSize="48px"
                marginTop="16px"
              >
                Your Products Here
              </Typography>
              <Typography
                fontFamily="Quicksand"
                fontSize="16px"
                marginTop="24px"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </Box>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit={{ opacity: 0, transition: { duration: 2 } }}
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible,
            }}
          >
            <SearchBar
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
              categories={categories}
              selectedCategory={selectedCategory}
            />
          </motion.div>
          {products.length === 0 ? (
            <Typography
              mt={10}
              mb={10}
              fontFamily="Quicksand"
              textAlign="center"
            >
              There is no data! <br />
              Please contact administrator.
            </Typography>
          ) : (
            <ProductList products={[...products]} fetchProduct={fetchProduct} />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button onClick={handlePrevPage}>
              <ArrowBack sx={{ color: "#F37725" }} />
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "outlined" : ""}
                onClick={() => handlePageChange(index + 1)}
                sx={{
                  fontFamily: "Quicksand",
                  fontWeight: "700",
                  color: "#F37725",
                }}
              >
                {index + 1}
              </Button>
            ))}
            <Button onClick={handleNextPage}>
              <ArrowForward sx={{ color: "#F37725" }} />
            </Button>
          </Box>
        </Box>
      </Paper>
      <Footer />
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={toggleProductModal}
        setProducts={setProducts}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={toggleCategoryModal}
        onCategoryAdded={handleCategoryAdded}
      />
    </>
  );
};

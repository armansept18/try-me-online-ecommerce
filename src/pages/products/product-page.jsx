import { Box, Button, Paper, Typography } from "@mui/material";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navigation/navbar";
import { SearchBar } from "../../components/search/search-bar";
import { ProductList } from "../../components/products/products-list";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProduct = async (page = 1) => {
    try {
      const response = await api.get(`/api/products`, {
        params: {
          page,
          category: selectedCategory,
          search: searchQuery,
        },
      });
      console.log("Fetch products :", response.data.data);
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      console.log("Error fetch products:", err);
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
      fetchProduct(nextPage);
    }
  };
  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      fetchProduct(prevPage);
    }
  };

  useEffect(() => {
    fetchProduct();
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
            <Typography fontFamily="Russo One" fontSize="48px" marginTop="16px">
              Your Products Here
            </Typography>
            <Typography fontFamily="Quicksand" fontSize="16px" marginTop="24px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </Box>
          <SearchBar
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
          />
          <ProductList products={[...products]} fetchProduct={fetchProduct} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button onClick={handlePrevPage}>
              <ArrowBack />
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "contained" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button onClick={handleNextPage}>
              <ArrowForward />
            </Button>
          </Box>
        </Box>
      </Paper>
      <Footer />
    </>
  );
};

import { Box, Button, Card, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const CartCard = ({ product, onRemove, onIncrement, onDecrement }) => {
  const { image_url, name, price, qty } = product;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        margin: "20px 0",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: { xs: "16px", md: "32px" },
          marginBottom: { xs: "16px", md: 0 },
        }}
      >
        <img
          src={`http://localhost:5000/static/${image_url}`}
          alt={name}
          style={{
            width: "120px",
            height: "90px",
            objectFit: "cover",
            aspectRatio: "1",
            borderRadius: "10px",
            boxShadow: "6px 8px 12px -2px rgba(0,0,0, 2)",
            marginBottom: { xs: "16px", md: 0 },
          }}
        />
        <Typography fontFamily="Quicksand" fontWeight="600">
          {name || "Product Name"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "16px",
        }}
      >
        <Typography fontFamily="Quicksand" fontWeight="800">
          IDR {`${price.toLocaleString("id-ID")}` || "0"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <IconButton onClick={onDecrement}>-</IconButton>
          <Typography>{qty}</Typography>
          <IconButton onClick={onIncrement}>+</IconButton>
          <IconButton onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export const CartList = ({ products, setProducts }) => {
  const incrementQty = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].qty += 1;
    setProducts(updatedProducts);

    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  const decrementQty = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].qty > 1) {
      updatedProducts[index].qty -= 1;
      setProducts(updatedProducts);

      localStorage.setItem("cart", JSON.stringify(updatedProducts));
    }
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);

    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.qty * product.price;
    }, 0);
  };

  return (
    <Box>
      {products.map((product, index) => (
        <Grid item key={index}>
          <CartCard
            product={product}
            onRemove={() => removeProduct(index)}
            onIncrement={() => incrementQty(index)}
            onDecrement={() => decrementQty(index)}
          />
        </Grid>
      ))}
      <Typography
        fontFamily="Quicksand"
        fontWeight="700"
        textAlign="right"
        marginTop="16px"
      >
        Total: IDR {`${calculateTotal().toLocaleString("id-ID")}` || "0"}
      </Typography>
    </Box>
  );
};

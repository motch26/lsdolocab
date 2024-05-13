import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductBox = ({ product }) => {
  const navigate = useNavigate();

  const imageLink = `${import.meta.env.VITE_API_URL}/uploads/${
    product.category
  }/${product.images[0]}`;

  const countStocks = () => {
    return product.variants.reduce(
      (total, variant) => total + variant.stocks,
      0
    );
  };
  const handleProductClick = () => {
    navigate(`/home/inventory/products/${product._id}`);
  };
  return (
    <Grid item xs={3}>
      <Button sx={{ width: "100%" }} onClick={handleProductClick}>
        <Card variant="outlined" sx={{ display: "flex", width: "inherit" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h6">{product.model}</Typography>
              <Typography variant="subtitle1">
                {product.brand !== "-" ? product.brand : ""} ({product.category}
                )
              </Typography>
              <Divider flexItem />
              <Typography variant="body2">
                Price: ₱ {product.sellPrice[product.sellPrice.length - 1].price}
              </Typography>
              <Typography variant="body2">
                On-Hand: {countStocks()} units
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150 }}
            image={imageLink}
          />
        </Card>
      </Button>
    </Grid>
  );
};

export default ProductBox;

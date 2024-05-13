import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const GeneralInfo = ({ tabValue, product }) => {
  if (tabValue !== 0) return null;
  if (Object.keys(product).length < 1) return null;
  return (
    <Box sx={{ p: 3, display: tabValue === 0 ? "flex" : "none" }}>
      <Grid container columnSpacing={1} rowSpacing={3}>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Typography fontWeight={600}>Product Category</Typography>
            <Typography>{product.category}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Typography fontWeight={600}> Sell Price</Typography>
            <Typography>
              {"₱"}
              {product.sellPrice[product.sellPrice.length - 1].price}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Typography fontWeight={600}> Brand</Typography>
            <Typography>{product.brand}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Typography fontWeight={600}> Buy Price</Typography>
            <Typography>
              {"₱"}
              {product.buyPrice[product.buyPrice.length - 1].price}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Typography fontWeight={600}> Use For</Typography>
            <Typography>{product.useFor.join(", ")}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralInfo;

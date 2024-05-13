import React from "react";
import { useOutletContext } from "react-router-dom";
import ProductBox from "./ProductBox";
import { Grid } from "@mui/material";

export const Component = () => {
  const products = useOutletContext();
  return (
    <Grid container spacing={1} sx={{ p: 1 }}>
      {products.map((product) => (
        <ProductBox key={product._id} product={product} />
      ))}
    </Grid>
  );
};

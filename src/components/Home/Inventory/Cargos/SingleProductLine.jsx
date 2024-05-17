import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
const { VITE_API_URL } = import.meta.env;
const backendAPI = VITE_API_URL;

const SingleProductLine = ({ products, addProductLineHandler }) => {
  const cleanedProducts = products.map((product) => ({
    model: product.model,
    _id: product._id,
    category: product.category,
    image: product.images[0],
    hasSizes: product.variants.some((variant) => variant.size !== null),
  }));
  const [product, setProduct] = useState({
    _id: "",
    model: "",
    color: "",
    sizes: [],
    hasSizes: false,
  });

  const [colors, setColors] = useState([]);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const autocompleteChangeHandler = (e, value) => {
    if (value) {
      console.log(value);
      setProduct((prev) => ({
        ...prev,
        model: value.model,
        _id: value._id,
        hasSizes: value.hasSizes,
      }));
      const colorsArr = products
        .find((product) => product._id === value._id)
        .colors.map((color) => color.name);

      setColors(colorsArr);
    }
  };
  const checkBoxesHandler = (e) => {
    const { value } = e.target;
    if (product.sizes.includes(value)) {
      setProduct((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((size) => size !== value),
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, value],
      }));
    }
  };
  const colorsMenuItems = colors.map((color) => {
    if (!product._id) return null;
    const colorCodes = products
      .find(({ _id }) => product._id === _id)
      .colors.find(({ name }) => name === color).colorCodes;

    return (
      <MenuItem key={color} value={color}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {colorCodes.map((code, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: code,
                width: "20px",
                height: "20px",
                display: "inline-block",
                marginRight: "5px",
                borderRadius: "1px",
                border: "1px solid #000",
              }}
            ></Box>
          ))}
          {color}
        </Box>
      </MenuItem>
    );
  });

  const addProductLine = () => {
    addProductLineHandler(product);
    setProduct({
      _id: "",
      model: "",
      color: "",
      sizes: [],
    });
  };
  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={1} sx={{ alignItems: "flex-start" }}>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12}>
            <Autocomplete
              options={cleanedProducts}
              getOptionLabel={(option) => option.model}
              onChange={autocompleteChangeHandler}
              value={product}
              isOptionEqualToValue={(option, value) => {
                return option.model === value.model;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Model"
                  placeholder="Select Product Model"
                />
              )}
              renderOption={(props, option) => {
                return (
                  <Box
                    component="li"
                    {...props}
                    sx={{
                      fontSize: 15,
                      ...props.sx,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <img
                      width={60}
                      height={60}
                      src={`${backendAPI}/uploads/${option.category}/${option.image}`}
                      alt={option.model}
                    />
                    {option.model}
                  </Box>
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              sx={{ display: product.model ? "flex" : "none" }}
            >
              <InputLabel>Color</InputLabel>
              <Select
                id="color"
                name="color"
                label="Color"
                value={product.color}
                onChange={handleChange}
              >
                {colorsMenuItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                display: product.model && product.hasSizes ? "flex" : "none",
              }}
            >
              Sizes
            </Typography>
            <FormGroup
              row
              sx={{
                display: product.model && product.hasSizes ? "flex" : "none",
              }}
            >
              {Array.from({ length: 11 }, (_, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={product.sizes.includes((index + 36).toString())}
                    />
                  }
                  label={(index + 36).toString()}
                  value={(index + 36).toString()}
                  onChange={checkBoxesHandler}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      <Button
        sx={{ ml: "auto", mt: 1 }}
        size="small"
        onClick={addProductLine}
        disabled={
          !product.model ||
          !product.color ||
          (product.sizes.length < 1 && product.hasSizes)
        }
      >
        Add product line
      </Button>
    </Box>
  );
};
export default SingleProductLine;

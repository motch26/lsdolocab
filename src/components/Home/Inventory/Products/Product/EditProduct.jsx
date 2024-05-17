import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Colors from "../Colors";
import { toSentenceCase } from "../../../../../utils/strings";
import { RemoveCircle } from "@mui/icons-material";
const { VITE_API_URL } = import.meta.env;
const EditProduct = ({
  open,
  dialogsCloseHandler,
  editHandler,
  product,
  types,
}) => {
  const filteredProduct = Object.keys(product).length
    ? {
        model: product.model,
        brand: product.brand,
        category: product.category,
        useFor: product.useFor,
        buyPrice: product.buyPrice[product.buyPrice.length - 1]?.price,
        sellPrice: product.sellPrice[product.sellPrice.length - 1]?.price,
        colors: product.colors,
        hasSizes: product.variants.some((variant) => variant.size !== null),
        dataURLs: product.images.map((image) => {
          const imgLink = `${VITE_API_URL}/uploads/${product.category}/${image}`;
          return imgLink;
        }),
        images: [],
      }
    : {
        model: "",
        brand: "",
        category: "",
        useFor: [],
        buyPrice: "",
        sellPrice: "",
        colors: [],
        hasSizes: false,
        images: [],
        dataURLs: [],
      };
  const [form, setForm] = useState({
    ...filteredProduct,
  });
  const onDrop = useCallback((acceptedFiles) => {
    // Only take the first file from the acceptedFiles array
    const file = acceptedFiles[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          dataURLs: [reader.result], // Only store the latest file data URL
          images: [file], // Only store the latest file
        }));
      };

      reader.readAsDataURL(file);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 }); // Limit the Dropzone to accept only 1 file

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const colorHandler = (color) => {
    setForm((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
    }));
  };

  const removeColor = (index) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };
  const switchChange = () => {
    setForm((prev) => ({
      ...prev,
      hasSizes: !prev.hasSizes,
    }));
  };
  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      // images: prev.images.filter((_, i) => i !== index),
      dataURLs: prev.dataURLs.filter((_, i) => i !== index),
    }));
  };
  const closeDialog = () => {
    dialogsCloseHandler("editProduct");
    setForm({
      model: "",
      brand: "",
      category: "",
      useFor: [],
      buyPrice: "",
      colors: [],
      hasSizes: false,
    });
  };

  const editDialog = () => {
    editHandler(form);
    closeDialog();
  };
  const brands = Object.keys(types).length
    ? types
        .find((type) => type.name === "brand")
        .values.map(({ name }) => (
          <MenuItem key={name} value={name}>
            {toSentenceCase(name)}
          </MenuItem>
        ))
    : [];

  const categories = Object.keys(types).length
    ? types

        .find((type) => type.name === "category")
        .values.map(({ name }) => (
          <MenuItem key={name} value={name}>
            {toSentenceCase(name)}
          </MenuItem>
        ))
    : [];

  const usesFor = Object.keys(types).length
    ? types
        .find((type) => type.name === "useFor")
        .values.map(({ name }) => (
          <MenuItem key={name} value={name}>
            {toSentenceCase(name)}
          </MenuItem>
        ))
    : [];
  const isValidToSubmit = true;

  useEffect(() => {
    if (Object.keys(product).length) {
      setForm({
        ...filteredProduct,
      });
    }
  }, [product, open]);
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("editProduct")}
      maxWidth="md"
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to add a new product.
        </DialogContentText>
        <Box>
          <Grid container spacing={1} sx={{ alignItems: "flex-start" }}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="model"
                  name="model"
                  label="Name/Model"
                  type="text"
                  fullWidth
                  value={form?.model}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Brand</InputLabel>
                  <Select
                    id="brand"
                    name="brand"
                    label="Brand"
                    value={form?.brand}
                    onChange={handleChange}
                  >
                    <MenuItem value={"-"}>{"-"}</MenuItem>

                    {brands}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    id="category"
                    name="category"
                    label="Category"
                    value={form?.category}
                    onChange={handleChange}
                  >
                    <MenuItem value={"-"}>{"-"}</MenuItem>

                    {categories}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Use For</InputLabel>
                  <Select
                    id="useFor"
                    label="useFor"
                    name="useFor"
                    value={form?.useFor}
                    onChange={handleChange}
                    multiple
                  >
                    <MenuItem value={"-"}>{"-"}</MenuItem>

                    {usesFor}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="buyPrice"
                  name="buyPrice"
                  label="Buy Price"
                  type="text"
                  fullWidth
                  value={form?.buyPrice}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="sellPrice"
                  name="sellPrice"
                  label="Sell Price"
                  type="text"
                  fullWidth
                  value={form?.sellPrice}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">Has Sizes?</Typography>
                <Switch checked={form?.hasSizes} onChange={switchChange} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ color: "primary.light" }}>
                  Colors
                </Typography>
                <Colors
                  hasSizes={form.hasSizes}
                  colors={form.colors}
                  colorHandler={colorHandler}
                  removeColor={removeColor}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ color: "primary.light" }}>
                  Images
                </Typography>
                <Box
                  {...getRootProps()}
                  sx={{ cursor: "pointer", p: 1, borderStyle: "dashed" }}
                >
                  <Input {...getInputProps()} />
                  <Typography>
                    Drag 'n' drop some files here, or click to select files
                  </Typography>
                </Box>
              </Grid> */}
            </Grid>
            {/* <Grid container item xs={4}>
              {form.dataURLs.length &&
                form.dataURLs.map((image, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ position: "relative" }}>
                      <img
                        style={{
                          width: "100%",
                          height: 150,
                          objectFit: "cover",
                        }}
                        src={image}
                        alt={`Preview ${index}`}
                      />
                      <IconButton
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        onClick={() => removeImage(index)}
                      >
                        <RemoveCircle />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
            </Grid> */}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          variant="contained"
          onClick={editDialog}
          disabled={!isValidToSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;

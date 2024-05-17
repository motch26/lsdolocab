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
import React, { useCallback, useState } from "react";
import Colors from "./Colors";
import { useDropzone } from "react-dropzone";
import { RemoveCircle } from "@mui/icons-material";
import { toSentenceCase } from "../../../../utils/strings";

const AddProduct = ({ open, dialogsCloseHandler, addHandler, types }) => {
  const [form, setForm] = useState({
    model: "",
    brand: "",
    category: "",
    useFor: [],
    buyPrice: "",
    sellPrice: "",
    colors: [],
    dataURLs: [],
    images: [],
    hasSizes: false,
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

  const switchChange = () => {
    setForm((prev) => ({
      ...prev,
      hasSizes: !prev.hasSizes,
    }));
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

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const closeDialog = () => {
    dialogsCloseHandler("addProduct");
    setForm({
      model: "",
      brand: "",
      category: "",
      useFor: [],
      buyPrice: "",
      colors: [],
      dataURLs: [],
      images: [],
      hasSizes: false,
    });
  };

  const addDialog = () => {
    addHandler(form);
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
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("reset")}
      maxWidth="md"
    >
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to add a new product.
        </DialogContentText>
        <Box>
          <Grid container spacing={1} sx={{ alignItems: "flex-start" }}>
            <Grid item container xs={form.dataURLs.length ? 8 : 12} spacing={1}>
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
                  colors={form.colors}
                  colorHandler={colorHandler}
                  removeColor={removeColor}
                  hasSizes={form.hasSizes}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Grid container item xs={4}>
              {form.dataURLs.map((image, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ position: "relative" }}>
                    <img
                      style={{ width: "100%", height: 150, objectFit: "cover" }}
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
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          variant="contained"
          onClick={addDialog}
          disabled={!isValidToSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;

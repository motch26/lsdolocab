import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SingleProductLine from "./SingleProductLine";
import { getFromLocalStorage } from "../../../../utils/localStorage";

const AddCargo = ({
  open,
  dialogsCloseHandler,
  addCargoHandler,
  products,
  types,
}) => {
  const [addedProducts, setAddedProducts] = useState([]);
  const [cargoInfo, setCargoInfo] = useState({
    name: "",
    courier: "",
    otherExpenses: 0,
    productsExpenses: 0,
    updatedBy: getFromLocalStorage("ls_user").name,
  });

  const closeDialog = () => {
    dialogsCloseHandler("addCargo");
  };
  const addHandler = () => {
    addCargoHandler({ ...cargoInfo, products: addedProducts });
  };

const addProductLineHandler = (product) => {
    const updatedProducts = [...addedProducts, product];
    const productsExpenses = updatedProducts.reduce((total, addedProduct) => {
        const product = products.find((p) => p._id === addedProduct._id);
        const latestBuyPrice =
            product.buyPrice[product.buyPrice.length - 1].price;
        return total + latestBuyPrice;
    }, 0);
    setCargoInfo((prevCargoInfo) => ({
        ...prevCargoInfo,
        productsExpenses: productsExpenses,
    }));
    setAddedProducts(updatedProducts);
};

  const onChangesHandler = (e) => {
    setCargoInfo({ ...cargoInfo, [e.target.name]: e.target.value });
  };

  const courierMenuItems = types
    .find((type) => type.name === "courier")
    .values.map((courier, index) => (
      <MenuItem key={index} value={courier.name}>
        {courier.name}
      </MenuItem>
    ));
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("addCargo")}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add Cargo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to add a new cargo.
        </DialogContentText>
        <Grid container spacing={1}>
          <Grid item xs={addedProducts.length ? 8 : 12}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Grid container spacing={1} sx={{ alignItems: "flex-start" }}>
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={12}>
                    {" "}
                    <SingleProductLine
                      products={products}
                      addProductLineHandler={addProductLineHandler}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Cargo Name"
                      variant="outlined"
                      name="name"
                      fullWidth
                      value={cargoInfo.name}
                      helperText="optional"
                      onChange={onChangesHandler}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Courier</InputLabel>
                      <Select
                        id="courier"
                        name="courier"
                        label="Courier"
                        value={cargoInfo.courier}
                        onChange={onChangesHandler}
                      >
                        <MenuItem value={"-"}>{"-"}</MenuItem>

                        {courierMenuItems}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Other Expenses"
                      variant="outlined"
                      name="otherExpenses"
                      fullWidth
                      value={cargoInfo.otherExpenses}
                      onChange={onChangesHandler}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Total Expenses"
                      variant="outlined"
                      name="productsExpenses"
                      fullWidth
                      value={cargoInfo.productsExpenses}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              {addedProducts.map((product, productIndex) => (
                <Box key={productIndex} sx={{ p: 1 }}>
                  <Typography variant="body1" fontWeight={500}>{`${
                    productIndex + 1
                  }. ${product.model}`}</Typography>
                  <Box>
                    <Typography variant="body1" fontWeight={400}>
                      {product.color}
                    </Typography>
                    {product.sizes.length > 0 && (
                      <Typography variant="caption">
                        Sizes: {product.sizes.join(", ")}
                      </Typography>
                    )}
                    <Divider />
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          variant="contained"
          onClick={addHandler}
          disabled={addedProducts.length < 1}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCargo;

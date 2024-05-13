import { Label } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ReceiveCargo = ({
  open,
  dialogsCloseHandler,
  cargo,
  receiveCargoHandler,
}) => {
  const cleanedCargo = cargo.products.reduce((acc, product) => {
    const existingProduct = acc.find((p) => p.model === product.model);
    if (existingProduct) {
      product.variants.forEach((variant) => {
        if (
          !existingProduct.variants.some(
            (v) => v.color === variant.color && v.size === variant.size
          )
        ) {
          existingProduct.variants.push({
            color: variant.color,
            size: variant.size,
            stocks: 0,
          });
        }
      });
    } else {
      acc.push({
        _id: product._id,
        model: product.model,
        variants: product.variants.map((variant) => ({
          color: variant.color,
          size: variant.size,
          stocks: 0,
        })),
      });
    }
    return acc;
  }, []);

  const [cargoWithStocks, setCargoWithStocks] = useState([]);

  const closeDialog = () => {
    dialogsCloseHandler("receiveCargo");
  };
  const receiveHandler = () => {
    receiveCargoHandler({ _id: cargo._id, products: cargoWithStocks });
    closeDialog();
  };

  const addToCargoWithStocks = (product) => {
    const existingProductIndex = cargoWithStocks.findIndex(
      (p) => p._id === product._id
    );
    if (existingProductIndex !== -1) {
      const updatedCargoWithStocks = [...cargoWithStocks];
      updatedCargoWithStocks[existingProductIndex] = product;
      setCargoWithStocks(updatedCargoWithStocks);
    } else {
      const updatedCargoWithStocks = [...cargoWithStocks, product];
      setCargoWithStocks(updatedCargoWithStocks);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("receiveCargo")}
      maxWidth="md"
    >
      <DialogTitle>Receive Cargo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill up the stocks of the products in this cargo. <br />
          Note: Click 'Save' after filling up the stocks for each product.
        </DialogContentText>
        {cleanedCargo.map((product) => (
          <PerCargoProduct
            key={product._id}
            product={product}
            addToCargoWithStocks={addToCargoWithStocks}
            cargoWithStocks={cargoWithStocks}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button variant="contained" onClick={receiveHandler}>
          Receive
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PerCargoProduct = ({
  product,
  addToCargoWithStocks,
  cargoWithStocks,
}) => {
  const [productsForm, setProductsForm] = useState({
    _id: product._id,
    model: product.model,
    variants: product.variants.map((variant) => ({
      color: variant.color,
      size: variant.size,
      stocks: 0,
    })),
  });
  const uniqueColors = product.variants.reduce((acc, variant) => {
    if (!acc.includes(variant.color)) {
      acc.push(variant.color);
    }
    return acc;
  }, []);
  const [currentColor, setCurrentColor] = useState(uniqueColors[0]);

  const tabChangeHandler = (e, val) => {
    setCurrentColor(val);
  };
  const changeStocksHandler = (e, variant) => {
    const updatedProductsForm = {
      ...productsForm,
      variants: productsForm.variants.map((v) => {
        if (v.color === variant.color && v.size === variant.size) {
          return {
            ...v,
            stocks: parseInt(e.target.value),
          };
        }
        return v;
      }),
    };
    setProductsForm(updatedProductsForm);
  };
  const saveHandler = () => {
    addToCargoWithStocks(productsForm);
  };
  const isInCargoWithStocks = cargoWithStocks.some(
    (p) => p._id === productsForm._id
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Label />
        <Typography fontWeight={600}>{product.model}</Typography>
      </Box>
      <Tabs value={currentColor} onChange={tabChangeHandler}>
        {uniqueColors.map((color) => (
          <Tab key={color} label={color} value={color} />
        ))}
      </Tabs>
      <Box>
        {product.variants
          .filter((variant) => variant.color === currentColor)
          .map((variant) => {
            const stocks = productsForm.variants.find(
              (v) => v.color === variant.color && v.size === variant.size
            )?.stocks;
            return (
              <Box
                key={variant.size}
                sx={{ display: "flex", gap: 1, alignItems: "center", p: 1 }}
              >
                <Typography>{variant.size}</Typography>
                <TextField
                  size="small"
                  label="Stocks"
                  variant="outlined"
                  type="number"
                  value={stocks || ""}
                  onChange={(e) => changeStocksHandler(e, variant)}
                />
              </Box>
            );
          })}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" size="small" onClick={saveHandler}>
          Save
        </Button>
        <Typography sx={{ display: isInCargoWithStocks ? "block" : "none" }}>
          Stocks saved!
        </Typography>
      </Box>
    </Box>
  );
};

export default ReceiveCargo;

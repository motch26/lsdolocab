import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

const ViewCargo = ({ open, dialogsCloseHandler, cargo }) => {
  const closeDialog = () => {
    dialogsCloseHandler("viewCargo");
  };
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("viewCargo")}
      maxWidth="md"
    >
      <DialogTitle>{cargo.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here's the list of products in this cargo:
        </DialogContentText>
        {generateCargoDetails(cargo)}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const generateCargoDetails = (cargo) => {
  const updatedVariants = [];
  for (const product of cargo.products) {
    const colors = {};
    for (const variant of product.variants) {
      const { color, size } = variant;
      if (color in colors) {
        if (size) {
          colors[color].sizes.push(size);
        }
      } else {
        colors[color] = { color, sizes: size ? [size] : [] };
      }
    }
    const variants = Object.values(colors).map((color) => ({
      name: color.color,
      sizes: color.sizes,
    }));
    updatedVariants.push({ model: product.model, variants });
  }

  return (
    <>
      {" "}
      <Box>
        {updatedVariants.map((product, productIndex) => (
          <Box key={productIndex} sx={{ p: 1 }}>
            <Typography variant="body1" fontWeight={500}>{`${
              productIndex + 1
            }. ${product.model}`}</Typography>
            {product.variants.map((variant, index) => (
              <Box key={index}>
                <Typography variant="body1" fontWeight={400}>
                  {variant.name}
                </Typography>
                {variant.sizes.length > 0 && (
                  <Typography variant="caption">
                    Sizes: {variant.sizes.join(", ")}
                  </Typography>
                )}
                <Divider />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ViewCargo;

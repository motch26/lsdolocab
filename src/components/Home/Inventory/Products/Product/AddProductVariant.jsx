import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import VariantForm from "./VariantForm";

const AddProductVariant = ({
  open,
  product,
  dialogsCloseHandler,
  addProductVariantHandler,
}) => {
  const [variants, setVariants] = useState([]);
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("addProductVariant")}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Product Variant for {product.model}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to add a new product variant.
        </DialogContentText>
        <Box>
          {" "}
          <Box
            sx={{
              bgcolor: "white",
              p: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ bgcolor: "white", p: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    height: 50,
                    width: 50,
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "red",
                      flex: 1,
                    }}
                  ></Box>
                  <Box
                    sx={{
                      bgcolor: "grey",
                      flex: 1,
                    }}
                  ></Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box sx={{ fontWeight: "bold" }}>Color Name:</Box>
                    <Box>Color Name</Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box sx={{ fontWeight: "bold" }}>Sizes:</Box>
                    <Box sx={{ gap: 2 }}>
                      <Chip size="small" label="37" />
                      <Chip size="small" label="38" />
                      <Chip size="small" label="39" />
                      <Chip size="small" label="40" />
                      <Chip size="small" label="41" />
                      <Chip size="small" label="42" />
                      <Chip size="small" label="43" />
                    </Box>
                  </Box>
                </Box>
                {/* <Button sx={{ ml: "auto" }} onClick={() => removeColor(index)}>
                  <RemoveCircle />
                </Button> */}
              </Box>
            </Box>
          </Box>
          <Grid container spacing={1} sx={{ alignItems: "flex-start" }}>
            <VariantForm />
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductVariant;

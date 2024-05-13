import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DeleteProduct = ({
  product,
  dialogsCloseHandler,
  deleteHandler,
  open,
}) => {
  const deleteProduct = () => {
    dialogsCloseHandler("deleteProduct");
    deleteHandler(product._id);
  };
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("editProduct")}
      maxWidth="md"
    >
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {product.model}? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dialogsCloseHandler("deleteProduct")}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={deleteProduct}
          color="primary"
          variant="contained"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProduct;

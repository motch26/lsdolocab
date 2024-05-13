import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DeleteTypeValue = ({
  open,
  dialogsCloseHandler,
  value,
  deleteTypeValueHandler,
}) => {
  const deleteHandler = () => {
    deleteTypeValueHandler(value._id);
  };
  const closeDialog = () => {
    dialogsCloseHandler("deleteTypeValue");
  };
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("deleteTypeValue")}
      maxWidth="md"
    >
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {value.name}? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button variant="contained" onClick={deleteHandler}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTypeValue;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DeleteUser = ({
  open,
  dialogsCloseHandler,
  selectedUser,
  deleteHandler,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("reset")}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{selectedUser.username}</strong>? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogsCloseHandler("delete")}>Cancel</Button>
        <Button variant="contained" onClick={() => deleteHandler(selectedUser)}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUser;

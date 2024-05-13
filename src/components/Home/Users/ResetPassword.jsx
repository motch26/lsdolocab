import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ResetPassword = ({
  open,
  dialogsCloseHandler,
  selectedUser,
  resetHandler,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("reset")}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Reset User Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reset the password for{" "}
          <strong>{selectedUser.username}</strong>? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogsCloseHandler("reset")}>Cancel</Button>
        <Button variant="contained" onClick={() => resetHandler(selectedUser)}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPassword;

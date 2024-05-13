import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const UnreserveCargo = ({
  cargo,
  open,
  dialogsCloseHandler,
  unreserveCargoHandler,
}) => {
  const closeDialog = () => {
    dialogsCloseHandler("unreserveCargo");
  };
  const unreserveHandler = () => {
    closeDialog();
    unreserveCargoHandler(cargo._id);
  };
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("unreserveCargo")}
      maxWidth="md"
    >
      <DialogTitle>Unreserve Cargo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to unreserve {cargo.name}? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button variant="contained" onClick={unreserveHandler}>
          Unreserve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnreserveCargo;

import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

const ResponseModal = ({
  open,
  handleClose,
  isSuccess,
  message,
  redirectPath,
}) => {
  const closeDialog = () => handleClose(redirectPath);
  useEffect(() => {
    return;
  }, [redirectPath, isSuccess]);

  return (
    <Dialog open={open} onClose={closeDialog} aria-labelledby="response-dialog">
      <DialogTitle id="response-dialog">
        <Typography
          color={isSuccess ? "secondary.main" : "error.main"}
          variant="h6"
        >
          {isSuccess ? "Success" : "Error"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponseModal;

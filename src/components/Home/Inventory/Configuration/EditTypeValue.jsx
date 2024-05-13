import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const EditTypeValue = ({
  open,
  dialogsCloseHandler,
  value,
  editTypeValueHandler,
}) => {
  const [editted, setEditted] = useState("");
  const handleChange = (e) => {
    setEditted(e.target.value);
  };
  const closeDialog = () => {
    dialogsCloseHandler("editTypeValue");
    setEditted("");
  };
  const editHandler = () => {
    editTypeValueHandler(editted);
    setEditted("");
  };
  useEffect(() => {
    setEditted(value.name);
  }, [value, open]);
  if (Object.keys(value).length === 0) return null;
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("editTypeValue")}
      maxWidth="md"
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to add a new product.
        </DialogContentText>
        <Box>
          <Grid container spacing={1} sx={{ alignItems: "flex-start" }}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="eddited"
                  name="eddited"
                  label="Value"
                  type="text"
                  fullWidth
                  value={editted}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          variant="contained"
          onClick={editHandler}
          disabled={value.name === editted}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTypeValue;

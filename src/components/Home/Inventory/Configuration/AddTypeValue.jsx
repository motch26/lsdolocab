import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const AddTypeValue = ({ open, dialogsCloseHandler, addTypeValueHandler }) => {
  const [form, setForm] = useState({
    entryName: "",
    typeName: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const closeDialog = () => {
    dialogsCloseHandler("addTypeValue");
    setForm({
      entryName: "",
      typeName: "",
    });
  };

  const addHandler = () => {
    addTypeValueHandler(form);
    setForm({
      entryName: "",
      typeName: "",
    });
  };
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("addTypeValue")}
      maxWidth="md"
    >
      <DialogTitle>Add Type Value</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to add a new type value.
        </DialogContentText>
        <Box>
          <Grid container spacing={1} sx={{ alignItems: "flex-start" }}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Entry For</InputLabel>
                  <Select
                    id="typeName"
                    label="typeName"
                    name="typeName"
                    value={form?.typeName}
                    onChange={handleChange}
                  >
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="brand">Brand</MenuItem>
                    <MenuItem value="useFor">Use For</MenuItem>
                    <MenuItem value="courier">Courier</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="entryName"
                  name="entryName"
                  label="Entry Name"
                  type="text"
                  fullWidth
                  value={form.entryName}
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
          onClick={addHandler}
          disabled={form.entryName.length < 2 || !form.typeName}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTypeValue;

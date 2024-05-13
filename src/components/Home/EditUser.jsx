import React from "react";
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

const EditUser = ({
  showEditUser,
  setShowEditUser,
  userInfo,
  submitEditUser,
}) => {
  const [form, setForm] = React.useState({
    ...userInfo,
    confirmPassword: "",
  });
  const handleClose = () => {
    setForm((prev) => ({
      ...prev,
      confirmPassword: "",
    }));
    setShowEditUser(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    submitEditUser(form);
    handleClose();
  };

  const isValidToSubmit =
    form?.password === form?.confirmPassword && form?.password.length >= 5;
  return (
    <Dialog
      open={showEditUser}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">Edit Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To edit your account, please enter your changes here.
        </DialogContentText>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                type="text"
                fullWidth
                value={form?.username}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                value={form?.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={form?.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                value={form?.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!isValidToSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;

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
import { useState } from "react";
import RolesCheckBox from "./reusables/RolesCheckBox";

const AddUser = ({ open, dialogsCloseHandler, addHandler }) => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    accessRoles: [],
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const handleRoleChange = (e) => {
    const { value } = e.target;
    if (form.accessRoles.includes(value)) {
      setForm((prev) => ({
        ...prev,
        accessRoles: prev.accessRoles.filter((role) => role !== value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        accessRoles: [...prev.accessRoles, value],
      }));
    }
  };
  const isValidToSubmit =
    form?.password === form?.confirmPassword &&
    form?.password.length >= 5 &&
    form.accessRoles.length >= 1;
  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("reset")}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to add a new user.
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
                onChange={handleChange}
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
          <RolesCheckBox
            checkedRoles={form.accessRoles}
            handleRoleChange={handleRoleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogsCloseHandler("add")}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => addHandler(form)}
          disabled={!isValidToSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;

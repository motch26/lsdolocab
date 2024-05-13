import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import RolesCheckBox from "./reusables/RolesCheckBox";

const EditUser = ({ open, dialogsCloseHandler, selectedUser, editHandler }) => {
  const [form, setForm] = useState(selectedUser);
  //   const [checkedRoles, setCheckedRoles] = useState(accessRoles);

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

  const handleNameChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const closeHandler = () => {
    editHandler(form);
    dialogsCloseHandler("edit");
  };
  useEffect(() => {
    setForm(selectedUser);
  }, [selectedUser]);

  return (
    <Dialog
      open={open}
      onClose={() => dialogsCloseHandler("edit")}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the form to edit user details.
        </DialogContentText>
        <Grid container spacing={2} sx={{ p: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              value={form.username}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={form.name}
              variant="outlined"
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <RolesCheckBox
              checkedRoles={form.accessRoles}
              handleRoleChange={handleRoleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogsCloseHandler("edit")}>Cancel</Button>
        <Button variant="contained" onClick={closeHandler}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;

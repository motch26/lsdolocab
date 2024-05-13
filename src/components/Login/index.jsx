import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { login } from "../../handlers/users";
import logo from "../../assets/logo.jpg";
import ResponseModal from "../reusables/ResponseModal";
import { saveToLocalStorage } from "../../utils/localStorage";
import Loading from "../reusables/Loading";

export const Component = () => {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const [responseModal, setResponseModal] = React.useState({
    open: false,
    message: "",
    isSuccess: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(form, {
      method: "POST",
      encType: "application/json",
      action: "/",
    });
  };

  const closeResponseModal = () => {
    setResponseModal((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        setResponseModal((prev) => ({
          ...prev,
          open: true,
          message: actionData.error,
        }));
      } else {
        saveToLocalStorage("ls_user", actionData);
        navigate("/home");
      }
    }
  }, [actionData]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Avatar src={logo} />
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            LSDolocab
          </Typography>
        </Box>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleChange}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            name="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={["submitting", "loading"].includes(navigation.state)}
          >
            Login
          </Button>
        </Box>
      </Paper>
      <ResponseModal
        open={responseModal.open}
        isSuccess={responseModal.isSuccess}
        message={responseModal.message}
        handleClose={closeResponseModal}
      />
      <Loading open={["submitting", "loading"].includes(navigation.state)} />
    </Container>
  );
};

export const action = async ({ request }) => {
  let json = await request.json();
  return await login(json);
};

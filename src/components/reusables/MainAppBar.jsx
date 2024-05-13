import {
  AppBar,
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import { AccountCircle, Edit, Logout } from "@mui/icons-material";
import { removeFromLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const MainAppBar = ({ setShowEditUser, userInfo }) => {
  const navigate = useNavigate();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleAnchorMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleEditUser = () => {
    handleMenuClose();
    setShowEditUser(true);
  };
  const logout = () => {
    removeFromLocalStorage("ls_user");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar
          alt="LSDolocab"
          src={logo}
          sx={{ width: 36, height: 36, mr: 3 }}
        />
        <Typography
          variant="h6"
          fontWeight={700}
          component="div"
          sx={{ flexGrow: 1 }}
        >
          LSDolocab
        </Typography>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ mr: 1, textTransform: "initial" }}
        >
          {userInfo.name}
        </Typography>
        <IconButton size="large" onClick={handleAnchorMenu}>
          <AccountCircle sx={{ color: "white" }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditUser}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;

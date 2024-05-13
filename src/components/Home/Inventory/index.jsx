import { AppBar, Box, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SectionBackButton from "../SectionHeader";
import { Inventory, Search } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const searchHandler = () => {
    console.log(search);
  };
  const navigateHandler = (path) => navigate(path);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(100vh - 64px)", // Subtract the AppBar height
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <SectionBackButton Icon={Inventory} title={"Inventory"} />
            <Button onClick={() => navigateHandler("products")}>
              Products
            </Button>
            <Button onClick={() => navigateHandler("cargos")}>Cargos</Button>
            <Button onClick={() => navigateHandler("configuration")}>
              Configuration
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              placeholder="Search Products"
            />
            <IconButton
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={searchHandler}
            >
              <Search />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Box sx={{ width: "100%", p: 1, bgcolor: "white", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

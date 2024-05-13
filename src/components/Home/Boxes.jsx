import { AttachMoney, Inventory, People, Store } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const boxesMapping = [
  {
    icon: <People sx={{ fontSize: 80 }} />,
    title: "USERS",
    path: "users",
    has: "users",
  },
  {
    icon: <Inventory sx={{ fontSize: 80 }} />,
    title: "INVENTORY",
    path: "inventory/products",
    has: "products",
  },
  {
    icon: <Store sx={{ fontSize: 80 }} />,
    title: "SESSION",
    path: ".", // TODO: Change this to the session page
    has: "store",
  },
  {
    icon: <AttachMoney sx={{ fontSize: 80 }} />,
    title: "SALES",
    path: ".", // TODO: Change this to the sales page
    has: "sales",
  },
];
export const Component = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const { accessRoles } = outletContext;
  const handleBoxClick = (path) => {
    navigate(path);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)", // Subtract the AppBar height
      }}
    >
      <Grid container spacing={2}>
        {boxesMapping.map((box) => {
          if (accessRoles.includes(box.has)) {
            return (
              <Grid item xs={3} key={box.title}>
                <Button
                  sx={{ width: "100%" }}
                  onClick={() => handleBoxClick(box.path)}
                >
                  <Box
                    sx={{
                      p: 3,
                      width: "100%",
                      bgcolor: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {box.icon}

                    <Typography variant="h6">{box.title}</Typography>
                  </Box>
                </Button>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Container>
  );
};

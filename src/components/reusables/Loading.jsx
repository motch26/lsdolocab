import React from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import { CircularProgress, LinearProgress, Typography } from "@mui/material";

const Loading = ({ open }) => {
  return (
    <Dialog open={open}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
          gap: 3,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Box>
    </Dialog>
  );
};

export default Loading;

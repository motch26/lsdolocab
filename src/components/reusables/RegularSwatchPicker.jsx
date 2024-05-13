import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import { SwatchesPicker } from "react-color";

const RegularSwatchPicker = ({ open, pickColor, closeSwatches }) => {
  const closeDialog = (e, reason) => {
    if (reason === "backdropClick") return;
    console.log("closing dialog");
  };
  const handlePick = (color) => {
    pickColor(color.hex);
    closeSwatches();
  };
  return (
    <Dialog open={open} maxWidth="xs" onClose={closeDialog}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Choose a color
        <IconButton onClick={closeSwatches}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <SwatchesPicker height={200} color="#000" onChange={handlePick} />
      </DialogContent>
    </Dialog>
  );
};

export default RegularSwatchPicker;

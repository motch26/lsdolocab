import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import RegularSwatchPicker from "../../../reusables/RegularSwatchPicker";
import { RemoveCircle } from "@mui/icons-material";

const ColorForm = ({ saveHandler, hasSizes }) => {
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");

  const [swatchesOpen, setSwatchesOpen] = useState(false);
  const [sizes, setSizes] = useState({
    men: false,
    women: false,
  });

  const handleChange = (e) => {
    setColorName(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setSizes((prev) => ({
      ...prev,
      [e.target.value]: e.target.checked,
    }));
  };
  const openSwatches = () => {
    setSwatchesOpen(true);
  };

  const closeSwatches = () => {
    setSwatchesOpen(false);
  };

  const pickColor = (color) => {
    setColors((prev) => [...prev, color]);
    setSwatchesOpen(false);
  };

  const removeColor = (index) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const saveColor = () => {
    saveHandler({ name: colorName, colorCodes: colors, sizes });
    setColorName("");
    setColors([]);
    setSizes({
      men: false,
      women: false,
    });
  };

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          id="colorName"
          label="Color Name"
          value={colorName}
          onChange={handleChange}
          sx={{ flexGrow: 1 }}
        />
        <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
          {colors.map((color, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: color,
                height: "100%",
                minHeight: 50,
                flexGrow: 1,
                position: "relative",
                border: 1,
                borderRadius: 1,
              }}
            >
              <Button
                sx={{ position: "absolute", top: -15, right: -25 }}
                onClick={() => removeColor(index)}
              >
                <RemoveCircle />
              </Button>
            </Box>
          ))}

          <Button
            variant="outlined"
            sx={{
              flexGrow: 1,
              display: colors.length < 2 ? "block" : "none",
            }}
            onClick={openSwatches}
            size="large"
          >
            Add Swatch
          </Button>
        </Box>

        {hasSizes && (
          <Box>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={sizes.women} />}
                label="Women Size"
                value={"women"}
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                control={<Checkbox checked={sizes.men} />}
                label="Men Size"
                value={"men"}
                onChange={handleCheckboxChange}
              />
            </FormGroup>
          </Box>
        )}
      </Box>
      <Button variant="outlined" fullWidth onClick={saveColor}>
        Save Color
      </Button>
      <RegularSwatchPicker
        open={swatchesOpen}
        pickColor={pickColor}
        closeSwatches={closeSwatches}
      />
    </Box>
  );
};
const Colors = ({ colors, colorHandler, removeColor, hasSizes }) => {
  const saveHandler = (color) => {
    colorHandler(color);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {colors.map((color, index) => (
        <Box
          key={index}
          sx={{ bgcolor: "white", p: 1, border: "1px solid black" }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {color.colorCodes.length === 1 ? (
              <Box
                sx={{
                  bgcolor: color.colorCodes[0],
                  height: 50,
                  width: 50,
                  borderRadius: 1,
                  border: "1px solid black",
                }}
              ></Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  height: 50,
                  width: 50,
                  borderRadius: 1,
                  border: "1px solid black",
                }}
              >
                <Box
                  sx={{
                    bgcolor: color.colorCodes[0],
                    flex: 1,
                  }}
                ></Box>
                <Box
                  sx={{
                    bgcolor: color.colorCodes[1],
                    flex: 1,
                  }}
                ></Box>
              </Box>
            )}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ fontWeight: "bold" }}>Color Name:</Box>
                <Box>{color.name}</Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ fontWeight: "bold" }}>Color Codes:</Box>
                <Box>{color.colorCodes.join(", ")}</Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ fontWeight: "bold" }}>Sizes:</Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {Object.entries(color.sizes).reduce((acc, [size, value]) => {
                    if (value) {
                      acc.push(<Box key={size}>{size}</Box>);
                    }
                    return acc;
                  }, [])}
                  {Object.values(color.sizes).every((value) => !value) && (
                    <Box>N/A</Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Button sx={{ ml: "auto" }} onClick={() => removeColor(index)}>
              <RemoveCircle />
            </Button>
          </Box>
        </Box>
      ))}

      <ColorForm saveHandler={saveHandler} hasSizes={hasSizes} />
    </Box>
  );
};

export default Colors;

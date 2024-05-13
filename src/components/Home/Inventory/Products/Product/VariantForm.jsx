import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

const VariantForm = ({ variants }) => {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>Brand</InputLabel>
        <Select
          id="brand"
          name="brand"
          label="Brand"
          //   value={form?.brand}
          //   onChange={handleChange}
        >
          <MenuItem value="Nike">
            <Box sx={{ display: "flex" }}>
              <Box sx={{ bgcolor: "red", flex: 1 }}>s</Box>
              <Box>Nike</Box>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default VariantForm;

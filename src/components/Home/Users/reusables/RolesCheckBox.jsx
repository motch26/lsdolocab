import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
const roles = [
  {
    label: "Users",
    key: "users",
  },
  {
    label: "Inventory",
    key: "products",
  },
  {
    label: "Sessions",
    key: "store",
  },
  {
    label: "Sales",
    key: "sales",
  },
];
const RolesCheckBox = ({ checkedRoles, handleRoleChange }) => {
  if (checkedRoles)
    return (
      <>
        <Typography variant="body2">Access Roles</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {roles.map((role) => (
            <Box key={role.key} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={checkedRoles.includes(role.key)}
                onChange={handleRoleChange}
                value={role.key}
              />
              <Typography>{role.label}</Typography>
            </Box>
          ))}
        </Box>
      </>
    );
};

export default RolesCheckBox;

import { createTheme } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red[900],
    },
    background: {
      default: "#000",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

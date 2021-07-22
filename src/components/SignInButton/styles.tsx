import { makeStyles } from "@material-ui/core/styles";

import { green, red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  red: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  green: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    checkbox: {
      margin: theme.spacing(1),
    },
    textField: {
      minWidth: 120,
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

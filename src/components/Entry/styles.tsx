import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    list: {
      maxWidth: 800,
      backgroundColor: theme.palette.background.paper,
    },
    textField: {
      minWidth: 120,
      margin: theme.spacing(1),
    },
  })
);

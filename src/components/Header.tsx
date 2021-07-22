import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import { useStyles } from "./App";

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">Mailpy MGMT</Typography>
        <Typography variant="subtitle2" style={{ marginLeft: "20px" }}>
          In order to make changes to the mailing system, please contact claudio.carneiro@cnpem.br
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

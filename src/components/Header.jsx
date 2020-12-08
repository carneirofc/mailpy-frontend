import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const Header = ({ classes }) => {
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
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default Header;

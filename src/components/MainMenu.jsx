import React from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SignInButton from "./SignInButton";

const MainMenu = (props) => {
  const { classes } = props;

  const auth = useSelector((state) => state.auth);

  const name = auth.name ? auth.name : "disconnected";
  const email = auth.username ? auth.username : "please login";

  const renderButtons = () => {
    return [
      { name: "Home", target: "/home" },
      { name: "Entries", target: "/entries" },
      { name: "Groups", target: "/groups" },
      { name: "Conditions", target: "/conditions" },
    ].map((e) => (
      <Link style={{ textDecoration: "none" }} to={e.target} key={e.name}>
        <ListItem variant="outlined" color="primary" button key={e.name}>
          <ListItemText primary={e.name} style={{ textAlign: "center" }} />
        </ListItem>
      </Link>
    ));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider style={{ marginBottom: "25px" }} />
      <List>{renderButtons()}</List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText style={{ textAlign: "center" }} primary={name} secondary={email} />
        </ListItem>
        <SignInButton style={{ marginBottom: "5px", marginTop: "25px" }} />
      </List>
    </Drawer>
  );
};
MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainMenu;

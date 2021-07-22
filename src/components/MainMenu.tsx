import { useSelector } from "react-redux";
import { Drawer, Divider, List, ListItem, ListItemText } from "@material-ui/core";

import SignInButton from "./SignInButton";
import { ListItemLink } from "./Link";
import { RootState } from "../app/store";
import { useStyles } from "./App";

function MainMenu() {
  const auth = useSelector((state: RootState) => state.auth);
  const classes = useStyles();

  const name = auth.name ? auth.name : "disconnected";
  const email = auth.username ? auth.username : "please login";

  const renderButtons = () => {
    return [
      { name: "Home", target: "/home" },
      { name: "Entries", target: "/entries" },
      { name: "Groups", target: "/groups" },
      { name: "Conditions", target: "/conditions" },
    ].map(({ name, target }, idx) => <ListItemLink primary={name} to={target} key={`${idx}`} />);
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
}
export default MainMenu;

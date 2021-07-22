import { Route, Switch, Redirect } from "react-router-dom";

import { useStyles } from "./App";
import Entries from "./Entries";
import Entry from "./Entry";
import Groups from "./Groups";
import Group from "./Group";
import Conditions from "./Conditions";
import Home from "./Home";

function Routes() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/entries" component={Entries} />
        <Route path="/entry" component={Entry} />
        <Route path="/groups" component={Groups} />
        <Route path="/group" component={Group} />
        <Route path="/conditions" component={Conditions} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
  );
}
export default Routes;

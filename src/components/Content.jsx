import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import Entries from "./Entries";
import Entry from "./Entry";
import Groups from "./Groups";
import Conditions from "./Conditions";
import Home from "./Home";

function Content(props) {
  const { classes } = props;
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/entries" component={Entries} />
        <Route path="/entry" component={Entry} />
        <Route path="/groups" component={Groups} />
        <Route path="/conditions" component={Conditions} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
  );
}
Content.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default Content;

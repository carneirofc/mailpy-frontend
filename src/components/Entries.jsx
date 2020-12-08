import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import EntriesTable from "./EntriesTable";

const Entries = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={props.path} component={EntriesTable} />
      </Switch>
    </div>
  );
};
export default withRouter(Entries);

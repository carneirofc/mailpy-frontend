import { FunctionComponent, useState } from "react";
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import EntriesTable from "./EntriesTable";

interface EntriesComponentProps extends RouteComponentProps {
  path: string;
}
const Entries: FunctionComponent<EntriesComponentProps> = (props) => {
  const [addEntry, setAddEntry] = useState<boolean>(false);
  return (
    <div>
      {addEntry ? <Redirect to="/entry" /> : null}
      <IconButton color={"primary"} onClick={() => setAddEntry(true)}>
        <Add />
      </IconButton>
      <Switch>
        <Route exact path={props.path} component={EntriesTable} />
      </Switch>
    </div>
  );
};
export default withRouter(Entries);

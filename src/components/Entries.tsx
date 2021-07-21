import { FunctionComponent, useState } from "react";
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import EntriesTable from "./EntriesTable";
import { EntryLocation } from "./Entry";
import { LocationDescriptor } from "history";

interface EntriesComponentProps extends RouteComponentProps {
  path: string;
}
const Entries: FunctionComponent<EntriesComponentProps> = (props) => {
  const [addEntry, setAddEntry] = useState<boolean>(false);
  const addEntryLocation: LocationDescriptor<EntryLocation> = { pathname: "/entry", state: { id: undefined } };
  return (
    <div>
      {addEntry ? <Redirect to={addEntryLocation} /> : null}
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

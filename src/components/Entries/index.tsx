import { FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

import { LocationDescriptor } from "history";
import { EntryLocation } from "../Entry";
import { AddIconButtonLink } from "../Link";
import { fetchGroups } from "../../actions/mailpy";
import { useAppDispatch } from "../../app/hooks";

import EntriesTable from "./EntriesTable";

interface EntriesComponentProps extends RouteComponentProps {
  path: string;
}
const Entries: FunctionComponent<EntriesComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const addEntryLocation: LocationDescriptor<EntryLocation> = { pathname: "/entry", state: { id: undefined } };
  return (
    <div>
      <IconButton color="primary" onClick={() => dispatch(fetchGroups())}>
        <Refresh />
      </IconButton>
      <AddIconButtonLink to={addEntryLocation} />
      <EntriesTable />
    </div>
  );
};
export default withRouter(Entries);

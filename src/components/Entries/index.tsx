import { FunctionComponent, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

import { LocationDescriptor } from "history";
import { EntryLocationState } from "../Entry";
import { AddIconButtonLink } from "../Link";
import { fetchEntries } from "../../actions/mailpy";
import { useAppDispatch } from "../../app/hooks";

import EntriesTable from "./table";

interface EntriesComponentProps extends RouteComponentProps {
  path: string;
}
const Entries: FunctionComponent<EntriesComponentProps> = (props) => {
  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  const dispatch = useAppDispatch();
  const addEntryLocation: LocationDescriptor<EntryLocationState> = { pathname: "/entry", state: { id: undefined } };
  return (
    <div>
      <IconButton color="primary" onClick={() => dispatch(fetchEntries())}>
        <Refresh />
      </IconButton>
      <AddIconButtonLink to={addEntryLocation} />
      <EntriesTable />
    </div>
  );
};
export default withRouter(Entries);

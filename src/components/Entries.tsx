import { FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import EntriesTable from "./EntriesTable";
import { LocationDescriptor } from "history";
import { EntryLocation } from "./Entry";
import { AddIconButtonLink } from "./Link";

interface EntriesComponentProps extends RouteComponentProps {
  path: string;
}
const Entries: FunctionComponent<EntriesComponentProps> = (props) => {
  const addEntryLocation: LocationDescriptor<EntryLocation> = { pathname: "/entry", state: { id: undefined } };
  return (
    <div>
      <AddIconButtonLink to={addEntryLocation} />
      <EntriesTable />
    </div>
  );
};
export default withRouter(Entries);

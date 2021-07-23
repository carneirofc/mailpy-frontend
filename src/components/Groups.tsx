import { useState, useEffect } from "react";
import { DataGrid, GridColumns } from "@material-ui/data-grid";
import { LocationDescriptor } from "history";
import { Group } from "mailpy-common";

import MailpyController from "../controllers/mailpy";
import { GroupLocationState } from "./Group";
import { AddIconButtonLink } from "./Link";
const columns: GridColumns = [
  { field: "id", headerName: "ID", sortable: false, flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "enabled", headerName: "Enabled", flex: 1 },
  { field: "desc", headerName: "Description", flex: 2 },
];

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const addGroupLocation: LocationDescriptor<GroupLocationState> = { pathname: "/group", state: { id: undefined } };
  const updateGroups = async () => {
    const data = await MailpyController.getGroups();
    setGroups(data);
  };

  useEffect(() => {
    updateGroups();
  }, []);

  return (
    <>
      <AddIconButtonLink to={addGroupLocation} />
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rowHeight={30} rows={groups} columns={columns} autoPageSize disableSelectionOnClick />
      </div>
    </>
  );
};

export default Groups;

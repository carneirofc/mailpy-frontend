import { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { DataGrid, GridColumns } from "@material-ui/data-grid";
import { LocationDescriptor } from "history";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGroups } from "../actions/mailpy";
import { GroupLocationState } from "./Group";
import { AddIconButtonLink } from "./Link";

const columns: GridColumns = [
  { field: "id", headerName: "ID", sortable: false, flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "enabled", headerName: "Enabled", flex: 1 },
  { field: "desc", headerName: "Description", flex: 2 },
];

const Groups = () => {
  const addGroupLocation: LocationDescriptor<GroupLocationState> = { pathname: "/group", state: { id: undefined } };
  const groups = useAppSelector((props) => props.mailpy.groups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <>
      <IconButton color="primary" onClick={() => dispatch(fetchGroups())}>
        <Refresh />
      </IconButton>
      <AddIconButtonLink to={addGroupLocation} />
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rowHeight={30} rows={groups} columns={columns} autoPageSize disableSelectionOnClick />
      </div>
    </>
  );
};

export default Groups;

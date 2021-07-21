import { useState, useEffect } from "react";
import { DataGrid, GridColumns } from "@material-ui/data-grid";
import { LocationDescriptor } from "history";
import { Redirect } from "react-router";
import { Group } from "common";
import { IconButton } from "@material-ui/core";

import MailpyController from "../controllers/mailpy";
import { GroupLocationState } from "./Group";
import { Add } from "@material-ui/icons";

const columns: GridColumns = [
  { field: "id", headerName: "ID", sortable: false, flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "enabled", headerName: "Enabled", flex: 1 },
  { field: "desc", headerName: "Description", flex: 2 },
];

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [addGroup, setAddGroup] = useState<boolean>(false);
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
      {addGroup ? <Redirect to={addGroupLocation} /> : null}
      <IconButton color={"primary"} onClick={() => setAddGroup(true)}>
        <Add />
      </IconButton>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rowHeight={30} rows={groups} columns={columns} autoPageSize disableSelectionOnClick />
      </div>
    </>
  );
};

export default Groups;

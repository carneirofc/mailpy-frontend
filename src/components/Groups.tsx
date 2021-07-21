import { useState, useEffect } from "react";
import { DataGrid, GridColumns } from "@material-ui/data-grid";

import MailpyController from "../controllers/mailpy";
import { Group } from "common";

const columns: GridColumns = [
  { field: "id", headerName: "ID", sortable: false, flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "enabled", headerName: "Enabled", flex: 1 },
  { field: "desc", headerName: "Description", flex: 2 },
];

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  const updateGroups = async () => {
    const data = await MailpyController.getGroups();
    setGroups(data);
  };

  useEffect(() => {
    updateGroups();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rowHeight={30} rows={groups} columns={columns} autoPageSize disableSelectionOnClick />
    </div>
  );
};

export default Groups;

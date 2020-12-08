import React, { useState, useEffect } from "react";

import { DataGrid } from "@material-ui/data-grid";

import MailpyController from "../controllers/Mailpy";

const columns = [
  { field: "name", headerName: "Name", width: 240 },
  { field: "enabled", headerName: "Enabled", width: 110 },
];

const Groups = () => {
  const [groups, setGroups] = useState([]);

  const updateGroups = async () => {
    const data = await MailpyController.getGroups();
    setGroups(data);
  };
  useEffect(() => updateGroups(), []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rowHeight={30} rows={groups} columns={columns} autoPageSize disableSelectionOnClick />
    </div>
  );
};

export default Groups;

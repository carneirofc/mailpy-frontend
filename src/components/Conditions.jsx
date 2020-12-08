import React, { useState, useEffect } from "react";

import { DataGrid } from "@material-ui/data-grid";

import MailpyController from "../controllers/Mailpy";

const columns = [
  { field: "name", headerName: "Condition", width: 240 },
  { field: "desc", headerName: "Description", width: 550 },
];

const Conditions = (props) => {
  const [conditions, setConditions] = useState([]);

  const updateConditions = async () => {
    const conditions = await MailpyController.getConditions();
    setConditions(conditions);
  };
  useEffect(() => {
    updateConditions();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rowHeight={30} rows={conditions} columns={columns} autoPageSize disableSelectionOnClick />
    </div>
  );
};
export default Conditions;

import { useState, useEffect } from "react";

import { Condition } from "mailpy-common";
import MailpyController from "../controllers/mailpy";
import { DataGrid, GridColumns } from "@material-ui/data-grid";

const columns: GridColumns = [
  { field: "id", headerName: "ID", sortable: false, flex: 1 },
  { field: "name", headerName: "Name", flex: 2 },
  { field: "desc", headerName: "Description", flex: 3 },
];

const Conditions = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);

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

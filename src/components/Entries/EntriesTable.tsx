import { DataGrid, GridColumns } from "@material-ui/data-grid";

import { useAppSelector } from "../../app/hooks";

const columns: GridColumns = [
  { field: "pvname", headerName: "PV Name", width: 260 },
  { field: "unit", headerName: "Unit", width: 120 },
  { field: "condition", headerName: "Condition", width: 140 },
  { field: "alarmValues", headerName: "Value Range", width: 260 },
  { field: "group", headerName: "Group", width: 120 },
  { field: "emailTimeout", headerName: "E-Mail Timeout", width: 160 },
  { field: "emails", headerName: "E-mails", flex: 2 },
  { field: "subject", headerName: "Subject", flex: 2 },
  { field: "warningMessage", headerName: "Warning Message", flex: 2 },
];

const EntriesTable = () => {
  const entries = useAppSelector((props) => props.mailpy.entries);
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rowHeight={30} rows={entries} columns={columns} autoPageSize disableSelectionOnClick />
    </div>
  );
};

export default EntriesTable;
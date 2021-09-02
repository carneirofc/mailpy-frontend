import { DataGrid, GridColumns } from "@material-ui/data-grid";
import { Edit } from "@material-ui/icons";
import { LocationDescriptor } from "history";

import { useAppSelector } from "../../app/hooks";
import { EntryLocationState } from "../Entry";
import { IconButtonLink } from "../Link";

const columns: GridColumns = [
  {
    align: "center",
    disableColumnMenu: true,
    editable: false,
    field: "",
    headerName: "",
    hideSortIcons: false,
    sortable: false,
    width: 120,
    renderCell: (params) => {
      const editLocation: LocationDescriptor<EntryLocationState> = {
        pathname: "/entry",
        state: { id: params.row.id },
      };
      return (
        <span>
          <IconButtonLink color="primary" icon={<Edit />} to={editLocation} />
        </span>
      );
    },
  },
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
  const entriesCols = entries.map((e) => ({
    id: e.id,
    pvname: e.pvname,
    unit: e.unit,
    condition: e.condition.name,
    alarmValues: e.alarm_values,
    group: e.group.name,
    emailTimeout: e.email_timeout,
    emails: e.emails,
    subject: e.subject,
    warningMessage: e.warning_message,
  }));
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={entriesCols} columns={columns} autoPageSize disableSelectionOnClick />
    </div>
  );
};

export default EntriesTable;

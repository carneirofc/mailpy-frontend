import React from "react";

import { DataGrid } from "@material-ui/data-grid";

import MailpyController from "../controllers/Mailpy";

const columns = [
  { field: "pvname", headerName: "PV Name", width: 260 },
  { field: "unit", headerName: "Unit", width: 120 },
  { field: "condition", headerName: "Condition", width: 140 },
  { field: "alarmValues", headerName: "Value Range", width: 260 },
  { field: "emails", headerName: "E-mails", width: 300 },
  { field: "emailTimeout", headerName: "E-Mail Timeout", width: 160 },
  { field: "group", headerName: "Group", width: 120 },
  { field: "subject", headerName: "Subject", width: 400 },
  { field: "warningMessage", headerName: "Warning Message", width: 550 },
];

class EntriesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    };
  }

  updateEntries = async () => {
    const res = await MailpyController.getEntries();
    this.setState({ entries: res });
  };

  componentDidMount() {
    this.updateEntries();
  }

  render() {
    const { entries } = this.state;
    return (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rowHeight={30} rows={entries} columns={columns} autoPageSize disableSelectionOnClick />
      </div>
    );
  }
}

export default EntriesTable;

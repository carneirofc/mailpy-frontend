import React from "react";

import { DataGrid } from "@material-ui/data-grid";

import MailpyController from "../controllers/Mailpy";

const columns = [
  { field: "name", headerName: "Condition", width: 240 },
  { field: "desc", headerName: "Description", width: 550 },
];

class Conditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conditions: [],
    };
  }

  updateConditions = async () => {
    const conditions = await MailpyController.getConditions();
    this.setState({ conditions: conditions });
  };

  componentDidMount() {
    this.updateConditions();
  }

  render() {
    const { conditions } = this.state;
    return (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rowHeight={30} rows={conditions} columns={columns} autoPageSize disableSelectionOnClick />
      </div>
    );
  }
}
export default Conditions;

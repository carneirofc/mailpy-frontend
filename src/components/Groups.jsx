import React from "react";

import { DataGrid } from "@material-ui/data-grid";

import MailpyController from "../controllers/Mailpy";

const columns = [
    {field: "name", headerName: "Name", width: 240},
    {field: "enabled", headerName: "Enabled", width: 110},
];


class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };
    }

    updateGroups = async () => {
        const data = await MailpyController.getGroups();
        this.setState({ groups: data });
    }

    componentDidMount() {
        this.updateGroups();
    }

    render() {
        const { groups }= this.state;
        return (
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rowHeight={30} rows={groups} columns={columns} autoPageSize disableSelectionOnClick/>
            </div>
        );
    }
}

export default Groups;

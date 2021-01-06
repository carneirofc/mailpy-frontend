import React from "react";
import {
    Switch,
    Route,
    withRouter,
} from "react-router-dom";

import PropTypes from "prop-types";
import EntriesTable from "./EntriesTable";

class Entries extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={this.props.path} component={EntriesTable} />
                </Switch>
            </div>
        );
    }
}
Entries.propTypes = {
    path: PropTypes.string
};
export default withRouter(Entries);

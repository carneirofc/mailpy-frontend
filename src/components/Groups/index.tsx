import { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { LocationDescriptor } from "history";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGroups } from "../../actions/mailpy";
import { GroupLocationState } from "../Group";
import { AddIconButtonLink } from "../Link";

import { columns } from "./table";

const Groups = () => {
  const addGroupLocation: LocationDescriptor<GroupLocationState> = { pathname: "/group", state: { id: undefined } };
  const groups = useAppSelector((props) => props.mailpy.groups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <>
      <IconButton color="primary" onClick={() => dispatch(fetchGroups())}>
        <Refresh />
      </IconButton>
      <AddIconButtonLink to={addGroupLocation} />
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rows={groups} columns={columns} />
      </div>
    </>
  );
};

export default Groups;

import { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { Refresh, Edit, Delete } from "@material-ui/icons";
import { DataGrid, GridColumns } from "@material-ui/data-grid";
import { LocationDescriptor } from "history";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGroups } from "../actions/mailpy";
import { GroupLocationState } from "./Group";
import { AddIconButtonLink, IconButtonLink } from "./Link";

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
      const editGroupLocation: LocationDescriptor<GroupLocationState> = {
        pathname: "/group",
        state: { id: params.row.id },
      };
      return (
        <span>
          <IconButtonLink color="primary" icon={<Edit />} to={editGroupLocation} />
          <IconButton color="secondary">
            <Delete />
          </IconButton>
        </span>
      );
    },
  },
  {
    disableColumnMenu: true,
    editable: false,
    field: "id",
    flex: 1,
    headerName: "ID",
    hideSortIcons: false,
    sortable: false,
    type: "string",
  },
  {
    disableColumnMenu: true,
    editable: false,
    field: "name",
    flex: 1,
    headerName: "Name",
    hideSortIcons: false,
    type: "string",
  },
  {
    align: "center",
    disableColumnMenu: true,
    editable: false,
    field: "enabled",
    headerName: "Enabled",
    hideSortIcons: false,
    type: "boolean",
    width: 130,
  },
  {
    disableColumnMenu: true,
    editable: false,
    field: "desc",
    flex: 2,
    headerName: "Description",
    hideSortIcons: false,
    type: "string",
  },
];

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

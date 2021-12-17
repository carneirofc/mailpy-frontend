import { useEffect } from "react";

import { DataGrid, GridCellValue, GridComparatorFn, GridSortCellParams } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchEntries } from "../../actions/mailpy";

const sortComparator: GridComparatorFn = (
  v1: GridCellValue,
  v2: GridCellValue,
  cellParams1: GridSortCellParams,
  cellParams2: GridSortCellParams
) => {
  return v1 ? Number(v1.valueOf()) : -1;
};
const columns: GridColumns = [
  {
    editable: false,
    field: "ts",
    flex: 1,
    headerName: "ts",
    hideSortIcons: false,
    sortable: true,
    type: "Date",
    disableColumnMenu: true,
    sortComparator,
  },
  {
    disableColumnMenu: false,
    editable: false,
    field: "pvname",
    flex: 2,
    headerName: "Name",
    filterable: true,
    hideSortIcons: false,
  },
  {
    disableColumnMenu: true,
    editable: false,
    field: "value",
    flex: 1,
    headerName: "Value",
    hideSortIcons: false,
  },
  {
    disableColumnMenu: true,
    editable: false,
    field: "message",
    flex: 2,
    headerName: "Message",
    hideSortIcons: false,
  },
];
export default function Entries() {
  const events = useAppSelector((props) => props.mailpy.events).map(({ ts, data, id, type }) => ({
    id,
    type,
    ts: new Date(ts),
    pvname: data["pvname"],
    value: data["value_measured"],
    condition: data["condition"],
    message: data["specified_value_message"],
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  return (
    <>
      <IconButton color="primary" onClick={() => dispatch(fetchEntries())}>
        <Refresh />
      </IconButton>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid disableColumnFilter={false} disableColumnMenu={false} rows={events} columns={columns} />
      </div>
    </>
  );
}

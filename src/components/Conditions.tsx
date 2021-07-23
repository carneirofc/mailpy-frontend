import { useEffect } from "react";
import { DataGrid, GridColumns } from "@material-ui/data-grid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchConditions } from "../actions/mailpy";
import { IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

const columns: GridColumns = [
  { field: "id", headerName: "ID", sortable: false, flex: 1 },
  { field: "name", headerName: "Name", flex: 2 },
  { field: "desc", headerName: "Description", flex: 3 },
];

const Conditions = () => {
  const conditions = useAppSelector((state) => state.mailpy.conditions);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchConditions());
  }, []);

  return (
    <>
      <IconButton color="primary" onClick={() => dispatch(fetchConditions())}>
        <Refresh />
      </IconButton>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rowHeight={30} rows={conditions} columns={columns} autoPageSize disableSelectionOnClick />
      </div>
    </>
  );
};
export default Conditions;

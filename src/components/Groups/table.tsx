import { Edit } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import { LocationDescriptor } from "history";

import { GroupLocationState } from "../Group";
import { IconButtonLink } from "../Link";

export const columns: GridColumns = [
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

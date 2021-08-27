import { FunctionComponent, useState } from "react";
import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import AlertDialog from "./AlertDialog";

type DeleteDialogProps = {
  enabled: boolean;
  title: string;
  contentText: string;
  handleCancel?(): Promise<void>;
  handleOk?(): Promise<void>;
};

const AlertDialogButton: FunctionComponent<DeleteDialogProps> = ({
  enabled,
  children,
  handleCancel,
  handleOk,
  ...props
}) => {
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);
  return (
    <>
      {" "}
      {enabled ? (
        <AlertDialog
          open={deleteAlertDialogOpen}
          {...props}
          handleCancel={
            handleCancel
              ? () => handleCancel().finally(() => setDeleteAlertDialogOpen(false))
              : async () => setDeleteAlertDialogOpen(false)
          }
          handleOk={
            handleOk
              ? () => handleOk().finally(() => setDeleteAlertDialogOpen(false))
              : async () => setDeleteAlertDialogOpen(false)
          }
        />
      ) : null}
      <Button disabled={!enabled} variant="outlined" color="secondary" onClick={() => setDeleteAlertDialogOpen(true)}>
        <span style={{ margin: "0 0.3rem 0 0" }}>Delete</span>
        <Delete />
      </Button>
    </>
  );
};
export default AlertDialogButton;

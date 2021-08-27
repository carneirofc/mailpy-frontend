import { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { TextField, Checkbox, FormControlLabel, FormControl, Button } from "@material-ui/core";
import { Update, Create } from "@material-ui/icons";
import { useStyles } from "./styles";
import MailpyController from "../../controllers/mailpy";
import AlertDialogButton from "../AlertDialogButton";

export type GroupLocationState = { id?: string };
export type GroupComponentT = FunctionComponent<RouteComponentProps<{}, StaticContext, GroupLocationState>>;
const GroupComponent: GroupComponentT = (props) => {
  const classes = useStyles();
  const [id, setId] = useState(props.location.state.id);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  type gParam = { desc: string; enabled: boolean; id?: string; name: string };
  const updateGroup = ({ desc, enabled, id, name }: gParam) => {
    setId(id);
    setDesc(desc);
    setEnabled(enabled);
    setName(name);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      MailpyController.getGroup(id)
        .then((group) => updateGroup(group))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const isNameValid: boolean = name?.trim().length !== 0;
  const isDescValid: boolean = desc?.trim().length !== 0;
  const isValid: boolean = isNameValid && isDescValid;

  const handleInsert = async () => {
    setLoading(true);
    await MailpyController.insertGroup({ desc, enabled, name })
      .then((group) => updateGroup(group))
      .finally(() => setLoading(false));
  };

  const handleUpdate = async () => {
    setLoading(true);
    await MailpyController.updateGroup({ desc, enabled, name, id })
      .then((group) => updateGroup(group))
      .finally(() => setLoading(false));
  };

  const handleConfirm = async () => {
    if (loading) return;
    id ? handleUpdate() : handleInsert();
  };

  const handleDelete = async () => {
    if (id) await MailpyController.deleteGroup(id);
  };

  return (
    <div>
      <h3>ID: {id ? id : "new group"}</h3>
      <form>
        <TextField
          disabled={loading}
          className={classes.textField}
          label="Name"
          variant="outlined"
          error={!isNameValid}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          disabled={loading}
          className={classes.textField}
          label="Description"
          variant="outlined"
          error={!isDescValid}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <FormControl component="fieldset" className={classes.checkbox}>
          <FormControlLabel
            disabled={loading}
            className={classes.button}
            label="Enabled"
            labelPlacement="start"
            control={<Checkbox color="primary" checked={enabled} onChange={(_, checked) => setEnabled(checked)} />}
          />
        </FormControl>
      </form>
      <Button color="primary" disabled={!isValid} variant="outlined" className={classes.button} onClick={handleConfirm}>
        <span style={{ margin: "0 0.3rem 0 0" }}>{id ? "Update" : "Create"}</span>
        {id ? <Update /> : <Create />}
      </Button>

      <AlertDialogButton
        enabled={id !== null && id !== undefined}
        handleOk={async () => await handleDelete()}
        title="Alarm group delete"
        contentText={`Confirm the alarm group "${name}" id "${id}" deletion?"`}
      />
    </div>
  );
};

export default GroupComponent;

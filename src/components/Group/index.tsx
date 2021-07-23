import { FunctionComponent, useState } from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { TextField, Checkbox, FormControlLabel, FormControl, Button } from "@material-ui/core";
import { useStyles } from "./styles";
import MailpyController from "../../controllers/mailpy";

export type GroupLocationState = { id?: string };
const GroupComponent: FunctionComponent<RouteComponentProps<{}, StaticContext, GroupLocationState>> = (props) => {
  const classes = useStyles();
  const [id, setId] = useState(props.location.state.id);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [enabled, setEnabled] = useState(true);

  const isNameValid: boolean = name?.trim().length !== 0;
  const isDescValid: boolean = desc?.trim().length !== 0;
  const isValid: boolean = isNameValid && isDescValid;

  const [loading, setLoading] = useState(false);

  const handleInsert = async () => {
    setLoading(true);
    await MailpyController.insertGroup({ desc, enabled, name })
      .then(({ name, id, desc, enabled }) => {
        setName(name);
        setId(id);
        setEnabled(enabled);
        setDesc(desc);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleUpdate = async () => {
    setLoading(true);
    await MailpyController.updateGroup({ desc, enabled, name, id })
      .then(({ name, id, desc, enabled }) => {
        setName(name);
        setId(id);
        setEnabled(enabled);
        setDesc(desc);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleConfirm = async () => {
    if (loading) return;
    id ? handleUpdate() : handleInsert();
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
      <Button disabled={!isValid} variant="outlined" className={classes.button} onClick={handleConfirm}>
        {id ? "Update" : "Create"}
      </Button>
    </div>
  );
};

export default GroupComponent;

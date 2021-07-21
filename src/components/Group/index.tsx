import { FunctionComponent, useState } from "react";
import { RouteComponentProps, StaticContext } from "react-router";
import { TextField, Checkbox, FormControlLabel, FormControl } from "@material-ui/core";
import { useStyles } from "./styles";

export type GroupLocationState = { id?: string };
const GroupComponent: FunctionComponent<RouteComponentProps<{}, StaticContext, GroupLocationState>> = (props) => {
  const classes = useStyles();
  const { id } = props.location.state;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [enabled, setEnabled] = useState(true);

  return (
    <div>
      <h3>ID: {id ? id : "new group"}</h3>
      <form>
        <TextField
          className={classes.textField}
          label="Name"
          variant="outlined"
          error={!name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Description"
          variant="outlined"
          error={!desc}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <FormControl component="fieldset" className={classes.checkbox}>
          <FormControlLabel
            label="Enabled"
            labelPlacement="start"
            control={<Checkbox color="primary" checked={enabled} onChange={(_, checked) => setEnabled(checked)} />}
          />
        </FormControl>
      </form>
    </div>
  );
};

export default GroupComponent;

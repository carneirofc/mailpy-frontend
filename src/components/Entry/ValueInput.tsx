import { FunctionComponent } from "react";
import { TextField } from "@material-ui/core";
import { ConditionName, isAlarmValueValid } from "common";

import { useStyles } from "./styles";

interface ValueInputComponentParams {
  condition: ConditionName;
  setValue(value: string): void;
  value: string;
}

const ValueInputComponent: FunctionComponent<ValueInputComponentParams> = (params) => {
  const classes = useStyles();
  const { value, setValue, condition } = params;
  // @todo: An object per condition type
  if (condition === ConditionName.DECREASING_STEP) {
    setValue("");
    return null;
  }
  return (
    <div>
      <TextField
        className={classes.textField}
        label="Alarm Value"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={!isAlarmValueValid(value, condition)}
      />
    </div>
  );
};
export default ValueInputComponent;

import { FunctionComponent } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import { ConditionName, Group } from "mailpy-common";
import ValueInput from "./ValueInput";

const ConditionNameOptions: string[] = Object.values(ConditionName);

type ConditionComboBoxProps = {
  setCondition(condition: ConditionName): void;
  condition: ConditionName;
  alarmValue: string;
  setAlarmValue(value: string): void;
};
export const ConditionComboBox: FunctionComponent<ConditionComboBoxProps> = ({
  condition,
  setCondition,
  alarmValue,
  setAlarmValue,
}) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.textField}
        select
        variant="outlined"
        label="Condition"
        value={condition}
        onChange={(e) => setCondition(e.target.value as ConditionName)}
      >
        {ConditionNameOptions.map((_value) => (
          <MenuItem key={_value} value={_value}>
            {_value}
          </MenuItem>
        ))}
      </TextField>
      <ValueInput condition={condition} setValue={(value) => setAlarmValue(value)} value={alarmValue}></ValueInput>
    </div>
  );
};

type GroupComboBoxProps = {
  group?: Group;
  groups?: Group[];
  setGroupHandler(value: string): void;
};
export const GroupComboBox: FunctionComponent<GroupComboBoxProps> = ({ group, setGroupHandler, groups }) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      select
      variant="outlined"
      label="Group"
      error={!group}
      value={group ? group.name : ""}
      onChange={(e) => setGroupHandler(e.target.value)}
    >
      {groups
        ? groups.map(({ id, name }) => (
            <MenuItem key={id} value={name}>
              {name}
            </MenuItem>
          ))
        : null}
    </TextField>
  );
};

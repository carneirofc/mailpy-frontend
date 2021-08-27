import { FunctionComponent } from "react";

import { TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import { ConditionComboBox, GroupComboBox } from "./ComboBox";
import { ConditionName, Group } from "mailpy-common";
import Emails from "./Emails";
type InputsProps = {
  addEmail(): void;
  alarmValue: string;
  condition: ConditionName;
  deleteEmail(email: string): void;
  emailNew: string;
  emailTimeout: number;
  emails: string[];
  group?: Group;
  groups?: Group[];
  pvname: string;
  setAlarmValue(value: string): void;
  setCondition(value: ConditionName): void;
  setEmailNew(value: string): void;
  setEmailTimeoutHandler(value: string): void;
  setGroupHandler(value: string): void;
  setPvname(value: string): void;
  setSubject(value: string): void;
  setUnit(value: string): void;
  setWarningMessage(value: string): void;
  subject: string;
  unit: string;
  warningMessage: string;
};
const Inputs: FunctionComponent<InputsProps> = ({
  alarmValue,
  pvname,
  subject,
  condition,
  unit,
  warningMessage,
  group,
  groups,
  setGroupHandler,
  setPvname,
  setUnit,
  setSubject,
  setWarningMessage,
  setCondition,
  setAlarmValue,
  emailNew,
  emailTimeout,
  emails,
  setEmailNew,
  setEmailTimeoutHandler,
  addEmail,
  deleteEmail,
}) => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        className={classes.textField}
        label="PV Name"
        variant="outlined"
        value={pvname}
        error={!pvname || pvname.search(" ") !== -1}
        onChange={(e) => setPvname(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Unit"
        variant="outlined"
        error={!unit}
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Subject"
        variant="outlined"
        value={subject}
        error={!subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Warning Message"
        variant="outlined"
        value={warningMessage}
        error={!warningMessage}
        onChange={(e) => setWarningMessage(e.target.value)}
      />
      <GroupComboBox group={group} groups={groups} setGroupHandler={setGroupHandler} />

      <ConditionComboBox
        alarmValue={alarmValue}
        setCondition={setCondition}
        condition={condition}
        setAlarmValue={setAlarmValue}
      />

      <Emails
        addEmail={addEmail}
        deleteEmail={deleteEmail}
        emailNew={emailNew}
        emailTimeout={emailTimeout}
        emails={emails}
        setEmailNew={setEmailNew}
        setEmailTimeoutHandler={setEmailTimeoutHandler}
      />
    </div>
  );
};
export default Inputs;

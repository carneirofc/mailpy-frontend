import { FunctionComponent, useState, useEffect } from "react";

import {
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import { Delete, Add } from "@material-ui/icons";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { ConditionName, Group } from "mailpy-common";
import { useStyles } from "./styles";
import ValueInput from "./ValueInput";
import MailpyController from "../../controllers/mailpy";

const ConditionNameOptions: string[] = Object.values(ConditionName);
export type EntryLocation = { id?: string };
const EntryComponent: FunctionComponent<RouteComponentProps<{}, StaticContext, EntryLocation>> = (props) => {
  const classes = useStyles();

  const { id } = props.location.state;

  const [alarmValue, setAlarmValue] = useState<string>("");
  const [condition, setCondition] = useState<ConditionName>(ConditionName.SUPERIOR_THAN);
  const [pvname, setPvname] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");

  const [emailNew, setEmailNew] = useState<string>("");
  const [emailTimeout, setEmailTimeout] = useState<number>(1600);
  const [emails, setEmails] = useState<string[]>([]);

  const setEmailTimeoutHandler = (value: string) => {
    const num: number = Number(value);
    if (Number.isNaN(num)) return;
    if (num <= 0) return;
    setEmailTimeout(num);
  };
  const addEmail = () => {
    const emailSet = new Set<string>();
    emails.forEach((e) => emailSet.add(e));
    if (emailNew) emailSet.add(emailNew);
    setEmails(Array.from(emailSet.values()));
  };
  const deleteEmail = (email: string) => {
    setEmails(emails.filter((value) => email !== value.replace(/\s+/g, "")));
  };

  const [group, setGroup] = useState<Group>();
  const [groups, setGroups] = useState<Group[]>();
  const setGroupHandler = (name: string) => {
    groups?.forEach((g) => {
      if (g.name === name) {
        setGroup(g);
      }
    });
  };
  const loadGroup = async () => {
    const _groups = await MailpyController.getGroups();
    setGroups(_groups);
  };
  useEffect(() => {
    loadGroup();
  }, []);

  return (
    <form noValidate autoComplete="off" className={classes.root}>
      <div>
        <h3>ID: {id ? id : "new entry"}</h3>
      </div>
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
        <TextField
          className={classes.textField}
          select
          variant="outlined"
          label="Group"
          error={!group}
          value={group ? group.name : ""}
          onChange={(e) => setGroupHandler(e.target.value)}
        >
          {groups ? (
            groups.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))
          ) : (
            <></>
          )}
        </TextField>
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
      </div>
      <div>
        <TextField
          label="email timeout (s)"
          variant="outlined"
          value={emailTimeout}
          error={!emailTimeout || emailTimeout <= 0}
          onChange={(e) => setEmailTimeoutHandler(e.target.value)}
          className={classes.textField}
        />
        <TextField
          label="new email"
          variant="outlined"
          value={emailNew}
          error={emailNew?.search(/\s/g) !== -1}
          onChange={(e) => setEmailNew(e.target.value)}
          className={classes.textField}
        />
        <IconButton edge="end" onClick={addEmail}>
          <Add />
        </IconButton>
        <List className={classes.list}>
          {emails.map((item, idx) => (
            <ListItem key={`${idx}-${item}`}>
              <ListItemText primary={item} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => deleteEmail(emails[idx])}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </form>
  );
};
export default EntryComponent;

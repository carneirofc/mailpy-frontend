import { FunctionComponent, useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import { Update, Create } from "@material-ui/icons";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { ConditionName, isAlarmValueValid, Group } from "mailpy-common";

import { useStyles } from "./styles";
import Inputs from "./Inputs";
import MailpyController from "../../controllers/mailpy";
import AlertDialogButton from "../AlertDialogButton";

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

  const deleteEmail = (email: string) => setEmails(emails.filter((value) => email !== value.replace(/\s+/g, "")));

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

  let isValid: boolean = false;
  try {
    isValid = Boolean(
      pvname &&
        pvname.search(" ") === -1 &&
        unit &&
        warningMessage &&
        subject &&
        emails?.length !== 0 &&
        group &&
        isAlarmValueValid(alarmValue, condition)
    );
  } catch {
    isValid = false;
  }

  // const handleConfirm =

  return (
    <form noValidate autoComplete="off" className={classes.root}>
      <div>
        <h3>ID: {id ? id : "new entry"}</h3>
      </div>
      <Inputs
        alarmValue={alarmValue}
        condition={condition}
        group={group}
        groups={groups}
        pvname={pvname}
        setAlarmValue={setAlarmValue}
        setCondition={setCondition}
        setGroupHandler={setGroupHandler}
        setPvname={setPvname}
        setSubject={setSubject}
        setUnit={setUnit}
        setWarningMessage={setWarningMessage}
        subject={subject}
        unit={unit}
        warningMessage={warningMessage}
        addEmail={addEmail}
        deleteEmail={deleteEmail}
        emailNew={emailNew}
        emailTimeout={emailTimeout}
        emails={emails}
        setEmailNew={setEmailNew}
        setEmailTimeoutHandler={setEmailTimeoutHandler}
      />
      <div>
        <Button
          color="primary"
          disabled={!isValid}
          variant="outlined"
          className={classes.button}
          //   onClick={handleConfirm}
        >
          <span style={{ margin: "0 0.3rem 0 0" }}>{id ? "Update" : "Create"}</span>
          {id ? <Update /> : <Create />}
        </Button>
        <AlertDialogButton
          enabled={id !== null || id !== undefined}
          handleCancel={async () => console.log("@todo: cancel")}
          handleOk={async () => console.log("@todo: ok")}
          title="Delete alarm monitor entry"
          contentText="Confirm entry deletion"
        />
      </div>
    </form>
  );
};
export default EntryComponent;

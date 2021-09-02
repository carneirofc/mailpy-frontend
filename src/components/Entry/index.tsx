import { FunctionComponent, useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import { Update, Create } from "@material-ui/icons";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { ConditionName, isAlarmValueValid, Group } from "mailpy-common";
import { Entry } from "mailpy-common";
import { useStyles } from "./styles";
import Inputs from "./Inputs";
import MailpyController from "../../controllers/mailpy";
import AlertDialogButton from "../AlertDialogButton";

export type EntryLocationState = { id?: string };
const EntryComponent: FunctionComponent<RouteComponentProps<{}, StaticContext, EntryLocationState>> = (props) => {
  const classes = useStyles();

  const [id, setId] = useState(props.location.state.id);
  const [alarmValue, setAlarmValue] = useState<string>("");
  const [condition, setCondition] = useState<ConditionName>(ConditionName.SUPERIOR_THAN);
  const [pvname, setPvname] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [group, setGroup] = useState<Group>();
  const [groups, setGroups] = useState<Group[]>();
  const [emailNew, setEmailNew] = useState<string>("");
  const [emailTimeout, setEmailTimeout] = useState<number>(1600);
  const [emails, setEmails] = useState<string[]>([]);

  function updateEntryState(e: Entry) {
    setId(e.id);
    setAlarmValue(e.alarm_values);
    setCondition(e.condition.name);
    setPvname(e.pvname);
    setSubject(e.subject);
    setUnit(e.unit);
    setWarningMessage(e.warning_message);
    setGroup(e.group);
    setEmails(e.emails);
    setEmailTimeout(e.email_timeout);
  }

  const loadGroups = async () => {
    const _groups = await MailpyController.getGroups();
    setGroups(_groups);
  };

  const loadEntry = async () => {
    if (!id) return;
    updateEntryState(await MailpyController.getEntry(id));
  };

  useEffect(() => {
    loadEntry();
  }, [id]);

  useEffect(() => {
    loadGroups();
  }, []);

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

  const setGroupHandler = (name: string) => {
    groups?.forEach((g) => {
      if (g.name === name) {
        setGroup(g);
      }
    });
  };

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
  const handleConfirm = async () => {
    if (!group) {
      console.warn(`Invalid group ${group}`);
      return;
    }

    if (!id) {
      MailpyController.insertEntry({
        alarm_values: alarmValue,
        condition_name: condition,
        email_timeout: emailTimeout,
        emails,
        group_id: group.id as string,
        pvname,
        subject,
        unit,
        warning_message: warningMessage,
      }).then((newEntry) => {
        setId(newEntry.id);
        alert(`New entry created: ${newEntry}`);
      });
      return;
    }

    MailpyController.updateEntry({
      id,
      alarm_values: alarmValue,
      condition_name: condition,
      email_timeout: emailTimeout,
      emails,
      group_id: group.id as string,
      pvname,
      subject,
      unit,
      warning_message: warningMessage,
    }).then((updatedEntry) => {
      alert(`Entry ${id} updated: ${updatedEntry}`);
    });
  };

  const handleDelete = async () => {
    if (!id) return;
    MailpyController.deleteEntry(id)
      .then((status) => {
        alert(`Entry ${id} deleted ${status}`);
      })
      .catch((e) => {
        const msg = `Failed to delete entry ${id}: error ${e}`;
        console.error(msg, e);
        alert(msg);
      });
  };

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
          onClick={handleConfirm}
        >
          <span style={{ margin: "0 0.3rem 0 0" }}>{id ? "Update" : "Create"}</span>
          {id ? <Update /> : <Create />}
        </Button>
        <AlertDialogButton
          enabled={id !== null || id !== undefined}
          handleCancel={async () => console.log("@todo: cancel")}
          handleOk={handleDelete}
          title="Delete alarm monitor entry"
          contentText="Confirm entry deletion"
        />
      </div>
    </form>
  );
};
export default EntryComponent;

import { FunctionComponent } from "react";
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Delete, Add } from "@material-ui/icons";
import { useStyles } from "./styles";

type EmailsProps = {
  emails: string[];
  emailNew: string;
  setEmailNew(value: string): void;
  emailTimeout: number;
  setEmailTimeoutHandler(value: string): void;
  addEmail(): void;
  deleteEmail(email: string): void;
};
const Emails: FunctionComponent<EmailsProps> = ({
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
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          style={{ minWidth: "75%" }}
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
      </div>
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
      <TextField
        label="email timeout (s)"
        variant="outlined"
        value={emailTimeout}
        error={!emailTimeout || emailTimeout <= 0}
        onChange={(e) => setEmailTimeoutHandler(e.target.value)}
        className={classes.textField}
      />
    </>
  );
};
export default Emails;

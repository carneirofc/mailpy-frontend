class Entry {
  constructor(props) {
    const {
      _id,
      pvname,
      unit,
      condition,
      alarm_values,
      emails,
      email_timeout,
      subject,
      group,
      warning_message,
    } = props;
    this.id = _id;
    this.pvname = pvname;
    this.unit = unit;
    this.condition = condition;
    this.alarmValues = alarm_values;
    this.emails = emails;
    this.emailTimeout = email_timeout;
    this.subject = subject;
    this.group = group;
    this.warningMessage = warning_message;
  }
}
export default Entry;

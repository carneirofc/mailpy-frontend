import { Condition, Entry, Event, Group } from "mailpy-common";

export interface AddEntry {
  group_id: string;
  condition_name: string;
  alarm_values: string;
  email_timeout: number;
  emails: string[];
  subject: string;
  unit: string;
  warning_message: string;
  pvname: string;
}

export interface UpdateEntry extends AddEntry {
  id: string;
}

export interface MailpyApi {
  getEvents(): Promise<Event[]>;
  getConditions(): Promise<Condition[]>;
  getEntries(): Promise<Entry[]>;
  getEntry(id: string): Promise<Entry>;
  getGroups(): Promise<Group[]>;
  getGroup(id: string): Promise<Group>;

  patchEntry(entry: UpdateEntry): Promise<Entry>;
  patchGroup(group: Group): Promise<Group>;

  postEntry(entry: AddEntry): Promise<Entry>;
  postGroup(group: Group): Promise<Group>;

  deleteEntry(id: string): Promise<boolean>;
  deleteGroup(id: string): Promise<boolean>;
}
export interface MSAzureApi {}

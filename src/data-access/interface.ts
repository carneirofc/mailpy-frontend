import { Condition, Entry, Group } from "mailpy-common";
export interface MailpyApi {
  getConditions(): Promise<Condition[]>;
  getEntries(): Promise<Entry[]>;
  getEntry(id: string): Promise<Entry>;
  getGroups(): Promise<Group[]>;
  getGroup(id: string): Promise<Group>;

  patchEntry(entry: Entry): Promise<Entry>;
  patchGroup(group: Group): Promise<Group>;

  postEntry(entry: Entry): Promise<Entry>;
  postGroup(group: Group): Promise<Group>;

  deleteEntry(id: string): Promise<boolean>;
  deleteGroup(id: string): Promise<boolean>;
}
export interface MSAzureApi {}

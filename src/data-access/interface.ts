import { Condition, Entry, Group } from "common";
export interface MailpyApi {
  getConditions(): Promise<Condition[]>;
  getEntries(): Promise<Entry[]>;
  getEntry(id: string): Promise<Entry>;
  getGroups(): Promise<Group[]>;
  getGroup(id: string): Promise<Group>;

  patchEntry(entry: Entry): Promise<Entry>;
  patchGroup(group: Group): Promise<Group>;

  postEntry(entry: Entry): Promise<Entry>;
  prostGroup(group: Group): Promise<Group>;
}

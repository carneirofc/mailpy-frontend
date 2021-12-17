import axios from "axios";
import https from "https";

import { MailpyApi, UpdateEntry, AddEntry } from "./interface";
import { Condition, ConditionName, Entry, Event, Group, makeCondition, makeEntry, makeGroup } from "mailpy-common";

export default function makeMailpyApi(endpoint = "https://localhost:1337/mailpy/api"): MailpyApi {
  // At instance level
  const Endpoints = {
    GET_EVENTS: `${endpoint}/events`,

    DELETE_ENTRY: `${endpoint}/entry`,
    GET_ENTRIES: `${endpoint}/entries`,
    GET_ENTRY: `${endpoint}/entry`,
    PATCH_ENTRY: `${endpoint}/entry`,
    POST_ENTRY: `${endpoint}/entry`,

    GET_GROUP: `${endpoint}/group`,
    GET_GROUPS: `${endpoint}/groups`,
    PATCH_GROUP: `${endpoint}/group`,
    POST_GROUP: `${endpoint}/group`,
    DELETE_GROUP: `${endpoint}/group`,

    GET_CONDITIONS: `${endpoint}/conditions`,
  };

  const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  interface ConditionJson {
    id: string;
    name: ConditionName;
    desc: string;
  }

  interface GroupJson {
    name: string;
    desc: string;
    enabled: boolean;
    id: string;
  }

  interface EntryJson {
    id: string;
    pvname: string;
    condition: ConditionJson;
    email_timeout: number;
    alarm_values: string;
    emails: string[];
    group: GroupJson;
    subject: string;
    unit: string;
    warning_message: string;
  }
  interface EventJson {
    id: string;
    ts: string;
    type: number;
    data: any;
  }

  class MailpyApiImpl implements MailpyApi {
    async getEvents(): Promise<Event[]> {
      const res = await axiosInstance.get<EventJson[]>(Endpoints.GET_EVENTS);
      return res.data.map(({ id, ts, type, data }) => {
        return { id, ts: new Date(ts), type, data };
      });
    }

    async deleteEntry(id: string): Promise<boolean> {
      const res = await axiosInstance.delete(Endpoints.DELETE_ENTRY, { data: { id } });
      return res.status === 200;
    }

    async deleteGroup(id: string): Promise<boolean> {
      const res = await axiosInstance.delete(Endpoints.DELETE_GROUP, { data: { id } });
      return res.status === 200;
    }

    async getConditions(): Promise<Condition[]> {
      const res = await axiosInstance.get<ConditionJson[]>(Endpoints.GET_CONDITIONS);
      return res.data.map((_json) => makeCondition(_json.name, _json.desc, _json.id));
    }

    async getEntries(): Promise<Entry[]> {
      const res = await axiosInstance.get<EntryJson[]>(Endpoints.GET_ENTRIES);
      return res.data.map((_json) => makeEntry(_json));
    }

    async getEntry(id: string): Promise<Entry> {
      const res = await axiosInstance.get<EntryJson>(Endpoints.GET_ENTRY, { params: { id } });
      return makeEntry(res.data);
    }

    async getGroups(): Promise<Group[]> {
      const res = await axiosInstance.get<GroupJson[]>(Endpoints.GET_GROUPS);
      return res.data.map((_json) => makeGroup(_json));
    }

    async getGroup(id: string): Promise<Group> {
      const res = await axiosInstance.get<GroupJson>(Endpoints.GET_GROUP, { params: { id } });
      return makeGroup(res.data);
    }

    async patchEntry(entry: UpdateEntry): Promise<Entry> {
      const res = await axiosInstance.patch<EntryJson>(Endpoints.PATCH_ENTRY, { ...entry });
      return makeEntry(res.data);
    }

    async patchGroup(group: Group): Promise<Group> {
      const res = await axiosInstance.patch<GroupJson>(Endpoints.POST_GROUP, { ...group });
      return makeGroup(res.data);
    }

    async postEntry(entry: AddEntry): Promise<Entry> {
      const res = await axiosInstance.post<EntryJson>(Endpoints.POST_ENTRY, { ...entry });
      return makeEntry(res.data);
    }

    async postGroup(group: Group): Promise<Group> {
      const res = await axiosInstance.post<GroupJson>(Endpoints.POST_GROUP, { ...group });
      return makeGroup(res.data);
    }
  }
  return new MailpyApiImpl();
}
/*
get / mailpy / api / conditions;
get / mailpy / api / entries;
delete /mailpy/aip / entry;
get / mailpy / api / entry;
patch / mailpy / api / entry;
post / mailpy / api / entry;
get / mailpy / api / group;
patch / mailpy / api / group;
post / mailpy / api / group;
get / mailpy / api / groups;
get / mailpy / api / user / login;
*/

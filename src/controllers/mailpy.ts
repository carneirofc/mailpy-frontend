import { api } from "../data-access";
import { Condition, Group, Entry } from "common";

import store from "../app/store";
import { startNetwork, stopNetwork } from "../actions";

class MailpyController {
  async getEntries(): Promise<Entry[]> {
    store.dispatch(startNetwork());
    try {
      return await api.getEntries();
    } finally {
      store.dispatch(stopNetwork());
    }
  }

  async getEntry(id: string): Promise<Entry> {
    return await api.getEntry(id);
  }

  async getGroup(id: string): Promise<Group> {
    return await api.getGroup(id);
  }
  async getGroups(): Promise<Group[]> {
    return await api.getGroups();
  }

  async deleteGroup(group: Group) {}

  async insertGroup(group: Group) {}

  async updateGroup(group: Group) {}

  async getConditions(): Promise<Condition[]> {
    return await api.getConditions();
  }
}

export default new MailpyController();

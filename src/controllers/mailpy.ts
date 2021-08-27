import { api } from "../data-access";
import { Condition, Group, Entry } from "mailpy-common";

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
    store.dispatch(startNetwork());
    try {
      return await api.getEntry(id);
    } finally {
      store.dispatch(stopNetwork());
    }
  }

  async getGroup(id: string): Promise<Group> {
    store.dispatch(startNetwork());
    try {
      return await api.getGroup(id);
    } finally {
      store.dispatch(stopNetwork());
    }
  }

  async getGroups(): Promise<Group[]> {
    store.dispatch(startNetwork());
    try {
      return await api.getGroups();
    } finally {
      store.dispatch(stopNetwork());
    }
  }

  async deleteGroup(id: string): Promise<boolean> {
    store.dispatch(startNetwork());
    try {
      return await api.deleteGroup(id);
    } finally {
      store.dispatch(stopNetwork());
    }
  }

  async insertGroup(group: Group): Promise<Group> {
    store.dispatch(startNetwork());
    try {
      return await api.postGroup(group);
    } finally {
      store.dispatch(stopNetwork());
    }
  }

  async updateGroup(group: Group): Promise<Group> {
    store.dispatch(startNetwork());
    try {
      return await api.patchGroup(group);
    } finally {
      store.dispatch(stopNetwork());
    }
  }

  async getConditions(): Promise<Condition[]> {
    store.dispatch(startNetwork());
    try {
      return await api.getConditions();
    } finally {
      store.dispatch(stopNetwork());
    }
  }
}

export default new MailpyController();

import config from "../configs/mongodb";

const ENTRY_URL = config.MAILPY_API_URL + "/entry";
const GROUP_URL = config.MAILPY_API_URL + "/group";
const CONDITION_URL = config.MAILPY_API_URL + "/condition";

const ENTRIES_URL = config.MAILPY_API_URL + "/entries";
const GROUPS_URL = config.MAILPY_API_URL + "/groups";
const CONDITIONS_URL = config.MAILPY_API_URL + "/conditions";

const PROTECTED_URL = config.MAILPY_API_URL + "/protected";

class Api {
  constructor() {}

  async getProtected(token) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };

    const data = await fetch(PROTECTED_URL, options)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        return json;
      });
    return data;
  }

  async getConditions(token) {
    const options = {
      method: "GET",
    };

    const data = await fetch(CONDITIONS_URL, options)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        return json;
      });
    return data;
  }

  async getGroups() {
    const options = {
      method: "GET",
    };
    const data = await fetch(GROUPS_URL, options)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        return json;
      });
    return data;
  }

  async getEntries() {
    const options = {
      method: "GET",
    };

    const data = await fetch(ENTRIES_URL, options)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        return json;
      });
    return data;
  }
}
export default new Api();

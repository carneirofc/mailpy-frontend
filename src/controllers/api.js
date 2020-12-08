import config from "../configs/mongodb";
import store from "../store";

const ENTRY_URL = config.MAILPY_API_URL + "/entry";
const GROUP_URL = config.MAILPY_API_URL + "/group";
const CONDITION_URL = config.MAILPY_API_URL + "/condition";

const ENTRIES_URL = config.MAILPY_API_URL + "/entries";
const GROUPS_URL = config.MAILPY_API_URL + "/groups";
const CONDITIONS_URL = config.MAILPY_API_URL + "/conditions";

const PROTECTED_URL = config.MAILPY_API_URL + "/protected";

class Api {
  constructor() {
    this.apiAccessToken = null;
    this.accessToken = null;

    store.subscribe(() => {
      // Update Tokens  from store
      const { apiAccessToken, accessToken } = store.getState().auth;
      this.apiAccessToken = apiAccessToken;
      this.accessToken = accessToken;
    });
  }

  promptRedirect(url) {
    if (
      window.confirm(
        `The backend ${url} uses a self-signed SSL certificate and in order to proceede you must accept it. Click Ok to be redirected in order to accept the certificate.`
      )
    ) {
      window.location.href = url;
    }
  }

  async getProtected() {
    const headers = new Headers();
    const bearer = `Bearer ${this.apiAccessToken}`;

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
      })
      .catch((e) => {
        console.error(
          `Failed to fetch request error ${e}, the backend is either offline or the self signed certificate is not eccepted.`
        );
        this.promptRedirect(GROUPS_URL);
        return [];
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
      })
      .catch((e) => {
        console.error(
          `Failed to fetch request error ${e}, the backend is either offline or the self signed certificate is not eccepted.`
        );
        this.promptRedirect(GROUPS_URL);
        return [];
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
      })
      .catch((e) => {
        console.error(
          `Failed to fetch request error ${e}, the backend is either offline or the self signed certificate is not eccepted.`
        );
        this.promptRedirect(GROUPS_URL);
        return [];
      });
    return data;
  }
}
export default new Api();

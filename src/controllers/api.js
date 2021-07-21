import config from "../configs/api";
import store from "../store";

const USER_URL = config.MAILPY_API_URL + "/user";
const USER_INFO_URL = USER_URL + "/login";

const PROTECTED_URL = config.MAILPY_API_URL + "/protected";

class Api {
  constructor() {
    this.getApiAccessToken = () => store.getState().auth.apiAccessToken;
    this.getAccessToken = () => store.getState().auth.accessToken;
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

  async callResourceAPI(resourceURI) {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
        "Content-type": "application/json",
        Accept: "application/json",
        "Accept-Charset": "utf-8",
      },
    };
    console.log("Attempt to call Resource API");

    return await fetch(resourceURI, options).then((res) => res.json());
  }

  getTokenHeaders() {
    const headers = new Headers();
    const bearer = `Bearer ${this.getApiAccessToken()}`;
    headers.append("Authorization", bearer);
    return headers;
  }

  /** Get Registered user information from the api */
  async getUserInfo() {
    const options = {
      method: "GET",
      headers: this.getTokenHeaders(),
    };
    const data = await fetch(USER_INFO_URL, options)
      .then((data) => data.json())
      .then((data) => data);
    return data;
  }

  async getProtected() {
    await this.callResourceAPI("https://graph.microsoft.com/v1.0/me");

    const options = {
      method: "GET",
      headers: this.getTokenHeaders(),
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
}
export default new Api();

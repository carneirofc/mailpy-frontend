/**
 * Encapsulation of the identity of the user.
 */
class Identity {
  constructor(tokenResponse) {
    this.account = tokenResponse.account;
    this.idToken = tokenResponse.idToken;
    this.accessToken = tokenResponse.accessToken;
    this.raw = tokenResponse;
  }

  get userId() {
    return this.account.accountIdentifier;
  }

  get emailAddress() {
    return this.account.userName;
  }

  get name() {
    return this.account.name;
  }

  get idToken() {
    return this.idToken;
  }

  getAccessToken() {
    return this.accessToken;
  }
}
export default Identity;

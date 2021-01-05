import * as msal from "@azure/msal-browser";
import Identity from "../model/Identity";
import InteractiveSignInRequired from "../utils/InteractiveSignInRequired";
import { auth, cache, silentRequest, tokenRequest, loginRequest } from "../configs/msal";

const msalConfig = {
  auth: auth,
  cache: cache,
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case msal.LogLevel.Error:
            console.error(message);
            return;
          case msal.LogLevel.Info:
            console.info(message);
            return;
          case msal.LogLevel.Verbose:
            console.debug(message);
            return;
          case msal.LogLevel.Warning:
            console.warn(message);
        }
      },
    },
  },
};

class AuthService {
  constructor() {
    this.msalClient = new msal.PublicClientApplication(msalConfig);
    console.log("AuthService:: initialized: ", msalConfig);
  }

  getServiceName() {
    return "Microsoft";
  }

  getAccounts = async () => {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    const currentAccounts = this.msalClient.getAllAccounts();
    if (currentAccounts === null || currentAccounts.length === 0) {
      console.error("No accounts detected!");
      throw "No accounts detected";
    }
    if (currentAccounts.length > 1) {
      // Add choose account code here
      console.warn("Multiple accounts detected.", currentAccounts);
    }
    return currentAccounts[0];
  };

  handleSignInResponse = async (res) => {
    console.info("SignIn", res);
    if (res !== null) {
      return res;
    } else {
      await this.getAccounts();
    }
  };

  signIn = async () => {
    return this.msalClient
      .loginPopup(loginRequest)
      .then((res) => this.handleSignInResponse(res))
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  signOut = () => {
    this.msalClient.logout();
  };

  /** * Return a new ideentity with a token */
  acquireToken = async () => {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    //silentRequest.account = this.msalClient.getAccountByUsername(username);

    return this.msalClient
      .acquireTokenPopup({ ...tokenRequest, prompt: "consent" })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
    /*return this.msalClient.acquireTokenSilent(silentRequest).catch((error) => {
      console.warn("Silent token acquisition fails. acquiring token using interactive method", error);
      if (error) {
        // fallback to interaction when silent call fails
        tokenRequest.account = this.msalClient.getAccountByUsername(username);
        console.log("TokenRequest", tokenRequest);

        return this.msalClient
          .acquireTokenPopup(tokenRequest)
          .then(this.handleResponse)
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.warn(error);
      }
    });*/
  };
}

const authService = new AuthService();

export default authService;

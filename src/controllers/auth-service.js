import * as msal from "@azure/msal-browser";
import Identity from "../model/Identity";
import InteractiveSignInRequired from "../utils/InteractiveSignInRequired";

const msalConfig = {
  auth: {
    clientId: "21787c54-4ba3-4270-a273-adf60bc20601",
    authority: "https://login.microsoftonline.com/ed764e1f-b3b8-4aaf-8fb2-1d05be08443b",
    redirectUri: window.location.href,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  // Add scopes here for access token to be used at Microsoft Graph API endpoints.
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
const loginScopes = { scopes: ["User.Read", "Mail.Read"] };
const tokenScopes = {
  scopes: ["User.Read", "Mail.Read"],
  forceRefresh: false /* Set this to "true" to skip a cached token and go to the server to get a new token*/,
};

class AuthService {
  constructor() {
    this.msalClient = new msal.PublicClientApplication(msalConfig);
    console.log("AuthService:: initialized: ", msalConfig);
  }

  getServiceName() {
    return "Microsoft";
  }

  async signIn() {
    const loginIdentity = await this.msalClient.loginPopup(loginScopes);
    if ("accessToken" in loginIdentity && "tokenType" in loginIdentity && loginIdentity.tokenType === "Bearer") {
      console.info("Beared token already exists");
      return loginIdentity;
    }

    return await this.acquireToken();
  }

  signOut() {
    this.msalClient.logout();
  }

  /** * Return a new ideentity with a token */
  async acquireToken() {
    console.info("Getting a new bearer token");
    const currentAccounts = this.msalClient.getAllAccounts();
    if (currentAccounts === null) {
      console.error("Not account connected");
      throw new InteractiveSignInRequired();
    } else if (currentAccounts.length > 1) {
      // Add choose account code here...
      console.error("Multiple accounts detected. This should never happen here.");
      throw new InteractiveSignInRequired();
    }

    const username = currentAccounts[0].username;
    const tokenRequest = {
      account: this.msalClient.getAccountByUsername(username),
      ...tokenScopes,
    };

    if (tokenRequest.account) {
      try {
        const response = await this.msalClient.acquireTokenSilent(tokenRequest);
        return new Identity(response);
      } catch (error) {
        console.error("Silent token acquisition fails.");
        if (error instanceof msal.InteractionRequiredAuthError) {
          throw new InteractiveSignInRequired();
        }
        if (error instanceof msal.AuthError) {
          // On mobile devices, ClientAuthError is sometimes thrown when we

          // can't do silent auth - this isn't generally an issue here.

          if (error.errorCode === "block_token_requests") {
            throw new InteractiveSignInRequired();
          }
          console.warn("AuthError: error code = ", error.errorCode);
        }
        throw error;
      }
    }
    throw new InteractiveSignInRequired();
  }
}

const authService = new AuthService();

export default authService;

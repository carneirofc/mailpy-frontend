import * as msal from "@azure/msal-browser";
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
	    return;
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
export { msalConfig, loginScopes, tokenScopes };

export const auth = {
  clientId: "21787c54-4ba3-4270-a273-adf60bc20601" /** App ID */,
  authority: "https://login.microsoftonline.com/ed764e1f-b3b8-4aaf-8fb2-1d05be08443b",
  redirectUri: window.location.href,
};

export const cache = {
  cacheLocation: "sessionStorage", // This configures where your cache will be stored
  storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
};
const apiID = "3ab086b7-33bf-4f5e-8c30-72fbdbc12c25"; /** API ClientID on-behalf-of */
const apiScopes = `api://${apiID}/.default`;
//const apiScopes = `api://${apiID}/.default`;
/**
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
 * visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add here scopes for access token to be used at the API endpoints.
export const tokenRequest = {
  scopes: [apiScopes],
};

// Add here scopes for silent token request
export const silentRequest = {
  scopes: ["User.Read", apiScopes],
};

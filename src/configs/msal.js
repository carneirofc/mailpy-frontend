export default {
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
  scopes: ["User.Read", "Mail.Read", "openid", "profile"],
};

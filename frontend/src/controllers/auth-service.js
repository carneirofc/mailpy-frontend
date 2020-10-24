import * as msal from "@azure/msal-browser";
import Identity from "../model/Identity";
import InteractiveSignInRequired from "../utils/InteractiveSignInRequired";
import config from "../configs/msal";

const loggerCallback = (logLevel, message, containsPii) => {
    console.log(message);
};

class AuthService {
    constructor(configuration) {
        this.signInOptions = {
            scopes: configuration.scopes
        };
        this.msalConfig = {
            auth: configuration.auth,
            cache: configuration.cache,
            system: {
                logger: new msal.Logger(
                    loggerCallback,
                    {
                        level: msal.LogLevel.Verbose,
                        piiLoggingEnabled: false,
                        correlationId: "1234"
                    }
                )
            }
        };
        console.log("AuthService:: initialized: ", this.msalConfig);
        this.msalClient = new msal.PublicClientApplication(this.msalConfig);
        console.log("AuthService:: initialized: ", this.msalConfig);
    }

    getServiceName() {
        return "Microsoft";
    }

    async signIn() {
        const response = await this.msalClient.loginPopup(this.signInOptions);
        return new Identity(response);
    }

    signOut() {
        this.msalClient.logout();
    }

    async getIdentity() {
        const account = this.msalClient.getAccount();
        if (account) {
            try {
                const response = await this.msalClient.acquireTokenSilent(this.signInOptions);
                return new Identity(response);
            } catch (error) {
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

const authService = new AuthService(config);

export default authService;

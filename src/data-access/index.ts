import { MailpyApi } from "./interface";
import makeMailpyApi from "./mailpy-rest";

export * from "./interface";

export const api: MailpyApi = makeMailpyApi();

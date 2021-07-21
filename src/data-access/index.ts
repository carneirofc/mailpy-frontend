import { MailpyApi } from "./interface";
import makeMailpyApi from "./mailpy-rest";

export const api: MailpyApi = makeMailpyApi();

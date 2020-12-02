import EntryModel from "../model/Entry";
import ConditionModel from "../model/Condition";
import GroupModel from "../model/Group";

import MailpyApi from "./api";

class MailpyController {
    async getEntries() {
        const json = await MailpyApi.getEntries();
        return json.map((entry) => {
            return new EntryModel(entry);
        });
    }

    async getGroups() {
        const json = await MailpyApi.getGroups();
        return json.map((entry) => {
            return new GroupModel(entry);
        });

    }

    async getConditions() {
        const json = await MailpyApi.getConditions();
        return json.map((entry) => {
            return new ConditionModel(entry);
        });
    }
}

export default new MailpyController();

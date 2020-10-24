import config from "../configs/mongodb";

const ENTRY_URL = config.MAILPY_API_URL  + "/entry";
const GROUP_URL = config.MAILPY_API_URL  + "/group";
const CONDITION_URL = config.MAILPY_API_URL  + "/condition";

const ENTRIES_URL = config.MAILPY_API_URL  + "/entries";
const GROUPS_URL = config.MAILPY_API_URL  + "/groups";
const CONDITIONS_URL = config.MAILPY_API_URL  + "/conditions";

class Api {
    constructor() {
    }

    async getConditions() {
        const data = await fetch(CONDITIONS_URL, {
            method: "GET",
        }).then(data =>{
            return data.json();
        }).then(json =>{
            return json;
        });
        return data;
    }

    async getGroups() {
        const data = await fetch(GROUPS_URL, {
            method: "GET",
        }).then(data =>{
            return data.json();
        }).then(json =>{
            return json;
        });
        return data;
    }

    async getEntries() {
        const data = await fetch(ENTRIES_URL, {
            method: "GET",
        }).then(data =>{
            return data.json();
        }).then(json =>{
            return json;
        });
        return data;
    }

}
export default new Api();

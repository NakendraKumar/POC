import Query from "../middleware/query";
import Utility from "../middleware/utility";

import dbNames from "../config/dbConfig";

export default class UserService {
  static async registerUser(data) {
    const res = await Query.find(dbNames.USER, { username: data.username });
    console.log("res", res);
    if (res) {
      return { error: "User already exists!" };
    }
    // const utility = new Utility();

    // data.password = Utility.encrypt.call(utility, data.password);

    console.log("data1", data);

    const user = await Query.saveData(dbNames.USER, data);

    return user;
  }
}

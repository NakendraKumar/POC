import Response from "../middleware/response";
import UserService from "../services/userService";

const { response } = new Response();

export default class User {
  /**
   * @method RegisterUser is a method for registring unique user in the system
   * request body contains user data
   */
  static async RegisterUser(req, res) {
    try {
      console.log("1");
      console.log("211", req.body);
      const result = await UserService.registerUser(req.body);
      console.log("2", req.body);
      console.log("2", result);
      if (result.error) {
        result.statusCode = 400;
        res.status(400).send(response(result));
      } else {
        res.send(response(result));
      }
    } catch (e) {
      e.error = true;
      res.status(500).send(response(e));
    }
  }
}

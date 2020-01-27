export default class Response {
  // eslint-disable-next-line class-methods-use-this
  response(data) {
    // eslint-disable-next-line no-new-object
    let obj = new Object();
    if (data && data.MongoError) {
      obj = {
        statusCode: 500,
        message: "Error",
        error: data.MongoError
      };
    }
    // eslint-disable-next-line no-prototype-builtins
    else if (
      data !== undefined &&
      data !== null &&
      data.hasOwnProperty("error")
    ) {
      obj = {
        statusCode: data.statusCode ? data.statusCode : 500,
        message: "Error",
        data
      };
    } else {
      obj = {
        statusCode: 200,
        message: "Success",
        data
      };
    }
    // no-modification should be done after making the response object
    return Object.freeze(obj);
  }
}

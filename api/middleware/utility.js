import crypto from "crypto";
import path from "path";
import uuidv1 from "uuid/v1";
import Query from "./query";

// const _query = new Query();
class Utility {
  constructor() {
    this.algorithm = "aes256";
    this.key = "D3LPH!";
  }

  static encrypt(text) {
    try {
      const cipher = crypto.createCipher(this.algorithm, this.key);
      return (
        cipher.update(text.toString(), "utf8", "hex") + cipher.final("hex")
      );
    } catch (e) {
      // throw instead of retrun
      // todo generic error handler
      return e;
    }
  }

  static decrypt(encrypted) {
    try {
      const decipher = crypto.createDecipher(this.algorithm, this.key);
      return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
    } catch (e) {
      // throw instead of retrun
      // todo generic error handler
      return e;
    }
  }

  static async generateID(model, projection, sort, limit) {
    try {
      const res = await Query.getProjectedData(model, projection, sort, limit);
      return res[0];
    } catch (e) {
      // throw instead of retrun
      // todo generic error handler
      return e;
    }
  }

  static async uploadFile(req) {
    try {
      const { sampleFile } = req.files;
      const fileName = sampleFile.name.replace(/[^0-9a-z.]/gi, "");
      const suffix = `/build/uploads/${Date.now()}-${fileName}`;
      const localPath = path.resolve(".") + suffix;
      // path.resolve('.') +"\\"+ sampleFile.name;
      const absSuffix = `/uploads/${Date.now()}-${fileName}`;
      // eslint-disable-next-line no-unused-vars
      const data = await sampleFile.mv(localPath);
      return absSuffix;
    } catch (err) {
      console.log("----err----", err);
      return err;
    }
  }

  static async uploadIngestFile(req) {
    try {
      const { sampleFile } = req.files;
      const fileName = sampleFile.name.replace(/[^0-9a-z.]/gi, "");
      const suffix = `/build/uploads/${fileName}`;
      const localPath = path.resolve(".") + suffix;
      console.log(localPath);
      // eslint-disable-next-line no-unused-vars
      await sampleFile.mv(localPath);
      return true;
    } catch (err) {
      console.log("----err----", err);
      return err;
    }
  }

  static async uploadDocWrapper(req, entity) {
    try {
      const obj = {};
      // eslint-disable-next-line no-shadow
      const path = await this.uploadFile(req);
      obj.uuid = uuidv1();
      obj.path = path;
      obj.status = req.body.status ? parseInt(req.body.status, 10) : 0;
      obj.isDeleted = 0;
      obj.isLinked = entity ? 1 : 0;
      obj.userID = req.body.userID;
      obj.createdTimestamp = req.body.timestamp;
      obj.modifiedTimestamp = req.body.timestamp;
      const resp = await Query.saveData("document", obj);
      return resp;
    } catch (e) {
      console.log("yeaaa", e);
      return e;
    }
  }

  static async docLinkWrapper(req, model, documentInfo) {
    try {
      const entityLinkObj = {};
      entityLinkObj.documentUuid = documentInfo.uuid;
      entityLinkObj.path = documentInfo.path;
      // entityLinkObj.entityID = parseInt(req.body.entityID);
      entityLinkObj.taxStatus = req.body.taxStatus;
      entityLinkObj.entityTaxstatusLinkID = parseInt(
        req.body.entityTaxstatusLinkID,
        10
      );
      return await Query.saveData(model, entityLinkObj);
    } catch (e) {
      return e;
    }
  }

  static getUTCDate(args) {
    let isValidDate;
    if (args.includes("-")) {
      isValidDate = args
        .split("-")
        .reverse()
        .join("-");
    } else if (args.includes("/")) {
      isValidDate = args
        .split("/")
        .reverse()
        .join("/");
    }
    // eslint-disable-next-line no-restricted-globals
    if (isValidDate === undefined) {
      console.log("The date is not a valid date....");
      return args;
    }
    return isValidDate;
  }
}
module.exports = Utility;

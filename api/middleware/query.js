import User from "../models/user";

const modelObj = {
  User
};
export default class Query {
  static async saveData(modelName, data) {
    try {
      console.log("modelObj[modelName]", modelObj[modelName]);
      const Model = modelObj[modelName];
      console.log("Model", Model);
      console.log("data2", data);
      const instace = new Model(data);
      const res = instace.save();
      return Promise.resolve(res);
    } catch (e) {
      console.log("Error is =", e);
      return Promise.reject(e);
    }
  }

  static async editData(modelName, condition, data) {
    try {
      const model = modelObj[modelName];
      const res = await model.update(
        condition,
        { $set: data },
        { upsert: true }
      );
      return Promise.resolve(res);
    } catch (e) {
      console.log("Error is =", e);
      return Promise.reject(e);
    }
  }

  static async delete(modelName, condition) {
    try {
      const model = modelObj[modelName];
      const res = await model.deleteOne(condition);
      return Promise.resolve(res);
    } catch (e) {
      console.log("Error is =", e);
      return Promise.reject(e);
    }
  }

  static async deleteData(modelName, condition) {
    try {
      const model = modelObj[modelName];
      const res = await model.remove(condition);
      return Promise.resolve(res);
    } catch (e) {
      console.log("Error is =", e);
      return Promise.reject(e);
    }
  }

  static async find(modelName, searchQuery) {
    try {
      const model = modelObj[modelName];
      const result = await model.findOne(searchQuery);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async findById(modelName, id) {
    try {
      const model = modelObj[modelName];
      const result = await model.findById(id);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async findMany(modelName, searchQuery) {
    try {
      const model = modelObj[modelName];
      const result = await model.find(searchQuery);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async findAll(modelName) {
    try {
      const model = modelObj[modelName];
      const result = await model.find();
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getProjectedData(modelName, project, sort, limit) {
    try {
      const model = modelObj[modelName];
      const result = await model
        .find({}, project)
        .sort(sort)
        .limit(limit);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async conditionFindAll(modelName, condition) {
    try {
      const model = modelObj[modelName];
      const result = await model.find(condition);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async bulkUpdate(modelName, condition, updateData) {
    try {
      const model = modelObj[modelName];
      const result = await model.updateMany(condition, updateData);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async bulkInsert(modelName, updateData) {
    try {
      const model = modelObj[modelName];
      const result = await model.insertMany(updateData);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getDataWithSortLimit(modelName, cond, sort, limit) {
    try {
      const model = modelObj[modelName];
      const result = await model
        .find(cond)
        .sort(sort)
        .limit(limit);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async clearDatabase() {
    try {
      const collectionNames = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const property in dbNames) {
        // eslint-disable-next-line no-prototype-builtins
        if (dbNames.hasOwnProperty(property)) {
          collectionNames.push(dbNames[property]);
        }
      }
      for (let i = 0; i < collectionNames.length; i += 1) {
        const model = modelObj[collectionNames[i]];
        // eslint-disable-next-line no-await-in-loop
        await model.remove();
      }
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

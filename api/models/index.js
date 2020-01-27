import mongoose from "mongoose";
import User from "./user";
require("dotenv").config();
mongoose.set("useCreateIndex", true);
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
const models = { User };
export { connectDb };
export default models;

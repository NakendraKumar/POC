import express from "express";
import bodyParser from "body-parser";
import { connectDb } from "./models";
import routes from "./routes";

/**
 * Create Express server.
 */
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// our routes will be contained in routes/index.js
// var routes = require("./routes/index");

app.use("/", routes);

connectDb().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});

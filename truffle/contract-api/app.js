const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// morgan - for log
// compression - to send compressed response in production
// 
/**
 * Create Express server.
 */
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());

app.use(bodyParser.json());

// our routes will be contained in routes/index.js
var routes = require("./routes/index");
app.use("/", routes);

/**
 * Express configuration.
 */
app.set("host", "0.0.0.0");
app.set("port", 8080);

app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d", app.get("port"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;

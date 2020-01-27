var express = require("express");
var router = express.Router();

var tokenFunc = require("../helpers");

router.get("/buyerc20tokens", tokenFunc.buyerc20);

router.get("/transfererc20tokens", tokenFunc.transfererc20);

router.get("/createerc721token", tokenFunc.createerc721);

router.get("/transfererc721token", tokenFunc.transfererc721);

router.post("/createaccount", tokenFunc.createAccount);

router.get("/getaccount", tokenFunc.getAccount);

router.post("/createasset", tokenFunc.createAsset);

router.get("/getasset", tokenFunc.getAsset);

module.exports = router;

// var express = require("express");

import express from "express";
import User from "../controllers/userController";
let router = express.Router();

router.post("/signup", (req, res) => {
  User.RegisterUser(req, res);
});
export default router;
// module.exports = router;

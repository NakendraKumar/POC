const { buyerc20 } = require("./mintERC20");
const { transfererc20 } = require("./transferERC20");
const { createerc721 } = require("./mintERC721");
const { transfererc721 } = require("./transferERC721");
const { createAccount, getAccount } = require("./createAccount");
const { createAsset, getAsset } = require("./createAsset");
module.exports = {
  buyerc20,
  transfererc20,
  createerc721,
  transfererc721,
  createAccount,
  createAsset,
  getAsset,
  getAccount
};

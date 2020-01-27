"use strict";

const BasicERC20 = artifacts.require("BasicERC20.sol");
const MyERC721 = artifacts.require("MyERC721.sol");
const UserProfile = artifacts.require("USERS.sol");
const AssetInfo = artifacts.require("ASSETS.sol");
module.exports = function(deployer, network, accounts) {
  deployer.deploy(BasicERC20, 0);
  deployer.deploy(MyERC721, "ERC721", "ERC721");
  deployer.deploy(UserProfile);
  deployer.deploy(AssetInfo);
};

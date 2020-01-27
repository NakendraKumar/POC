const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

const ERC20Address = "0xaD3d290d69D39e4371e5A843e9c46b6827c33316";
const ERC721Address = "0x2C48732bA8BCc773312B3d6a295cB74551283a96";
const USERSAddress = "0x4112730E7A57E153DFCF7c9696D1f6E31ecFc258";
const ASSETSAddress = "0x5702fFcd24892e3f2E662839b258091A4fE7C22f";

module.exports = {
  ERC20Address,
  ERC721Address,
  USERSAddress,
  ASSETSAddress,
  web3
};

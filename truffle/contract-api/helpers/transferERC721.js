const config = require("../config");
const web3 = config.web3;
const ERC721ABI = require("../../build/contracts/MyERC721.json");
const ERC721Address = config.ERC721Address;

let adminAddress;
web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  adminAddress = accounts[0];
  user1 = accounts[1];
  user2 = accounts[2];
  user3 = accounts[3];
});

exports.transfererc721 = async (req, res) => {
  console.log(
    "--------------------------Inside Transfer ERC721----------------------------"
  );

  const fromAddress = req.query.fromAddress;
  const toAddress = req.query.toAddress;
  const tokenId = req.query.tokenId;
  // Get ERC20 Token contract instance
  let contract = new web3.eth.Contract(ERC721ABI.abi, ERC721Address);

  // console.log("contract.methods", contract.methods);

  const totalErc721Tokens = await contract.methods.totalSupply().call();

  console.log("totalErc721Tokens", totalErc721Tokens);

  await contract.methods
    .ownerOf(1)
    .call()
    .then(data => {
      console.log("Owner of Token Id 1 Before Transfer", data);
    });

  await contract.methods
    .transfer_From(fromAddress, toAddress, tokenId)
    .send({ from: fromAddress, gas: "1000000" })
    .then(data => {
      res.send("ERC721 transferred successfully");
    });

  await contract.methods
    .ownerOf(1)
    .call()
    .then(data => {
      console.log("Owner of Token Id 1 After Transfer", data);
    });
};

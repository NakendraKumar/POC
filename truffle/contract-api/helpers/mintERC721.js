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

exports.createerc721 = async (req, res) => {
  console.log(
    "--------------------------Inside ERC721----------------------------"
  );

  const toAddress = req.query.toAddress;
  console.log("toAddress", toAddress);
  // Get ERC20 Token contract instance
  let contract = new web3.eth.Contract(ERC721ABI.abi, ERC721Address);

  // console.log("contract.methods", contract.methods);

  const totalErc721Tokens = await contract.methods.totalSupply().call();

  console.log("totalErc721Tokens", totalErc721Tokens);

  await contract.methods
    .mint(toAddress, totalErc721Tokens + 1)
    .send({ from: adminAddress, gas: "1000000" })
    .then(data => {
      console.log("data", data);
      res.send({
        message: "ERC721 Minted Successfully",
        tokenId: totalErc721Tokens,
        ownerAddress: toAddress
      });
    })
    .catch(error => {
      console.log("Error inside methods", error);
    });

  await contract.methods
    .ownerOf(1)
    .call()
    .then(data => {
      console.log("Owner of Token Id 1", data);
    });
};

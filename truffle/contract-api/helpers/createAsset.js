const config = require("../config");
const web3 = config.web3;
const ipfs = require("../ipfs");
const ASSETSABI = require("../../build/contracts/ASSETS.json");
const ASSETSAddress = config.ASSETSAddress;

const accounts = web3.eth.getAccounts().then(data => {
  console.log(data);
});

exports.createAsset = async (req, res) => {
  let contract = new web3.eth.Contract(ASSETSABI.abi, ASSETSAddress);
  const accounts = await web3.eth.getAccounts().then(data => {
    return data;
  });
  const { tokenId, ownerAddress, price, name } = req.body.data;
  await contract.methods.createAsset(tokenId, ownerAddress, price, name).send(
    {
      from: accounts[0]
    },
    async (error, data) => {
      res.send({
        message: "Asset Created successfully",
        ownerAddress: ownerAddress,
        assetData: { tokenId, ownerAddress, price, name },
        transactionHash: data
      });
    }
  ); //storehash
};

exports.getAsset = async (req, res) => {
  console.log("12");
  let contract = new web3.eth.Contract(ASSETSABI.abi, ASSETSAddress);
  console.log("22");
  const { tokenId } = req.query;
  console.log("23");
  const response = await contract.methods.getAsset(tokenId).call();
  console.log("24");
  res.send({
    message: "Asset Retrieved successfully",
    Data: response
  });
};

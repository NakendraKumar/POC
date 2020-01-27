const config = require("../config");
const web3 = config.web3;
const ERC20ABI = require("../../build/contracts/BasicERC20.json");
const ERC20Address = config.ERC20Address;
let adminAddress;
web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  adminAddress = accounts[0];
});

exports.buyerc20 = async (req, res) => {
  console.log(
    "--------------------------Inside ERC20----------------------------"
  );
  const toAddress = req.query.toAddress;
  const requestedTokens = parseInt(req.query.amount);
  let balance;

  await web3.eth.getBalance(toAddress, (err, wei) => {
    balance = web3.utils.fromWei(wei, "ether");
    console.log("Ether balance of Account Before Mint = ", balance);
  });
  if (requestedTokens > parseInt(balance)) {
    res.send("No Sufficient Ether");
  } else {
    // Get ERC20 Token contract instance
    let contract = new web3.eth.Contract(ERC20ABI.abi, ERC20Address);
    await contract.methods
      .balanceOf(toAddress)
      .call()
      .then(data => {
        console.log("Tokens available in account Before Mint", data);
      });
    await contract.methods
      ._mint(toAddress, requestedTokens)
      .send({ from: adminAddress })
      .then(async data => {
        await web3.eth.personal
          .unlockAccount(toAddress, req.query.username, 600)
          .then(console.log("Account unlocked!"));
        await web3.eth.sendTransaction({
          from: toAddress,
          to: adminAddress,
          value: web3.utils.toWei(requestedTokens.toString(), "ether"),
          gasLimit: 21000,
          gasPrice: 20000000000
        });
        return res.send("Tokens Minted Successfully");
      });

    await web3.eth.getBalance(toAddress, (err, wei) => {
      balance = web3.utils.fromWei(wei, "ether");
      console.log("Ether balance of Account After Mint = ", balance);
    });

    await contract.methods
      .balanceOf(toAddress)
      .call()
      .then(data => {
        console.log("Tokens available in account After Mint", data);
      });
  }
};

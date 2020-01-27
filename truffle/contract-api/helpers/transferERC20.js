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
  user1 = accounts[1];
  user2 = accounts[2];
  user3 = accounts[3];
});

exports.transfererc20 = async (req, res) => {
  console.log(
    "--------------------------Transfer Inside ERC20----------------------------"
  );

  // Get ERC20 Token contract instance
  let contract = new web3.eth.Contract(ERC20ABI.abi, ERC20Address);
  const toAddress = req.query.toAddress;
  const fromAddress = req.query.fromAddress;
  const tokensToTransfer = parseInt(req.query.amount);
  const availableBalance = await contract.methods.balanceOf(fromAddress).call();
  const user2Balance = await contract.methods.balanceOf(toAddress).call();
  // console.log("availableBalance", availableBalance);
  //   console.log("adminBalance", adminBalance);
  // console.log("user2 balance", user2Balance);
  if (availableBalance < tokensToTransfer) {
    res.send("No Sufficient Tokens");
  } else {
    // console.log("fromAddress", fromAddress);
    // console.log("toAddress", toAddress);
    // console.log("tokensToTransfer", tokensToTransfer);

    await contract.methods
      .approve(adminAddress, tokensToTransfer)
      .send({ from: fromAddress })
      .then(data => {
        console.log("Account approved successfully");
      });

    // await contract.methods
    //   .allowance(fromAddress, adminAddress)
    //   .call()
    //   .then(data => {
    //     // console.log("data2", data);
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });

    await contract.methods
      .balanceOf(fromAddress)
      .call()
      .then(data => {
        console.log("Tokens available in Before account After Mint", data);
      });
    await contract.methods
      .balanceOf(toAddress)
      .call()
      .then(data => {
        console.log("Tokens available in TO account Before Mint", data);
      });

    await contract.methods
      .transferFrom(fromAddress, toAddress, tokensToTransfer)
      .send({ from: adminAddress })
      .then(data => {
        return res.send("Transferred Successfully");
      })
      .catch(error => {
        console.log("error", error);
      });
    // await contract.methods
    //   .totalSupply()
    //   .call()
    //   .then(console.log);
    await contract.methods
      .balanceOf(fromAddress)
      .call()
      .then(data => {
        console.log("Tokens available in FROM account After Mint", data);
      });
    await contract.methods
      .balanceOf(toAddress)
      .call()
      .then(data => {
        console.log("Tokens available in TO account After Mint", data);
      });
  }
};

const config = require("../config");
const web3 = config.web3;
const ipfs = require("../ipfs");
const USERSABI = require("../../build/contracts/USERS.json");
const USERSAddress = config.USERSAddress;

exports.createAccount = async (req, res) => {
  let contract = new web3.eth.Contract(USERSABI.abi, USERSAddress);
  console.log("req", req.body);
  const accounts = await web3.eth.getAccounts().then(data => {
    return data;
  });
  console.log("accounts", accounts);

  // await web3.eth.personal
  //   .unlockAccount(accountAddress, req.body.data.username, 600)
  //   .then(console.log("Account unlocked!"));

  // console.log("accountAddress", accountAddress);
  const buffer = Buffer.from(JSON.stringify(req.body.data));
  var temp = JSON.parse(buffer.toString());
  await ipfs
    .add(buffer)
    .then(async ipfsHash => {
      console.log("ipfsHash", ipfsHash[0].hash);

      const accountAddress = await web3.eth.personal.newAccount(
        req.body.data.username
      );
      await loadAccountWithEther(accountAddress);
      await contract.methods.saveData(accountAddress, ipfsHash[0].hash).send(
        {
          from: accounts[0]
        },
        async (error, transactionHash) => {
          res.send({
            message: "Hash Saved successfully",
            transactionHash: transactionHash,
            accountAddress: accountAddress
          });
        }
      ); //storehash
    })
    .catch(err => {
      console.log("err", err);
    }); //await ipfs.add

  // console.log("0");
  // await contract.methods
  //   .getData(accounts[12])
  //   .call(async (error, transactionHash) => {
  //     console.log("accounts[12", accounts[12]);
  //     console.log("transactionHash222", transactionHash);
  //     console.log("zzzz", JSON.parse(await ipfs.cat(transactionHash)));
  //   });
  // console.log("1");
  // await contract.methods
  //   .getData(accounts[13])
  //   .call(async (error, transactionHash) => {
  //     console.log("accounts[13]", accounts[13]);
  //     console.log("transactionHash111", transactionHash);
  //     console.log("zzzz", JSON.parse(await ipfs.cat(transactionHash)));
  //   });

  // console.log("2");
  // await contract.methods
  //   .getData(accounts[14])
  //   .call(async (error, transactionHash) => {
  //     console.log("accounts[14]", accounts[14]);
  //     console.log("transactionHash222", transactionHash);
  //     console.log("zzzz", JSON.parse(await ipfs.cat(transactionHash)));
  //   });
};

loadAccountWithEther = async accountAddress => {
  let balance, accountsList;
  await web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    accountsList = accounts;
  });
  let acc = 0;
  while (acc < accountsList.length) {
    await web3.eth.getBalance(accountsList[acc], (err, wei) => {
      balance = web3.utils.fromWei(wei, "ether");
      console.log("Ether balance of Account 111 = ", balance);
    });

    if (parseInt(balance) < 1000) {
      acc++;
    } else {
      await web3.eth.sendTransaction({
        from: accountsList[acc],
        to: accountAddress,
        value: web3.utils.toWei("10", "ether"),
        gasLimit: 21000,
        gasPrice: 20000000000
      });
      await web3.eth.getBalance(accountAddress, (err, wei) => {
        balance = web3.utils.fromWei(wei, "ether");
        console.log("Ether balance of Account 222 = ", balance);
      });
      break;
    }
  }
};
exports.getAccount = async (req, res) => {
  let contract = new web3.eth.Contract(USERSABI.abi, USERSAddress);
  const { accountAddress } = req.query;
  let response = {};
  console.log("accountAddress", accountAddress);
  await contract.methods
    .getData(accountAddress)
    .call()
    .then(async hash => {
      console.log("hash", hash);
      await ipfs
        .cat(hash)
        .then(data => {
          response = JSON.parse(data.toString());
        })
        .catch(error => {
          console.log("error", error);
        });
    })
    .catch(error => {
      res.send({
        message: "Error",
        Data: error
      });
    });
  res.send({
    message: "Account Retrieved successfully",
    Data: response
  });
};

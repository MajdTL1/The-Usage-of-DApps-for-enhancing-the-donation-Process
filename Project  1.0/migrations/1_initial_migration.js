var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};


/* 
  web3.eth.getBlock(web3.eth.blockNumber).timestamp
  web3.currentProvider.send({jsonrpc: "2.0", method: "evm_increaseTime", params: [12345], id: 0})
  web3.currentProvider.send({jsonrpc: "2.0", method: "evm_mine", params: [], id: 0})
  web3.eth.getBlock(web3.eth.blockNumber).timestamp 
*/
 
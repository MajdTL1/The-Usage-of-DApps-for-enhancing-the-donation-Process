var TransparentCivilSociety = artifacts.require("./contracts/UseCase/TransparentCivilSociety.sol");
var AddressBook = artifacts.require("./contracts/UseCase/AddressBook.sol");

module.exports = function(deployer) {
  deployer.deploy(AddressBook);
  deployer.deploy(TransparentCivilSociety);
 // deployer.deploy(TCSVotingSystem);

};

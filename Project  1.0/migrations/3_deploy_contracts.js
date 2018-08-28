var DonationTokenOrg = artifacts.require("./Approach/DonationTokenOrg.sol");
var FaiToken = artifacts.require("./Approach/FaiToken.sol");
var ProjectOrg = artifacts.require("./Approach/ProjectOrg.sol");
var MainOrg = artifacts.require("./Apporach/MainOrg.sol");
var VaultOrg = artifacts.require("./Approach/VaultOrg.sol");
var ManagementOrg = artifacts.require("./Approach/ManagementOrg.sol");

module.exports = (deployer) => {
  deployer.deploy(DonationTokenOrg);
  deployer.deploy(FaiToken);
  deployer.deploy(MainOrg);
  deployer.deploy(ManagementOrg);
  deployer.deploy(VaultOrg);
  deployer.deploy(ProjectOrg, 'FirstProject', 'first.com', 'Africa');
  //deployer.deploy(ProjectOrg, 'SecPorject', 'second.com', 'Asia');
  //deployer.deploy(ProjectOrg, 'ThirdProject', 'third.com', 'space');
};
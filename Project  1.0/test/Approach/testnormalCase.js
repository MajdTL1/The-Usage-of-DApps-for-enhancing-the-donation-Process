var DonationTokenOrg = artifacts.require("./contracts/Approach/DonationTokenOrg.sol");
var FaiToken = artifacts.require("./contracts/Approach/FaiToken.sol");
var ProjectOrg = artifacts.require("./contracts/Approach/ProjectOrg.sol");
var AddressBook = artifacts.require("./contracts/UseCase/AddressBook.sol");
var VaultOrg = artifacts.require("./contracts/Approach/VaultOrg.sol");
var ManagementOrg = artifacts.require("./contracts/Approach/ManagementOrg.sol");
var MainOrg = artifacts.require("./contracts/Approach/MainOrg");

contract("Vault Contract", function(accounts) {
  var vaultInstance;
  var mainOrgInstance;
  var managementInstance;
  var projectInstance;
  var tokenInstance;
  var faiInstance;
  var aBinstance;

  var OrgOwner = accounts[0];  
 
  it('deploy Vault', function() {
    return VaultOrg.deployed().then(function(instance) {
        vaultInstance = instance;
      return vaultInstance.owner();
    }).then(function(addr) {
      assert.equal(addr, OrgOwner, 'has the correct owner');
    });
  });

  it('deploy DonationToken', function() {
    return DonationTokenOrg.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, "Donate Token", 'has the correct name');
      return tokenInstance.setVaultContract(vaultInstance.address, {from:OrgOwner});
    });
  });

  it('deploy FaiToken', function() {
    return FaiToken.deployed().then(function(instance) {
      faiInstance = instance;
      return faiInstance.name();
    }).then(function(name) {
      assert.equal(name, "Fake DAI Token", 'has the correct name');
    });
  });

  it('deploy ProjectOrg', function() {
    return ProjectOrg.deployed().then(function(instance) {
        projectInstance = instance;
      return projectInstance.name();
    }).then(function(name) {
      assert.equal(name, "FirstProject", 'has the correct name');
      return projectInstance.setDTContract(tokenInstance.address, {from:accounts[3]});
    }).then(function(c){
        return projectInstance.setVaultContract(vaultInstance.address, {from:accounts[3]});
    });
  });

  it("deploy MainOrg", function() {
    return MainOrg.deployed().then(function(instance) {
        mainOrgInstance = instance;
    });
  });

  it("deploy Address Book", function() {
    return AddressBook.deployed().then(function(instance) {
        aBinstance = instance;
      return aBinstance.getcategoryIndex(1);
    }).then(function(categoryOf) {
      assert.equal(categoryOf, 'Token Contracts', "correct category");
    });
  });
  
  it("deploy Management Contract", function() {
    return ManagementOrg.deployed().then(function(instance) {
        managementInstance = instance;
      return managementInstance.setmainOrgContract(mainOrgInstance.address);
    });
  });

  it("set address", function(){
      return vaultInstance.setFaiContract(faiInstance.address).then(function(e){
          return vaultInstance.setaddrBookContract(aBinstance.address)
      }).then(function(e2){
          return vaultInstance.setDTContract(tokenInstance.address);
      }).then(function(e3){
          return tokenInstance.setmanagementContract(managementInstance.address);
      }).then(function(e4){
        return tokenInstance.setmainOrgContract(mainOrgInstance.address);
      }).then(function(e5){
        return projectInstance.setDTContract(tokenInstance.address,{from:accounts[3]});
      }).then(function(e6){
      return projectInstance.setFaiContract(faiInstance.address, {from:accounts[3]});
      }).then(function(e7){
      return projectInstance.setVaultContract(vaultInstance.address, {from:accounts[3]});
      }).then(function(e8){
      return managementInstance.setDTContract(tokenInstance.address);
      }).then(function(e9){
      return managementInstance.setmainOrgContract(mainOrgInstance.address);
      }).then(function(e6){
        return mainOrgInstance.setFaiContract(faiInstance.address);
        }).then(function(e7){
        return mainOrgInstance.setVaultContract(vaultInstance.address);
        }).then(function(e8){
        return mainOrgInstance.setDTContract(tokenInstance.address);
        }).then(function(e9){
        return mainOrgInstance.setManagementContract(managementInstance.address);
        });
  });

  it("place account 10 in org ",function(){
    aBinstance.regOrg("timeOrg", OrgOwner, {from:OrgOwner})
    .then(function(reg){
      return aBinstance.addAddressToBook(OrgOwner, 4, accounts[10], "manage the Fai", {from:OrgOwner});
    }).then(function(e){
      return aBinstance.getInfoOf(OrgOwner, 4, accounts[10] );
    }).then(function(infos){
      assert.equal(infos, "manage the Fai", "the info is correct");
      return aBinstance.checkEofAddress(accounts[0], accounts[10], 4, 1);
    }).then(function(boolV){
      assert.equal(boolV, true, "address is registerd")
    })
  });
 
  it("normal usecase", function(){
    faiInstance.transfer(mainOrgInstance.address, 6000, {from:accounts[0]})       //1. transfer Fai-Tokens to the main Contract
    .then(function(t){
      assert.equal(t.logs.length, 1, "an event was triggered");
      assert.equal(t.logs[0].event, "Transfer", "the event type is correct");
      assert.equal(t.logs[0].args._value, 6000, "the value  is correct");
    }).then(function(t2){
      return mainOrgInstance.setcurrentCost(1000, {from:OrgOwner});       //2. set the cost of Ether at that moment
    }).then(function(e){
      //console.log(e);
      assert.equal(e.logs.length, 1, "an event was triggered");
      assert.equal(e.logs[0].event, "ChangedCost", "the event type is correct");
      assert.equal(e.logs[0].args._newCost, 1000, "the cost  is correct");
      return mainOrgInstance.faiBalance();                                        
    }).then(function(b){
      //console.log(b)
      assert.equal(b, 6000, "correct Fai balance")
      return faiInstance.balanceOf(mainOrgInstance.address);
    }).then(function(b2){
      //console.log(b2)
      assert.equal(b2, 6000, "correct balance!");
      return web3.eth.getBlock(web3.eth.blockNumber).timestamp
    }).then( function (t){
      return web3.currentProvider.send({jsonrpc: "2.0", method: "evm_increaseTime", params: [12348], id: 0})
    }).then( function (t){
      return web3.currentProvider.send({jsonrpc: "2.0", method: "evm_mine", params: [], id: 0}) 
    }).then(function(e){
      return mainOrgInstance.donateEther({from:accounts[7], value: web3.toWei(1, 'ether')});        //3. a user donate 1 Ether
    }).then(function(cToken){
      return faiInstance.balanceOf(vaultInstance.address);
    }).then(function(newB){
      assert.equal(newB, 1000, "correct balance in a7");
      return faiInstance.balanceOf(mainOrgInstance.address);
    }).then(function(newB2){
      assert.equal(newB2, 5000, "correct balance of mainOrg");
      return tokenInstance.getOwner(1);
    }).then(function(own1){
      assert.equal(own1, accounts[7]);
      return tokenInstance.getValue(1);
    }).then(function(value){
      assert.equal(value, 1000, "correct value of tokenId 1 ,1000 ")
      return mainOrgInstance.addProjectinNeed(projectInstance.address, 1400);       //4. the mainOrg add a project (which is already reg in addressBook) to the management contract
    }).then(function(e){
      return managementInstance.getNeedof(projectInstance.address);
    }).then(function(need){
      assert.equal(need, 1400, "correct need of porject 1400");
      return tokenInstance.transfer(accounts[8], 1, {from:accounts[7]});        //FAIL: The donater try to send his Token to another user or contract
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, "first transfer error");
      return tokenInstance.getOwner(1);
    }).then(function(own){
      assert.equal(own, accounts[7], "still the correct owner");
      return managementInstance.donateToProject(projectInstance.address, 1, {from:accounts[7]});        //5. the donater send his Token to the Project
    }).then(function(t2){
      return tokenInstance.getOwner(1);
    }).then(function(own3){
      assert.equal(own3, projectInstance.address, "project own the tokenId 1");
      return managementInstance.getNeedof(projectInstance.address);
    }).then(function(need2){
      assert.equal(need2, 400, "400 left in need");
      return managementInstance.removeProject(projectInstance.address);       //FAIL: trying to remove the Project, which still need money
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, "cannot remove project with need != 0");
      return managementInstance.getidxOfProject(projectInstance.address);
    }).then(function(indexOfP){
      assert.equal(indexOfP, 1, "the project still at idx 1 in array");
      return mainOrgInstance.donateEther({from:accounts[9], value: web3.toWei(0.4, 'ether')});        //another user donate 0.4  Ether to the main contract
    }).then(function(newD){
      return faiInstance.balanceOf(vaultInstance.address);
    }).then(function(newBalance){
      assert.equal(newBalance, 1400, "correct balance after second donate");
      return managementInstance.donateToProject(projectInstance.address, 2, {from:accounts[9]});    // donated tokenId 2 to the project
    }).then(function(e){
      return tokenInstance.getOwner(2); 
    }).then(function(newOwn3){
      assert.equal(newOwn3, projectInstance.address, "correct Owner of tokenId 2 after donate it");
      return managementInstance.getNeedof(projectInstance.address);
    }).then(function(newNeed){
      assert.equal(newNeed, 0, "correct need = 0 after 2 donations");
      return projectInstance.transferTokens(accounts[10], 2, {from:accounts[3]});       //6. the project Owner move the Token 2 from the project address to a related address
    }).then(function(t){
      return tokenInstance.getOwner(2);
    }).then(function(newOwner2){
      assert.equal(newOwner2, accounts[10], "correct owner of todkenId2 after trasnfer from project");
      return vaultInstance.unlockFai(2, OrgOwner, 4, 1, {from:accounts[10]});       //7. the nwe Owner of Token 1 send it to the vaultContract and get Fai for it
    }).then(function(u){
      return tokenInstance.getOwner(2);
    }).then(function(owner2new){
      assert.equal(owner2new, vaultInstance.address, "token 2 in vault")
      return tokenInstance.getValue(2);
    }).then(function(v2){
      assert.equal(v2, 0, "correct burned tokenid2");
      return faiInstance.balanceOf(accounts[10]);
    }).then(function(faiBalance10){
      assert.equal(faiBalance10, 400, "correct balance by unlocker");
      return faiInstance.balanceOf(vaultInstance.address);
    }).then(function(faiBVault){      
      assert.equal(faiBVault, 1000, "correct rest balance in vault");
    });
  });
  
}); 

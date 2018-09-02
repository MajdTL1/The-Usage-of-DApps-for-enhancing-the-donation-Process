// not up to date
var DonationTokenOrg = artifacts.require("./contracts/Approach/DonationTokenOrg.sol");
var FaiToken = artifacts.require("./contracts/Approach/FaiToken.sol");
var ProjectOrg = artifacts.require("./contracts/Approach/ProjectOrg.sol");
var MainOrg = artifacts.require("./contracts/Approach/MainOrg.sol");

contract("ProjectOrg Contract", function(accounts) {
  var tokenInstance;
  var projectInstance;
  var faiInstance;
  var mainInstance;

  var mainOrgContract = accounts[0];
  var managementContract = accounts[1];
  var vaultContract = accounts[2];
  var projectOwner = accounts[3];

   it('deploy DonationToken', function() {
    return DonationTokenOrg.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, "Donate Token", 'has the correct name');
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
    });
  });

  it('depoly MainOrg', function(){
    return MainOrg.deployed().then(function(instance){
      mainInstance = instance;     
    }).then(function(c){
      return tokenInstance.setmainOrgContract(mainOrgContract, {from:accounts[0]});
    });
  });

  it("mint", function(){  
   console.log("mint")
    return tokenInstance._mint(projectInstance.address, 12, {from:mainOrgContract}).then(function(cToken){
       assert.equal(cToken.logs.length, 1, "an event was triggered");
       assert.equal(cToken.logs[0].event, "Transfer", "the event type is correct");
       assert.equal(cToken.logs[0].args._from, "0x0000000000000000000000000000000000000000", "the _from add  is correct");
       assert.equal(cToken.logs[0].args._to, projectInstance.address, "the _to  add  is correct");
       assert.equal(cToken.logs[0].args._tokenId, "1", "the Token ID  is correct");       
   });
  });

  it('set doanted to true', function(){
    return tokenInstance.setdonated(1, {from:mainOrgContract}).then(function(c){
  
    });
  });

  it('transfer DToken using ProjectOrg', function(){  
     return projectInstance.transferTokens(accounts[5], 1, {from:projectOwner}).then(function(cToken) {
        return tokenInstance.getOwner(1);      
    }).then(function(own){
        assert.equal(own, accounts[5], "correct owner");
    });
   });

   it('transfer Fai to ProjectOrg', function(){
       return faiInstance.transfer(projectInstance.address, 30, {from:accounts[0]}).then(function(fTokens){
           return faiInstance.balanceOf(projectInstance.address);
       }).then(function(balance){
           assert.equal(balance, 30, "correct balance!");
           return projectInstance.setFaiContract(faiInstance.address, {from:projectOwner});
       }).then(function(c){

       });
   });

   it('transfer Fai from ProjectOrg', function(){
       return projectInstance.transferFaiTo(accounts[5], 20, {from:projectOwner}).then(function(sToken){
            return faiInstance.balanceOf(accounts[5]);
       }).then(function(b1){
           assert.equal(b1, 20, "correct Balance!");
           return faiInstance.balanceOf(projectInstance.address);
       }).then(function(b2){
           assert.equal(b2, 10, "correct Balance of Contract!")
       });
   });


 
 
});

//.then(assert.fail).catch(function(error){
 //   assert(error.message.indexOf('revert') >= 0, "no category at this index");
//})

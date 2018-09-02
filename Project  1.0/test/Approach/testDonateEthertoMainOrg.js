// not up to date
var DonationTokenOrg = artifacts.require("./contracts/Approach/DonationTokenOrg.sol");
var MainOrg = artifacts.require("./contracts/Approach/MainOrg.sol");
var FaiToken = artifacts.require("./contracts/Approach/FaiToken.sol");

contract("MainOrg Contract", function(accounts) {
  var tokenInstance;
  var mainOrgInstance;
  var faiInstance;
  var managementContract = accounts[1];
  var vaultContract = accounts[2];
  var projectOwner = accounts[3];

  it('deploy MainOrg', function() {
    return MainOrg.deployed().then(function(instance) {
        mainOrgInstance = instance;
      return mainOrgInstance.owner();
    }).then(function(name) {
      assert.equal(name, 0xf62fef864D88e3d70F22468EEe3B412b67114946, 'has the correct owner');
    });
  });

  it('deploy DonationToken', function() {
    return DonationTokenOrg.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, "Donate Token", 'has the correct name');
      return tokenInstance.setmainOrgContract(mainOrgInstance.address,{from:accounts[0]});
    }).then(function(c){
      return mainOrgInstance.setDTContract(tokenInstance.address, {from:accounts[0]})
    }).then(function(c2){
      return mainOrgInstance.setVaultContract(vaultContract, {from:accounts[0]});
    });
  });
 
  it('deploy FaiToken', function() {
    return FaiToken.deployed().then(function(instance) {
        faiInstance = instance;
      return faiInstance.name();
    }).then(function(name) {
      assert.equal(name, "Fake DAI Token", 'has the correct name');
      return faiInstance.transfer(mainOrgInstance.address, 5000, {from:accounts[0]});
    }).then(function(c) {
      return faiInstance.balanceOf(mainOrgInstance.address);
    }).then(function(b) {
      assert.equal(b, 5000, "correct balance of Fai");
      return mainOrgInstance.setFaiContract(faiInstance.address, {from:accounts[0]});
    });
  });
 
  it("donate Ether", function(){  
    console.log("donate 2 ether")
     return mainOrgInstance.donateEther.call({from:accounts[7], value: web3.toWei(2, "ether")}).then(function(cToken) {
        assert.equal(cToken, 1, "correct Id!");
        return mainOrgInstance.donateEther({from:accounts[7], value: web3.toWei(2, "ether")})
      }).then(function(cToken2){
    });
   });
 
   it('check balance of donater', function(){  
      return tokenInstance.getOwner(1).then(function(own) {
         assert.equal(own, accounts[7], "correct owner");  
         return tokenInstance.getValue(1); 
      }).then(function(v) {
         assert.equal(v, 2000, "correct value!")
     });
    });
 
    it("donate Ether", function(){  
     console.log("donate 0.1 ether")
      return mainOrgInstance.donateEther.call({from:accounts[8], value: web3.toWei(0.1, "ether")}).then(function(cToken) {
         assert.equal(cToken, 2, "correct Id!");
         return mainOrgInstance.donateEther({from:accounts[8], value: web3.toWei(0.1, "ether")})
      }).then(function(cToken2){
     });
    });
  
    it('check balance of donater and vault', function(){  
       return tokenInstance.getOwner(2).then(function(own) {
          assert.equal(own, accounts[8], "correct owner");  
          return tokenInstance.getValue(2); 
        }).then(function(v){
          assert.equal(v, 100, "correct value!");
          return faiInstance.balanceOf.call(vaultContract);
        }).then(function(b){
        assert.equal(b, 2100, "correct balance of Fai in vault")
        return faiInstance.balanceOf.call(mainOrgInstance.address);
        }).then(function(b2){
        assert.equal(b2, 2900, "correct balance of Fai in MainOrg contract")
      });
     });

     it('check change Cost', function(){
       return mainOrgInstance.setcurrentCost(800, {from:accounts[0]}).then(function(newCostE){
        assert.equal(newCostE.logs.length, 1, "an event was triggered");
        assert.equal(newCostE.logs[0].event, "ChangedCost", "the event type is correct");
        assert.equal(newCostE.logs[0].args._newCost, 800, "newCost is correct");  
       });
     });

     it("donate Ether", function(){  
      console.log("donate 1 ether")
       return mainOrgInstance.donateEther.call({from:accounts[8], value: web3.toWei(1, "ether")}).then(function(cToken) {
          assert.equal(cToken, 3, "correct Id!");
          return mainOrgInstance.donateEther({from:accounts[8], value: web3.toWei(1, "ether")})
        }).then(function(cToken2){
      });
     });
   
     it('check balance of donater', function(){  
        return tokenInstance.getOwner(3).then(function(own) {
           assert.equal(own, accounts[8], "correct owner");  
           return tokenInstance.getValue(3); 
        }).then(function(v){
           assert.equal(v, 800, "correct value!")
       });
      });
  
    it("donate Ether", function(){           
      console.log("donate 0.5 ether")          
      return mainOrgInstance.donateEther.call({from:accounts[9], value: web3.toWei(0.5, "ether")}).then(function(cToken) {             
        assert.equal(cToken, 4, "correct Id!");              
        return mainOrgInstance.donateEther({from:accounts[9], value: web3.toWei(0.5, "ether")})           
      }).then(function(cToken2){         
      });        
    });
     
    it('check balance of donater', function(){  
      return tokenInstance.getOwner(4).then(function(own) {                  
        assert.equal(own, accounts[9], "correct owner");                    
        return tokenInstance.getValue(4);                 
      }).then(function(v){               
        assert.equal(v, 400, "correct value!");            
      });         
    });

});

/** 
web3.personal.unlockAccount(web3.personal.listAccounts[1], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[2], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[3], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[4], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[5], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[6], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[7], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[8], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[9], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[10], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[11], "1" , 999999);
web3.personal.unlockAccount(web3.personal.listAccounts[12], "1" , 999999);
*/

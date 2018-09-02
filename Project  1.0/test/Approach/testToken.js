// not up to date
var DonationTokenOrg = artifacts.require("./DonationTokenOrg.sol");

contract("DonationTokenOrg Contract", function(accounts) {
  var tokenInstance;

  var mainOrgContract = accounts[0];
  var managementContract = accounts[1];
  var vaultContract = accounts[2];

   it('initializes the contract with the correct config values', function() {
    return DonationTokenOrg.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, "Donate Token", 'has the correct name');
      return tokenInstance.symbol()
    }).then(function(symbol) {
      assert.equal(symbol, "DT", 'has the correct symbol');
      return tokenInstance.decimals();
    }).then(function(decimals) {
      assert.equal(decimals, 0, 'has the correct number of decimals');
    });
  });

  it("change management ,main,vaultContracts", function(){
    return tokenInstance.setmanagementContract(managementContract, {from:accounts[0]}).then(function(c){
      return tokenInstance.setmainOrgContract(mainOrgContract, {from:accounts[0]});
    }).then(function(c2){
      return tokenInstance.setVaultContract(vaultContract, {from:accounts[0]});
    });
  });

  it("mint", function(){  
   console.log("mint")
    return tokenInstance._mint(accounts[4], 12, {from:mainOrgContract}).then(function(cToken) {
       //console.log(cToken);
       assert.equal(cToken.logs.length, 1, "an event was triggered");
       assert.equal(cToken.logs[0].event, "Transfer", "the event type is correct");
       assert.equal(cToken.logs[0].args._from, "0x0000000000000000000000000000000000000000", "the _from add  is correct");
       assert.equal(cToken.logs[0].args._to, accounts[4], "the _to  add  is correct");
       assert.equal(cToken.logs[0].args._tokenId, "1", "the Token ID  is correct");      
    });
  });

  it('set doanted to true', function(){
    return tokenInstance.setdonated(1, {from:accounts[1]}).then(function(c){
    })
  })

  it('transfers token ownership', function() {
      return tokenInstance.transfer(accounts[5], 1, {from:accounts[4]})
      .then(function(receipt) {
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', ' Transfer  event');
      assert.equal(receipt.logs[0].args._from, accounts[4], 'the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, accounts[5], 'the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._tokenId, 1, 'the Id of the Token');
    });
  });

  it('split token ', function() {
    return tokenInstance._split(1, 2, 10, {from:accounts[5]})
    .then(function(receipt) {
    assert.equal(receipt.logs.length, 1, 'triggers one event');
    assert.equal(receipt.logs[0].event, 'Split', 'Split event');
    assert.equal(receipt.logs[0].args._orginialToken, 1, 'the Id of the original Token');
    assert.equal(receipt.logs[0].args._splitedToken, 2, 'the new Id of the new tokens');
    assert.equal(receipt.logs[0].args._owner, accounts[5], 'the owner of the tokens');
  });
  });

  it('check value 1 ', function() {
    return tokenInstance.getValue(1)
    .then(function(receipt) {
      assert.equal(receipt , 2, 'correct value');
    return tokenInstance.getOwner(1)  
    }).then(function(receipt){
      assert.equal(receipt, accounts[5], "correct Owner")
    });
  });
 
  it('check value 2', function() {
    return tokenInstance.getValue(2)
    .then(function(receipt) {
      assert.equal(receipt , 10, 'correct value');
    return tokenInstance.getOwner(2)  
    }).then(function(receipt){
      assert.equal(receipt, accounts[5], "correct Owner")
    });
  });

  it('mint a 3 token', function(){  
    console.log("mint")
     return tokenInstance._mint(accounts[4], 121, {from:mainOrgContract}).then(function(cToken) {
        //console.log(cToken);
        assert.equal(cToken.logs.length, 1, "an event was triggered");
        assert.equal(cToken.logs[0].event, "Transfer", "the event type is correct");
        assert.equal(cToken.logs[0].args._from, "0x0000000000000000000000000000000000000000", "the _from add  is correct");
        assert.equal(cToken.logs[0].args._to, accounts[4], "the _to  add  is correct");
        assert.equal(cToken.logs[0].args._tokenId, "3", "the Token Id is correct");
        return web3.eth.getBlock(web3.eth.blockNumber).timestamp
        }).then( function (t){
        return web3.currentProvider.send({jsonrpc: "2.0", method: "evm_increaseTime", params: [123488], id: 0})
        }).then( function (t){
        return web3.currentProvider.send({jsonrpc: "2.0", method: "evm_mine", params: [], id: 0})      
    });
   });
 

   it('set doanted to true', function(){
    return tokenInstance.setdonated(3, {from:accounts[1]}).then(function(c){
      
    });
  });

   it('transfers token ownership thorgh managmenet contracts', function() {
    return tokenInstance.transfer(accounts[7], 3, {from:managementContract})
    .then(function(receipt) {
    assert.equal(receipt.logs.length, 1, 'triggers one event');
    assert.equal(receipt.logs[0].event, 'Transfer', ' Transfer  event');
    assert.equal(receipt.logs[0].args._from, accounts[4], 'the account the tokens are transferred from');
    assert.equal(receipt.logs[0].args._to, accounts[7], 'the account the tokens are transferred to');
    assert.equal(receipt.logs[0].args._tokenId, 3, 'the Id of the Token');
    
    });
  }); 

  it('burn token', function() {
    return tokenInstance._burn(1, accounts[5], {from:vaultContract})
    .then(function(receipt) {
    assert.equal(receipt.logs.length, 1, 'triggers one event');
    assert.equal(receipt.logs[0].event, 'Transfer', ' Transfer  event');
    assert.equal(receipt.logs[0].args._from, accounts[5], 'the account the tokens are transferred from');
    assert.equal(receipt.logs[0].args._to, "0x0000000000000000000000000000000000000000", 'the account the tokens are transferred to');
    assert.equal(receipt.logs[0].args._tokenId, 1, 'the Id of the Token');
    return tokenInstance.getValue(1);
    }).then(function(val){
      assert.equal(val, 0, 'null Token')
    })
  }); 

  it("mint 2", function(){  
    console.log("mint")
     return tokenInstance._mint(accounts[8], 20, {from:mainOrgContract}).then(function(cToken) {
        //console.log(cToken);
        assert.equal(cToken.logs.length, 1, "an event was triggered");
        assert.equal(cToken.logs[0].event, "Transfer", "the event type is correct");
        assert.equal(cToken.logs[0].args._from, "0x0000000000000000000000000000000000000000", "the _from add  is correct");
        assert.equal(cToken.logs[0].args._to, accounts[8], "the _to  add  is correct");
        assert.equal(cToken.logs[0].args._tokenId, "4", "the Token ID  is correct");      
     });
   });
 
   it('transfers token ownership without setting donated to true', function() {
       return tokenInstance.transfer(accounts[9], 4, {from:accounts[8]})
       .then(assert.fail).catch(function(error){
           assert(error.message.indexOf('revert') >= 0, "first transfer error");
     });
   });

   
   it('transfers token ownership without setting donated to true', function() {
    return tokenInstance.transfer(accounts[9], 4, {from:accounts[8]})
    .then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert') >= 0, "first transfer error");
    });
  });

 
});

//.then(assert.fail).catch(function(error){
 //   assert(error.message.indexOf('revert') >= 0, "no category at this index");
//})

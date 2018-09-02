// not up to date
var AddressBook = artifacts.require("./contracts/UseCase/AddressBook.sol");

contract("AddressBook Contract", function(accounts) {
  var ABinstance;

  it("check Category", function() {
    return AddressBook.deployed().then(function(instance) {
        ABinstance = instance;
      return ABinstance.getcategoryIndex(1);
    }).then(function(categoryOf) {
      assert.equal(categoryOf, "InfosAdministration", "correct category");
      return ABinstance.getcategoryIndex(6);
    }).then(function(noCate){
        assert.equal(noCate, "", "correct no category");
        return ABinstance.addNewCategoryIndex(6, "Contracts", {from:accounts[0]})
    }).then(function(ii){
        return ABinstance.getcategoryIndex(6);
    }).then (function (newC){
        assert.equal(newC, "Contracts", "correct new category");
    })
   });


   it("reg Org + check info", function(){
    return ABinstance.regOrg("firstOrg", accounts[2], {from: accounts[1]})
    .then(function(i){
        return ABinstance.addAddressToBook(accounts[1], 1, 0x11, "first added Address1", {from: accounts[1]})
    }).then(function (i2){
        return ABinstance.getInfoOf(accounts[1],1,0x11)
    }).then(function (info1){
        assert.equal(info1, "first added Address1", "correct infos");
        assert.notEqual(info1, "", "correct infos");
        return ABinstance.changeInfoOfAddress(accounts[1], 1, 0x11, "changed Infos 1", {from: accounts[2]});
    }).then (function (newInfo){
        return ABinstance.getInfoOf(accounts[1],1,0x11)
    }).then(function (changedInfo){
        assert.notEqual(changedInfo, "first added Address1", "correct new infos");
        assert.equal(changedInfo, "changed Infos 1", "correct new infos");
    });
   });

   it("change sec Address", function(){
        return ABinstance.changeSecMainAddress(accounts[1], accounts[3], {from: accounts[2]})
        .then(function (changeSecA){
            return ABinstance.organizationMap(accounts[1]);
        }).then(function (t){
            return ABinstance.changeInfoOfAddress(accounts[1], 1, 0x11, "changed info3", {from: accounts[3]});
        })
        .then (function (newInfo){
            return ABinstance.getInfoOf(accounts[1],1,0x11)
        }).then(function (changedInfo){
            assert.notEqual(changedInfo, "changed Infos 1", "correct new infos");
            assert.equal(changedInfo, "changed info3", "correct new infos");
            return ABinstance.changeInfoOfAddress(accounts[1], 1, 0x11, "changed info4", {from: accounts[2]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "cant change Infos");
            return ABinstance.getInfoOf(accounts[1],1,0x11)
        }).then(function (changedInfo){
            assert.notEqual(changedInfo, "changed Infos 4", "correct new infos");
            assert.equal(changedInfo, "changed info3", "correct new infos");
        });
    });

    it("remove Address",function(){
        return ABinstance.removeAddressFromBook(accounts[1], 1, 0x11, 2,   {from: accounts[2]})
        .then(function(remvoeAdd){
            return ABinstance.getInfoOf(accounts[1], 1, 0x11);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "deleted Add");
    });
});



it("place account 5 in org ",function(){
    ABinstance.regOrg("timeOrg", accounts[6], {from:accounts[5]})
    .then(function(reg){
      return ABinstance.addAddressToBook(accounts[5], 4, accounts[10], "Manage the Fai", {from:accounts[5]});
    }).then(function(e){
      return ABinstance.getInfoOf(accounts[5], 4, accounts[10] );
    }).then(function(infos){
      assert.equal(infos, "Manage the Fai", "the info is correct");
      return ABinstance.getIndexof(accounts[5], 4, accounts[10]);
    }).then(function(idx){
      assert.equal(idx, 1, "idx of address is correct");
      return ABinstance.checkEofAddress(accounts[5],accounts[10],4, 1);
    })
  });
});

//.then(assert.fail).catch(function(error){
 //   assert(error.message.indexOf('revert') >= 0, "no category at this index");
//})

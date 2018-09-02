// not up to date
var TransparentCivilSociety = artifacts.require("./TransparentCivilSociety.sol");

contract("TransparentCivilSociety", function(accounts) {
  var TCSInstance;

    it("check the owner of the Contract", function() {
      return TransparentCivilSociety.deployed().then(function(instance) {
        return instance.managerTCS
        ();
      }).then(function(owner) {
        assert.equal(owner, accounts[0]);
      });
    });

    it("it initializes the org + test event + accept + close", function() {
      return TransparentCivilSociety.deployed().then(function(instance) {
        TCSInstance = instance;
        return TCSInstance.registration("FIRST", "", "", "", "", 222,{ from: accounts[1], value: web3.toWei(1.8, "ether")});
      }).then(function(receipt) {
        assert.equal(receipt.logs.length, 1, "an event was triggered");
        assert.equal(receipt.logs[0].event, "RegistrationRequests", "the event type is correct");
        assert.equal(receipt.logs[0].args.orgransationAdd, accounts[1], "the eth add id is correct");
        return TCSInstance.getBasicOrganizationInfos(accounts[1]);
      }).then(function (infos){
        assert.equal(infos[1],"FIRST", "name is correct!");
        assert.equal(infos[0], 1 , "status is correct!")
        assert.equal(infos[5], 222, "year is correct!");
        return TCSInstance.acceptRegRequest(accounts[1], {from: accounts[0]});
      }).then(function(s){
        assert.equal(s.logs.length, 1, "an event was triggered");
        assert.equal(s.logs[0].event, "RegistrationAccept", "the event type is correct");
        assert.equal(s.logs[0].args.orgransationAdd, accounts[1], "the eth add id is correct");
        return TCSInstance.getBasicOrganizationInfos(accounts[1]);
      }).then(function (newstatus){
        assert.equal(newstatus[1],"FIRST", "name is correct!");
        assert.equal(newstatus[0], 2 , "status is correct!")
        assert.equal(newstatus[5], 222, "year is correct!");
        assert.equal(newstatus[6], web3.toWei(1.4, "ether"), "balance is correct!");
        return TCSInstance.closeAccount({from: accounts[1]});
      }).then(function(afterclose){
        return TCSInstance.getBasicOrganizationInfos(accounts[1]);
      }).then(function(lastInfos){
        assert.equal(lastInfos[1],"closed", "name is correct!");
        assert.equal(lastInfos[0], 0 , "status is correct!")
        assert.equal(lastInfos[5], 222, "year is correct!");
        assert.equal(lastInfos[6], web3.toWei(0, "ether"), "balance is correct!");
    });
  });

  it("it initializes the org + reject +  test event", function() {
    return TransparentCivilSociety.deployed().then(function(instance) {
      TCSInstance = instance;
      return TCSInstance.registration("Sec", "", "", "", "", 3333,{ from: accounts[2], value: web3.toWei(1.8, "ether")});
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, "an event was triggered");
      assert.equal(receipt.logs[0].event, "RegistrationRequests", "the event type is correct");
      assert.equal(receipt.logs[0].args.orgransationAdd, accounts[2], "the eth add of the sec Org is correct");
      return TCSInstance.getBasicOrganizationInfos(accounts[2]);
    }).then(function (infos){
      assert.equal(infos[1],"Sec", "sec name is correct!");
      assert.equal(infos[0], 1 , "sec status is correct!")
      assert.equal(infos[5], 3333, "sec year is correct!");
      return TCSInstance.rejectRegRequest(accounts[2], {from: accounts[0]});
    }).then(function(s2){
      assert.equal(s2.logs.length, 1, "an event was triggered");
      assert.equal(s2.logs[0].event, "RegistrationReject", "the event type is correct");
      assert.equal(s2.logs[0].args.orgransationAdd, accounts[2], "the eth add of the sec Org is correct");
      return TCSInstance.getBasicOrganizationInfos(accounts[2]);
    }).then(function (newstatus2){
      assert.equal(newstatus2[1],"Sec", "sec name is correct!");
      assert.equal(newstatus2[0], 6 , "sec status after reject is correct!")
      assert.equal(newstatus2[5], 3333, "sec year is correct!");
    });
  });

});


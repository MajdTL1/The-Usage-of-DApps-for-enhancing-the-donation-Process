var TransparentCivilSociety = artifacts.require("./TransparentCivilSociety.sol");
var TCSVotingSystem = artifacts.require("./TCSVotingSystem.sol");

contract("TransparentCivilSociety2", function(accounts) {
    var TCSInstance;
    var TVinstance;

    it("it initializes the org + test event + accept + reportevent", function() {
        return TransparentCivilSociety.deployed().then(function(instance) {
          TCSInstance = instance;
          return TCSInstance.registration("FIRST", "", "", "", "", 222, {from: accounts[1], value: web3.toWei(1.8, "ether")});
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          assert.equal(receipt.logs[0].event, "RegistrationRequests", "the event type is correct");
          assert.equal(receipt.logs[0].args.orgransationAdd, accounts[1], "the eth add ofOrg id is correct");
          return TCSInstance.getBasicOrganizationInfos(accounts[1]);
        }).then(function (infos){
          assert.equal(infos[1],"FIRST", "name is correct!");
          assert.equal(infos[0], 1 , "status is correct!")
          return TCSInstance.acceptRegRequest(accounts[1], {from: accounts[0]});
        }).then(function(s){
          assert.equal(s.logs.length, 1, "an event was triggered");
          assert.equal(s.logs[0].event, "RegistrationAccept", "the event type is correct");
          assert.equal(s.logs[0].args.orgransationAdd, accounts[1], "the eth add of Org id is correct");
          return TCSInstance.getBasicOrganizationInfos(accounts[1]);
        }).then(function (newstatus){
          assert.equal(newstatus[0], 2 , "status is correct after accepting the request")
          assert.equal(newstatus[6], web3.toWei(1.4, "ether"), "balance is correct!");
          return TCSInstance.reportWithFund(accounts[1],{from: accounts[4], value: web3.toWei(0.7, "ether")});
        }).then(function(s2){
          assert.equal(s2.logs.length, 1, "an event was triggered");
          assert.equal(s2.logs[0].event, "ReportedbyStake", "the event type is correct");
          return TCSInstance.getBasicOrganizationInfos(accounts[1]);
        }).then(function(lastInfos){
          assert.equal(lastInfos[0], 3 , "status is correct after someone report the Org");
          return TCSInstance.getVotingContractOfOrg(accounts[1]);
        }).then(function(addressOFVoting){
          var addr2 = addressOFVoting;
          TVinstance = TCSVotingSystem.at(addr2);
          return TVinstance.managerTSC();
        }).then(function(own2){
          assert.equal(own2, accounts[0], "correct owner of the voting contract");
        });
      });

      it("check Status org", function() {
          return TCSInstance.getBasicOrganizationInfos(accounts[1]).then(function (infos){
          assert.equal(infos[0], 3 , "status is correct!")
        }); 
      });  

      it("check user report function and num of reports", function() {
        return TVinstance.voteUser(accounts[1], true, {from: accounts[4]}).then(function(hash){
          return TVinstance.numOfVoterUser(accounts[1])
        }).then(function(hash){
          assert.equal(hash, "1");
          return TVinstance.voteUser(accounts[1], false, {from: accounts[5]})
        }).then(function(hash){
          return TVinstance.numOfVoterUser(accounts[1])
        }).then(function(hash){
          assert.equal(hash, "2");
          return TVinstance.numPosVoteUser(accounts[1])
        }).then(function(hash){
          assert.equal(hash, 1);
        });
      });

      it("another postive User report and check num of potive reports", function() {
        return TVinstance.voteUser(accounts[1], true, {from: accounts[6]}).then(function(hash){
          return TVinstance.numPosVoteUser(accounts[1])
        }).then(function(hash){
          assert.equal(hash, 2);
        });
      });

      it("TSC manager Vote and manipulate Time", function() {
        return TVinstance.voteTCS(accounts[1], 1 , {from: accounts[0]}).then(function(hash){
          return TVinstance.managerVote(accounts[1])
        }).then(function(hash){
          assert.equal(hash, 1);
          return web3.eth.getBlock(web3.eth.blockNumber).timestamp
        }).then( function (t){
          return web3.currentProvider.send({jsonrpc: "2.0", method: "evm_increaseTime", params: [1234500], id: 0})
        }).then( function (t){
          return web3.currentProvider.send({jsonrpc: "2.0", method: "evm_mine", params: [], id: 0})
        });
      });

      it("calculate the Votes and check the result", function() {
        return TVinstance.calculatePoints(accounts[1]).then(function(hash){
          return TVinstance.voteResult(accounts[1])
        }).then(function(hash){
          assert.equal(hash, 8, "correct result after calculating the votes");
        });
      });
      
      it("check Status of org after the Vote", function() {
        return TCSInstance.getBasicOrganizationInfos(accounts[1]).then(function (infos){
        assert.equal(infos[0], 2 , "status is correct after the vote is closed")
        }); 
      });

    }); 
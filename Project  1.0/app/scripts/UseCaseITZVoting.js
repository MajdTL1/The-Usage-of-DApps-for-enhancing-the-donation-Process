var instance_TCS ;
var instance_TCSVoting;

  document.getElementById("setRelatedVoteAddressBtn").onclick = function() {
    contract_TCSVotingSystem_Add = document.getElementById("voteAddressofReport").value;
    instance_TCSVoting  = createContractInstanceTCSVotingSystem(contract_TCSVotingSystem_Add);
  };

 /*
  * GETs
 */
  document.getElementById("OriginalContractBtn").onclick = function() {
    instance_TCSVoting.mainContract(function(error,result){
         document.getElementById("OriginalContract").value = result;    
     });
  };
  
  document.getElementById("isRepBtn").onclick = function() {
    var add = document.getElementById("isReportedID").value;
  
    instance_TCSVoting.isOrgReported.call(add, function(error,result){
      document.getElementById("isReportedID").value = result;    
    });
  };
  
  document.getElementById("VoteResBtn").onclick = function() {
    var add = document.getElementById("getVoteRId").value;
    instance_TCSVoting.resultOfVoting.call(add, function(error,result){
      document.getElementById("getVoteRId").value = result;    
    });
  };
  
  document.getElementById("getTimeBtn").onclick = function() {
    var add = document.getElementById("getTimeForVote").value;
    instance_TCSVoting.getvotingTime.call(add, function(error,result){
      document.getElementById("getTimeForVote").value = timeConverter(result);    
    });
  };
  
  /*
  *VOTE
  */
  document.getElementById("voteUserbtn").onclick = function() {
    console.log("userVote");
    var txnObject = {
      from: web3.eth.coinbase
  
    }
    var add = document.getElementById("AdduserOrgVote").value;
    var vote = document.getElementById("voteOfUser").value;
    let d;
    if(vote == "true"){
      d = true;
    }else{
      d = false;
    }
    instance_TCSVoting.voteUser.sendTransaction(add, d,  txnObject, function(error,result){
      document.getElementById("voteUserHash").value = (result);    
    });
  };
  
  document.getElementById("voteOrgbtn").onclick = function() {
    console.log("orgVote")
    var txnObject = {
      from: web3.eth.coinbase 
    }
    var add = document.getElementById("AddorgOrgVote").value;
    var vote = document.getElementById("voteOfOrga").value;
    let d;
    if(vote == "true"){
      d = true;
    }else{
      d = false;
    }
    instance_TCSVoting.voteOrg.sendTransaction(add, d,  txnObject, function(error,result){
      document.getElementById("voteOrgHash").value = (result);    
    });
  };
  
  document.getElementById("voteITZbtn1").onclick = function() {
    console.log("ITZVote")
    var txnObject = {
      from: web3.eth.coinbase
    }
    var add = document.getElementById("AddITZVote").value;
    var vote = document.getElementById("voteOfITZ").value;
    let d;
    if(vote == "1"){
      d = 1;
    }else{
      d = 2;
    }
    instance_TCSVoting.voteTCS.sendTransaction(add, d,  txnObject,function(error,result){
      document.getElementById("voteITZHash").value = (result);    
    });
  };
  
  //Calc Points
  document.getElementById("CalcuBtn").onclick = function() {
    var estimatedGas = 5000000;
    var txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas 
    }
    var add = document.getElementById("OrgAddCalc").value;
    instance_TCSVoting.calculatePoints.sendTransaction(add,   txnObject, function(error,result){
      document.getElementById("hashOfCalc").value = (result);    
    });
  };
  
  document.getElementById("getRewardBtn").onclick = function() {
    var estimatedGas = 500000;
    var txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas 
    }
    instance_TCSVoting.getReward.sendTransaction(txnObject, function(error,result){
      document.getElementById("hashOfReward").value = (result);    
    });
  };

//....When the page is loaded this will be invoked, it connect the page to the blockchain and inovke methods that create instance of contract from util.js 
window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider);
      console.log('Connected to Metamask!')
      document.getElementById('myImage').src='../images/ethereum_logo_2_2.png';
    } else {
      console.log('Injected web3 Not Found!!!')
      var provider = 'http://localhost:8545';
      window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
      console.log('Connected without Metamask!')
      document.getElementById('myImage').src='../images/ethereum_logo_2_2.png';
    } 
    console.log("account: " +  web3.eth.coinbase);
    instance_TCS = createContractInstanceTCSOriginal();
  });
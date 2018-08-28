
var instance_TCS ; 

// EVENTS

// the fromBlock is set to null, cause we are using TestRPC,
// but they should set to the number of the block in it the contract has been deployed

document.getElementById("getAcceptListofEvent").onclick = function(){
    document.getElementById("acceptedOrgList").value= ' ';
    instance_TCS.RegistrationAccept({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch(function(error, event) {
      document.getElementById("acceptedOrgList").value = document.getElementById("acceptedOrgList").value + "\n" + event.args.orgransationAdd +", at: " + timeConverter(event.args.timeA) ;
      console.log("Organization Acceepted", JSON.stringify(event.args))
    });
  };
  
  document.getElementById("getRejectListofEvent").onclick = function(){
    document.getElementById("rejectedOrgList").value= ' ';
    instance_TCS.RegistrationReject({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch(function(error, event) {
      document.getElementById("rejectedOrgList").value = document.getElementById("rejectedOrgList").value + "\n" + event.args.orgransationAdd +", at: " + timeConverter(event.args.timeR) ;
      //console.log("Organization rejected!", JSON.stringify(event.args))
    });
  };
  
  document.getElementById("getRequestListofEvent").onclick = function(){
    document.getElementById("OrgreqList").value= ' ';
    instance_TCS.RegistrationRequests({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch(function(error, event) {
      document.getElementById("OrgreqList").value = document.getElementById("OrgreqList").value + "\n" + event.args.orgransationAdd +", at: " + timeConverter(event.args.timeRR) ;
      //console.log("Organization rejected!", JSON.stringify(event.args))
    });
  };
  
  document.getElementById("getModDataofOrg").onclick = function(){
    document.getElementById("listOFmodifiedData").value= ' ';
    var orgAdd = document.getElementById("AddOftheOrgeventMDide").value;
    instance_TCS.ModifiedData({_add: orgAdd}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch(function(error, event) {
      document.getElementById("listOFmodifiedData").value = document.getElementById("listOFmodifiedData").value + "\n at: " + timeConverter(event.args.timeM) ;
      //console.log("Organization modified!", JSON.stringify(event.args))
    });
  };
  
  document.getElementById("getReportedByStake").onclick = function(){
    document.getElementById("ReportedwithstakeTA").value= ' ';
    instance_TCS.ReportedbyStake({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch(function(error, event) {
      document.getElementById("ReportedwithstakeTA").value = document.getElementById("ReportedwithstakeTA").value + "\n" + event.args._add +", at: " + timeConverter(event.args.time) ;
      //console.log("Organization reportedBystake!", JSON.stringify(event.args))
    });
  };
  
  document.getElementById("getchangedStatusEvent").onclick = function(){
    document.getElementById("changedStatusEvent").value= ' ';
    instance_TCS.ChangingStatus({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch(function(error, event) {
      document.getElementById("changedStatusEvent").value = document.getElementById("changedStatusEvent").value + "\n" + event.args.orgransationAdd +", at: " + timeConverter(event.args.timeC) + ", to : " + event.args.status ;
      //console.log("Organization status changed!", JSON.stringify(event.args))
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
    instance_TCS = createContractInstanceTCSOriginal()
  });
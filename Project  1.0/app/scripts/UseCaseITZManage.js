console.log('UseCaseITZUser');

var instance_TCS ;
 
document.getElementById("acceptRegBtnID").onclick = function() {
    var orgAddN =  document.getElementById("addofOrgRequest").value;
    var estimatedGas = 4000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.acceptRegRequest.sendTransaction(orgAddN, txnObject, function(error ,result){    
      document.getElementById("accepthash").value = result;
     });
  };
  
  document.getElementById("RejectRegBtnID").onclick = function() {
    var orgAddN =  document.getElementById("addofOrgRequest2").value;
    var estimatedGas = 4000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.rejectRegRequest.sendTransaction(orgAddN, txnObject, function(error ,result){    
      document.getElementById("Rejecthash").value = result;
     });
  };
  
  document.getElementById("tokenSmartcontracts1Btn").onclick = function() {
    var orgAddT =  document.getElementById("tokenSmartcontractsAdd1").value;
    var statusToken =  document.getElementById("tokenSmartcontractsstatus").value;
    var estimatedGas = 4000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.setverfiedToken.sendTransaction(orgAddT, statusToken, txnObject, function(error ,result){    
      document.getElementById("tokenhash").value = result;
     });
  };
 
  document.getElementById("ReportwithSbtn").onclick = function() {
    var orgAddN =  document.getElementById("ReportedAddwithS").value;
    var estimatedGas = 4700000;
    var    txnObject = {
      from: web3.eth.coinbase,
      value: web3.toWei(0.7, "ether"),
      gas: estimatedGas
    }
    instance_TCS.reportWithFund.sendTransaction(orgAddN,txnObject,function(error ,result){    
      document.getElementById("ReportedAddwithSHash").value = result;
  
     });
  };
  
  document.getElementById("getVC222").onclick = function() {
    var orgAddN =  document.getElementById("reportedOrgAdd222").value;
    instance_TCS.getVotingContractOfOrg.call(orgAddN, function(error ,result){    
      document.getElementById("returnVCaddress").value = result;
     });
  };

  document.getElementById("statusofTokenBtn").onclick = function() {
    var orgAddToken =  document.getElementById("changeTokenVerifiedOrgAddrId").value;
    var orgTokenStatus =  document.getElementById("changeTokenVerifiedOrgStatusId").value;
    var estimatedGas = 4700000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.setverfiedToken.sendTransaction(orgAddToken, orgTokenStatus, txnObject, function(error ,result){    
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
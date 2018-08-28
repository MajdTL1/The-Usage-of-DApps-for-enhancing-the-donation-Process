console.log('UseCaseITZORG');

var instance_TCS ;

/*
* SETs
*/

document.getElementById("setOrgINfo").onclick = function() {
    var _orgregname =  document.getElementById("orgregnameID").value;
    var _officAdd = document.getElementById("officAddID").value;
    var _webPage = document.getElementById("webPageID").value;
    var _contactName = document.getElementById("contactNameID").value;
    var _contactPhone = document.getElementById("contactPhoneID").value;
    var _foundyear = document.getElementById("foundyearID").value;
    var estimatedGas = 4000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      value: web3.toWei(1.8, "ether"),
      gas: estimatedGas
    }
    instance_TCS.registration.sendTransaction(_orgregname, _officAdd, _webPage, _contactName, _contactPhone, _foundyear, txnObject,function(error ,result){    
      document.getElementById("txhashID").value = result;
     });
  };

document.getElementById("SETAddInfoButton").onclick = function() {
    var mission =  document.getElementById("_missionID").value;
    var certificate =  document.getElementById("_certificateID").value;
    var personnelStructure =  document.getElementById("_personnelStructureID").value;
    var currentResource =  document.getElementById("_currentResourceID").value;
    var institutionallist =  document.getElementById("_institutionallistID").value;
    var legalentities = document.getElementById("_legalentitiesID").value;
    var estimatedGas = 4700000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.setAdditionalInfo.sendTransaction(mission,certificate,personnelStructure,currentResource,institutionallist,legalentities, txnObject,function(error ,result){    
      document.getElementById("AddInfoOutput").value = result;
     });
  };
  
  document.getElementById("addAnReportBtn").onclick = function() {
    var _year =  document.getElementById("_AnnualReportyear").value;
    var _hash =  document.getElementById("_AnnualReporthash").value;
    var estimatedGas = 4700000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.setAnnualReport.sendTransaction(_year, _hash, txnObject,function(error ,result){    
      document.getElementById("OutputHashAnnualReport").value = result;
     });
  };
  
  document.getElementById("addDmBtn1").onclick = function() {
    var name =  document.getElementById("_decisionmakerName").value;
    var funchash =  document.getElementById("_decisionmakerFunction").value;
    var estimatedGas = 4700000;
    var txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.setDecisionmaker.sendTransaction(name, funchash, txnObject,function(error ,result){    
      document.getElementById("OutputHashdecmaker").value = result;
     });
  };
  
  document.getElementById("addtoCLBtn1").onclick = function() {
    var name =  document.getElementById("_Contactlistname").value;
    var phone =  document.getElementById("_ContactlistPhone").value;
    var estimatedGas = 4700000;
    var txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.setContactList.sendTransaction(name, phone, txnObject,function(error ,result){    
      document.getElementById("Outputcontactlist").value = result;
     });
  };

  document.getElementById("closeIDBtn").onclick = function() {
    var estimatedGas = 4000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_TCS.closeAccount.sendTransaction(txnObject, function(error ,result){    
      document.getElementById("closeHashreturn").value = result;
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


var instance_ManagementOrg;
var instance_MainOrg ;
var instance_DonationTokenOrg ;
var instance_VaultOrg;


  document.getElementById("MainOrgAddProjBtn").onclick = function() {
    var addr =  document.getElementById("MainOrgProAddr1").value;
    var amount =  document.getElementById("MainOrgProAmount1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_MainOrg.addProjectinNeed.sendTransaction(addr, amount, txnObject, function(error ,result){ 
    
    });
  };

  document.getElementById("ManageremoveProj1Btn").onclick = function() {
    var addrR =  document.getElementById("ManageremoveProjAddr1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_ManagementOrg.removeProject.sendTransaction(addrR, txnObject, function(error ,result){ 
    });
  };
  
  document.getElementById("MainOrgCurrentCostBtn").onclick = function() {
    var cost =  document.getElementById("MainOrgCurrentCost1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_MainOrg.setcurrentCost.sendTransaction(cost, txnObject, function(error ,result){ 
    });
  };

  document.getElementById("ManageDonateToProM1Btn").onclick = function() {
    var addrM =  document.getElementById("ManageDonateToProAddrM1").value;
    var tIdM =  document.getElementById("ManageDonateToProTIDM1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_ManagementOrg.transerDToken.sendTransaction(addrM, tIdM, txnObject, function(error ,result){ 
    });
  };

  document.getElementById("VaultUnlock1Btn").onclick = function() {
    var tokenId =  document.getElementById("VaultUnlock1id").value;
    var orgaddr = document.getElementById("VaultUnlock2id").value;
    var cate =  document.getElementById("VaultUnlock3id").value;
    var index =  document.getElementById("VaultUnlock4id").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_VaultOrg.unlockFai.sendTransaction(tokenId, orgaddr, cate, index, txnObject, function(error ,result){ 
    });
  };


  document.getElementById("ManagProjectStatusBtn").onclick = function() {
    var addrR =  document.getElementById("ManagProjectStatusId").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_ManagementOrg.changeStatusofPorject.sendTransaction(addrR, txnObject, function(error ,result){ 
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
    instance_MainOrg  = createContractInstanceMainOrg();
    instance_DonationTokenOrg  = createContractInstanceDonationTokenOrg();
    instance_ManagementOrg = createContractInstanceManagementOrg();
    instance_VaultOrg = createContractInstanceVaultOrg();
  });
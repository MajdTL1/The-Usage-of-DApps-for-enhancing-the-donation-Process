
var instance_AddressBook;
var instance_DonationTokenOrg;
var instance_FaiToken;
var instance_MainOrg;
var instance_ManagementOrg;
var instance_ProjectOrg1;
var instance_ProjectOrg2;
var instance_ProjectOrg3;
var instance_VaultOrg;

// add address for Donation Token Contract///////////////////
document.getElementById("mainOrgDonationBtn").onclick = function() {
    console.log(instance_DonationTokenOrg.address)
    var orgAddN =  document.getElementById("mainOrgDonation1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_DonationTokenOrg.setmainOrgContract.sendTransaction(orgAddN, txnObject, function(error ,result){
        console.log(result);     
     });
  };

  document.getElementById("managOrgDonationBtn").onclick = function() {
    var orgAddN =  document.getElementById("managOrgDonation1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_DonationTokenOrg.setmanagementContract.sendTransaction(orgAddN, txnObject, function(error ,result){  
      console.log(result); 
     });
  };

  document.getElementById("vaultOrgDonationBtn").onclick = function() {
    var orgAddN =  document.getElementById("vaultOrgDonation1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_DonationTokenOrg.setVaultContract.sendTransaction(orgAddN, txnObject, function(error ,result){ 
        console.log(result);    
     });
  };

  // add address for VaultOrg Contract///////////////////
  document.getElementById("DonationTokenVaultBtn").onclick = function() {
    var orgAddN =  document.getElementById("DonationTokenVault1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_VaultOrg.setDTContract.sendTransaction(orgAddN, txnObject, function(error ,result){
             
     });
  };

  document.getElementById("FaiTokenVaultBtn").onclick = function() {
    var orgAddN =  document.getElementById("FaiTokenVault1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_VaultOrg.setFaiContract.sendTransaction(orgAddN, txnObject, function(error ,result){  
          
     });
  };


  document.getElementById("addressBookVaultBtn").onclick = function() {
    var orgAddN =  document.getElementById("addressBookVault1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_VaultOrg.setaddrBookContract.sendTransaction(orgAddN, txnObject, function(error ,result){ 
          
     });
  };

    // add address for ManagementOrg Contract///////////////////

    document.getElementById("DonationTokenManagementBtn").onclick = function() {
      var orgAddN =  document.getElementById("DonationTokenManagement1").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ManagementOrg.setDTContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };
  
    document.getElementById("MainOrgManagementBtn").onclick = function() {
      var orgAddN =  document.getElementById("MainOrgManagement1").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ManagementOrg.setmainOrgContract.sendTransaction(orgAddN, txnObject, function(error ,result){  
            
       });
    };

    // add address for MainOrg Contract///////////////////

    document.getElementById("DonationTokenMainOrgBtn").onclick = function() {
      var orgAddN =  document.getElementById("DonationTokenMainOrg1").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_MainOrg.setDTContract.sendTransaction(orgAddN, txnObject, function(error ,result){
              console.log(result); 
       });
    };
  
    document.getElementById("FaiTokenMainOrgBtn").onclick = function() {
      var orgAddN =  document.getElementById("FaiTokenMainOrg1").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_MainOrg.setFaiContract.sendTransaction(orgAddN, txnObject, function(error ,result){  
            
       });
    };

    document.getElementById("VaultOrgMainOrgBtn").onclick = function() {
      var orgAddN =  document.getElementById("VaultOrgMainOrg1").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_MainOrg.setVaultContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };

    document.getElementById("ManagementOrgMainOrgBtn").onclick = function() {
      var orgAddN =  document.getElementById("ManagementOrgMainOrg1").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_MainOrg.setManagementContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };

    // add address for Project1 Contract///////////////////

     document.getElementById("DonationTokenProjectOrg1Btn").onclick = function() {
      var orgAddN =  document.getElementById("DonationTokenProjectOrg11").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setDTContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };
  
    document.getElementById("FaiTokenProjectOrg1Btn").onclick = function() {
      var orgAddN =  document.getElementById("FaiTokenProjectOrg11").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setFaiContract.sendTransaction(orgAddN, txnObject, function(error ,result){  
            
       });
    };

    document.getElementById("VaultOrgProjectOrg1Btn").onclick = function() {
      var orgAddN =  document.getElementById("VaultOrgProjectOrg11").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setVaultContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };
  
    document.getElementById("ManagementOrgProjectOrg1Btn").onclick = function() {
      var orgAddN =  document.getElementById("ManagementOrgProjectOrg11").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setManagementOrg.sendTransaction(orgAddN, txnObject, function(error ,result){  
            
       });
    };

    
    // add address for Project2 Contract///////////////////

    document.getElementById("DonationTokenProjectOrg2Btn").onclick = function() {
      var orgAddN =  document.getElementById("DonationTokenProjectOrg21").value;
      var estimatedGas = 8000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setDTContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };
  
    document.getElementById("FaiTokenProjectOrg2Btn").onclick = function() {
      var orgAddN =  document.getElementById("FaiTokenProjectOrg21").value;
      var estimatedGas = 8000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setFaiContract.sendTransaction(orgAddN, txnObject, function(error ,result){  
            
       });
    };

    document.getElementById("VaultOrgProjectOrg2Btn").onclick = function() {
      var orgAddN =  document.getElementById("VaultOrgProjectOrg21").value;
      var estimatedGas = 8000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setVaultContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };
  
    document.getElementById("ManagementOrgProjectOrg2Btn").onclick = function() {
      var orgAddN =  document.getElementById("ManagementOrgProjectOrg21").value;
      var estimatedGas = 8000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setManagementOrg.sendTransaction(orgAddN, txnObject, function(error ,result){  
            
       });
    };

       // add address for Project2 Contract///////////////////

    document.getElementById("DonationTokenProjectOrg2Btn").onclick = function() {
      var orgAddN =  document.getElementById("DonationTokenProjectOrg21").value;
      var estimatedGas = 8000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setDTContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };
  
    document.getElementById("FaiTokenProjectOrg2Btn").onclick = function() {
      var orgAddN =  document.getElementById("FaiTokenProjectOrg21").value;
      var estimatedGas = 8000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setFaiContract.sendTransaction(orgAddN, txnObject, function(error ,result){  
            
       });
    };

    document.getElementById("VaultOrgProjectOrg2Btn").onclick = function() {
      var orgAddN =  document.getElementById("VaultOrgProjectOrg21").value;
      var estimatedGas = 8000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setVaultContract.sendTransaction(orgAddN, txnObject, function(error ,result){
               
       });
    };
  
    document.getElementById("ManagementOrgProjectOrg2Btn").onclick = function() {
      var orgAddN =  document.getElementById("ManagementOrgProjectOrg21").value;
      var estimatedGas = 8000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.setManagementOrg.sendTransaction(orgAddN, txnObject, function(error ,result){  
            
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
    instance_DonationTokenOrg  = createContractInstanceDonationTokenOrg();
    instance_FaiToken  = createContractInstanceFaiToken() ;
    instance_MainOrg  = createContractInstanceMainOrg();
    instance_ManagementOrg  = createContractInstanceManagementOrg();
    instance_ProjectOrg1 = createContractInstanceProjectOrg1();
    //instance_ProjectOrg2 = createContractInstanceProjectOrg2();
    //instance_ProjectOrg3 = createContractInstanceProjectOrg3();
    instance_VaultOrg = createContractInstanceVaultOrg();
  });
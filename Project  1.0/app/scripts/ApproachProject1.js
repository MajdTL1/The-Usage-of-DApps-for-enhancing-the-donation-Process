
var instance_ProjectOrg1;
var instance_DonationTokenOrg;

    document.getElementById("Project1TransferTo1Btn").onclick = function() {
        var addrP =  document.getElementById("Project1TransferTo1").value;
        var TIdP =  document.getElementById("Project1TransferTId1").value;
        var estimatedGas = 5000000;
        var txnObject = {
            from: web3.eth.coinbase,
            gas: estimatedGas
        }
        instance_ProjectOrg1.transferTokens.sendTransaction(addrP, TIdP, txnObject, function(error ,result){ 
        });
    };

    document.getElementById("ProDTSplitBtn").onclick = function() {
      var token =  document.getElementById("ProSplitTokenId1").value;
      var first =  document.getElementById("ProSplitValue1").value;
      var second =  document.getElementById("ProSplitValue2").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_ProjectOrg1.splitToken.sendTransaction(token, first, second, txnObject, function(error ,result){ 
        //console.log(result);
         instance_DonationTokenOrg.Split({_orginialToken:token, _owner: instance_ProjectOrg1.address}, {fromBlock:'latest', toBlock:'Pending'}).watch(function(error, event){
        //console.log(event)
        document.getElementById("ProSplitNewTId2").value = event.args._splitedToken + " tokenID " ;
        });
      });
    };

    document.getElementById("Project1StatusBtn").onclick = function() {
      instance_ProjectOrg1.getStatus.call(function(error, result){ 
        document.getElementById("Project1StatusID").value = result;
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
    instance_ProjectOrg1 = createContractInstanceProjectOrg1(); 
  });
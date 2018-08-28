 
var instance_FaiToken  ;

document.getElementById("FaiTokenPageTransferBtn").onclick = function() {
    var toAddress =  document.getElementById("FaiTokenPageTransferAddress").value;
    var toAmount =  document.getElementById("FaiTokenPageTransferAmount").value;
    var estimatedGas = 4000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_FaiToken.transfer.sendTransaction(toAddress, toAmount, txnObject, function(error ,result){
             
     });
  };

  document.getElementById("FaiTokenPageBalanceBtn").onclick = function() {
    var addr=  document.getElementById("FaiTokenPageBalanceof1").value;
    instance_FaiToken.balanceOf(addr, function(error ,result){  
        console.log(result)
         document.getElementById("FaiTokenPageBalance1").value = result;
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
    instance_FaiToken  = createContractInstanceFaiToken() ;
  
  });

var instance_MainOrg ;
var instance_ManagementOrg;
var instance_DonationTokenOrg;



  //donate ether and get TokenId of the donation
  document.getElementById("MainOrgDonate1Btn").onclick = function() {
    var amount =  document.getElementById("MainOrgDonate1").value;
    console.log(amount);
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas,
      value: web3.toWei(amount, 'ether')
    }
    instance_MainOrg.donateEther.sendTransaction(txnObject, function(error ,result){ 
          //var filter = web3.eth.filter({fromBlock:'pending', toBlock:'pending', address: DonationTokenOrg_Add, topic:["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",null,web3.eth.coinbase,null]});
          //filter.get(function(error, result){
            //if (!error)
           // console.log(result);
            //console.log(result[1].topics[3]);
            //var t = result[0].topics[3]
            //document.getElementById("tokenIdrec1").value = parseInt(t, 16);+ " tokenID " ;
          //});
            instance_DonationTokenOrg.Transfer({_to:web3.eth.coinbase}, {fromBlock:'latest', toBlock:'Pending'}).watch(function(error, event) {
              document.getElementById("tokenIdrec1").value = " tokenID : "  + event.args._tokenId   ;              
          });
    });
  };

  document.getElementById("ManageDonateToPro1Btn").onclick = function() {
    var addr =  document.getElementById("ManageDonateToProAddr1").value;
    var tId =  document.getElementById("ManageDonateToProTID1").value;
    var estimatedGas = 5000000;
    var    txnObject = {
      from: web3.eth.coinbase,
      gas: estimatedGas
    }
    instance_ManagementOrg.donateToProject.sendTransaction(addr, tId, txnObject, function(error ,result){ 
    });
  };

  document.getElementById("ManageDonateGETProN1Btn").onclick = function() {
    document.getElementById("MProject1").value = "";
    instance_ManagementOrg.getProjects( function(error ,result){ 
      var i = result.length;
      for( var j=1 ; j< i;j++){
        let str=  (result[j]); 
        if(str != '0x0000000000000000000000000000000000000000'){
          document.getElementById("MProject1").value = document.getElementById("MProject1").value +" "+  str + ", ";   
        }
      }
    });
  };

  document.getElementById("needOfProj1Btn").onclick = function() {
    var addr =  document.getElementById("needOfProj1Id").value;
    instance_ManagementOrg.getNeedof(addr, function(error ,result){ 
      document.getElementById("needOfProj1Return").value = result;
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
  });
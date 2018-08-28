
var instance_DonationTokenOrg;

var Arr = [0];

    document.getElementById("DTtransfer1Btn").onclick = function() {
        var to =  document.getElementById("DTtransferTO1").value;
        var token =  document.getElementById("DTtransferID1").value;
        var estimatedGas = 5000000;
        var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
        }
        instance_DonationTokenOrg.transfer.sendTransaction(to, token, txnObject, function(error ,result){ 
        console.log(result);
        });
    };
    
    document.getElementById("DTOwner1Btn").onclick = function() {
        var token =  document.getElementById("DTOwner1Of").value;
        instance_DonationTokenOrg.getOwner(token, function(error ,result){ 
            document.getElementById("DTOwner1Is").value = result;
        });
        instance_DonationTokenOrg.getValue(token, function(error ,result){ 
            document.getElementById("DTvalue1Is").value = result;
        });
    };
  
    document.getElementById("DTSplitBtn").onclick = function() {
      var token =  document.getElementById("SplitTokenId1").value;
      var first =  document.getElementById("SplitValue1").value;
      var second =  document.getElementById("SplitValue2").value;
      var estimatedGas = 5000000;
      var    txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
      }
      instance_DonationTokenOrg._split.sendTransaction(token, first, second, txnObject, function(error ,result){ 
        console.log(result);
         instance_DonationTokenOrg.Split({_orginialToken:token, _owner: web3.eth.coinbase}, {fromBlock:'latest', toBlock:'Pending'}).watch(function(error, event){
        console.log(event)
        document.getElementById("SplitNewTId2").value = event.args._splitedToken + " tokenID " ;
        });
      });
    };
  
  /** 
    document.getElementById("TokenHistoryBtn2").onclick = function() {
      var token =  document.getElementById("TokenHistory1").value;
      var historyArray = [parseInt(token)];
      //var k = parseInt(token, 16);
         instance_DonationTokenOrg.Split({_orginialToken: token}, {fromBlock:'0', toBlock:'Pending'}).watch(function(error, event){
           //console.log(event)
         document.getElementById("SplitNewTId2").value = event.args._splitedToken + " tokenID " ;
          var st = event.args._splitedToken;
          //console.log();
          historyArray.push(st.toNumber());
          }); 
         // for(var i = 0; )
         console.log(historyArray); 
    };
    */
  
    document.getElementById("TokenHistoryBtn").onclick = function() {
      document.getElementById("historyTestArea1").value  = "";
      var token =  document.getElementById("TokenHistory1").value;
      var historyArray = [parseInt(token)];
      var k = parseInt(token).toString(16);
      var hex = '0x' + sprintf('%064d', k);
      var filter = web3.eth.filter({fromBlock:'0', toBlock:'pending', address: '0xbfd0c2b508af2b14d85d2e0c94b5341cdada27ec', 
        topics:["0x0c7f8b65a397f608cb1d393cc0595e8fb38861c0a7a968741c35f684ea0c5541", hex, null, null]});
      filter.watch(function(error, result){
        console.log(result)
        historyArray.push(parseInt(result.topics[2]));
        var te2 = historyArray.toString();
        te2 = te2.replace(/,/g, ' ,  ');
        document.getElementById("historyTestArea1").value = te2;  
      });
    };
  
    //event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId); 
    //event Split(uint256 indexed _orginialToken, uint256 indexed _splitedToken, address indexed _owner);
    //the address should have the form of 0x00000000000000000000000010fde5586bceabb0a055774d98887023bdbf5638, because the filter return bytes32
    //fromBlock  and toBlock could be given as parameter in future implementation for more flexibility 
    document.getElementById("BalanceOfOwner1Btn").onclick = function() {
      var addr =  document.getElementById("BalanceOfOwner1").value;
      var toB =  document.getElementById("BalanceUntilBlock1").value;
      var Arr = [0];
      addr = addr.toLowerCase();
      var addr2 = addr.replace(/0x/g, '0x000000000000000000000000');
      var filter = web3.eth.filter({fromBlock:'0', toBlock:'pending', address: DonationTokenOrg_Add, 
        topics:[["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0c7f8b65a397f608cb1d393cc0595e8fb38861c0a7a968741c35f684ea0c5541"],
        null,
        null,
        null]});
      filter.watch(function(error, result){
          if((result.topics[2]).toLowerCase() == addr2){
             Arr.push((result.topics[3]));
          }
          if(result.topics[0] == "0x0c7f8b65a397f608cb1d393cc0595e8fb38861c0a7a968741c35f684ea0c5541"){
            if(result.topics[3] == addr2){
              Arr.push(result.topics[2]);
            }
          }
          if((result.topics[1]).toLowerCase() == addr2){
            for(var j = 0 ; j<= Arr.length; j++){
              if(Arr[j] == parseInt(result.topics[3])){
                 delete Arr[j];   
                }
              }
          }
          
          var stringArr = [];  
          for( var h = 1 ; h <  Arr.length; h++){
            stringArr.push(Arr[h]);
          }
          for(var m = 0; m < stringArr.length; m++){
            stringArr[m] = parseInt(stringArr[m], 16);
          }
        var te = stringArr.toString();
        te = te.replace(/,/g, '  ,  ');
        document.getElementById("BalanceTA1").value = te;
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
  });
  
  var instance_AddressBook;

  document.getElementById("ABgetInfo1").onclick = function() {

    var orgAdd = document.getElementById("ABorgAddget1").value;
    var idx = document.getElementById("ABindexget1").value;
    var add2 = document.getElementById("ABaddressget1").value;
    instance_AddressBook.getInfoOf.call(orgAdd, idx, add2, function(error,result){
      document.getElementById("ABreturnedInfo").value = (result);    
    });
  };

  document.getElementById("ABgetidxInter1").onclick = function() {

    var idx = document.getElementById("ABindexget2").value;

    instance_AddressBook.getcategoryIndex.call(idx, function(error,result){
      document.getElementById("ABIdxInterp2").value = (result);    
    });
  };

  document.getElementById("ABgetIndxofAdd").onclick = function() {

    var orgAdd = document.getElementById("ABorgAdd3").value;
    var idx = document.getElementById("ABindexget3").value;
    var add2 = document.getElementById("ABsearchadd3").value;
    instance_AddressBook.getIndexof.call(orgAdd, idx, add2, function(error,result){
      document.getElementById("ABIdxof3").value = (result);    
    });
  };

  document.getElementById("ABgetaddressArray").onclick = function() {
    document.getElementById("arrayIteration").value  = '';
    var orgAdd = document.getElementById("ABorgAdd4").value;
    var idx = document.getElementById("ABindexget4").value;
    instance_AddressBook.iterateArrayOf.call(orgAdd, idx, function(error,result){
      var i = result.length;
      for( var j=1 ; j< i;j++){
        let str=  (result[j]); 
        if(str != '0x0000000000000000000000000000000000000000'){
          document.getElementById("arrayIteration").value = document.getElementById("arrayIteration").value +" "+  str + ", "+ j;   
      }
    }
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
    instance_AddressBook = createContractInstanceAddressBook();
  });
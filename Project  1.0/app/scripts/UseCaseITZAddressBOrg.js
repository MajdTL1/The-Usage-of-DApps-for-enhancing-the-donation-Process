
var instance_AddressBook;

document.getElementById("ABregOrg").onclick = function() {
  console.log("reg Org first time");
  var name = document.getElementById("ABorgname").value;
  var secAdd = document.getElementById("ABsecondAdd").value;
  var txnObject = {
    from: web3.eth.coinbase  
  }
  instance_AddressBook.regOrg.sendTransaction(name, secAdd, txnObject, function(error,result){
    document.getElementById("ABHashReg").value = (result);    
  });
};

document.getElementById("ABaddAddress").onclick = function() {
  console.log("add address");
  var txnObject = {
    from: web3.eth.coinbase  
  }
  var orgAdd = document.getElementById("ABorgAdd1").value;
  var index1 = document.getElementById("ABindex1").value;
  var toAddAddress = document.getElementById("ABtoadd").value;
  var infos1 = document.getElementById("ABinfoAboutAdd").value;
  instance_AddressBook.addAddressToBook.sendTransaction(orgAdd, index1, toAddAddress, infos1, txnObject, function(error,result){
    document.getElementById("ABHashAdd1").value = (result);    
  });
};

document.getElementById("ABremoveAddress").onclick = function() {
  console.log("remove address");

  var orgAdd = document.getElementById("ABorgAdd2").value;
  var index1 = document.getElementById("ABindex2").value;
  var toremoveAddress = document.getElementById("ABtoremove").value;
  var indexOfAdd = document.getElementById("ABremoveIndex").value;
  var estimatedGas = 1000000;
  var txnObject = {
    from: web3.eth.coinbase,
    gas: estimatedGas  
  }
  instance_AddressBook.removeAddressFromBook.sendTransaction(orgAdd, index1, toremoveAddress, indexOfAdd, txnObject, function(error,result){
    document.getElementById("ABHashremove1").value = (result);    
  });
};

document.getElementById("ABregOrg").onclick = function() {
  console.log("reg Org first time");
  var txnObject = {
    from: web3.eth.coinbase  
  }
  var name = document.getElementById("ABorgname").value;
  var secAdd = document.getElementById("ABsecondAdd").value;

  instance_AddressBook.regOrg.sendTransaction(name, secAdd, txnObject, function(error,result){
    document.getElementById("ABHashReg").value = (result);    
  });
};

document.getElementById("ABaddIndex").onclick = function() {
  console.log("add index!");
  var txnObject = {
    from: web3.eth.coinbase
  }
  var newindex = document.getElementById("ABindexNew").value;
  var meaning = document.getElementById("ABindexMeaning").value;
  instance_AddressBook.addNewCategoryIndex.sendTransaction(newindex, meaning, txnObject, function(error,result){
    document.getElementById("ABHashremove1").value = (result);    
  });
};

document.getElementById("ABchangesecAdd").onclick = function() {
  var txnObject = {
    from: web3.eth.coinbase  
  }
  var orgA = document.getElementById("ABorgAddchange").value;
  var secAddnew = document.getElementById("ABnewsecondAdd").value;

  instance_AddressBook.changeSecMainAddress.sendTransaction(orgA, secAddnew, txnObject, function(error,result){
    document.getElementById("ABHashNewSec").value = (result);    
  });
};

 document.getElementById("ABregOrg").onclick = function() {
  console.log("reg Org first time");
  var name = document.getElementById("ABorgname").value;
  var secAdd = document.getElementById("ABsecondAdd").value;
  var txnObject = {
    from: web3.eth.coinbase  
  }
  instance_AddressBook.regOrg.sendTransaction(name, secAdd, txnObject, function(error,result){
    document.getElementById("ABHashReg").value = (result);    
  });
};

document.getElementById("ABaddAddress").onclick = function() {
  console.log("add address");
  var txnObject = {
    from: web3.eth.coinbase  
  }
  var orgAdd = document.getElementById("ABorgAdd1").value;
  var index1 = document.getElementById("ABindex1").value;
  var toAddAddress = document.getElementById("ABtoadd").value;
  var infos1 = document.getElementById("ABinfoAboutAdd").value;
  instance_AddressBook.addAddressToBook.sendTransaction(orgAdd, index1, toAddAddress, infos1, txnObject, function(error,result){
    document.getElementById("ABHashAdd1").value = (result);    
  });
};

document.getElementById("ABremoveAddress").onclick = function() {
  console.log("remove address");
  var txnObject = {
    from: web3.eth.coinbase  
  }
  var orgAdd = document.getElementById("ABorgAdd2").value;
  var index1 = document.getElementById("ABindex2").value;
  var toremoveAddress = document.getElementById("ABtoremove").value;
  var indexOfAdd = document.getElementById("ABremoveIndex").value;
  instance_AddressBook.removeAddressFromBook.sendTransaction(orgAdd, index1, toremoveAddress, indexOfAdd, txnObject, function(error,result){
    document.getElementById("ABHashremove1").value = (result);    
  });
};

document.getElementById("ABregOrg").onclick = function() {
  console.log("reg Org first time");
  var txnObject = {
    from: web3.eth.coinbase  
  }
  var name = document.getElementById("ABorgname").value;
  var secAdd = document.getElementById("ABsecondAdd").value;

  instance_AddressBook.regOrg.sendTransaction(name, secAdd, txnObject, function(error,result){
    document.getElementById("ABHashReg").value = (result);    
  });
};

document.getElementById("ABaddIndex").onclick = function() {
  console.log("add index!");
  var txnObject = {
    from: web3.eth.coinbase
  }
  var newindex = document.getElementById("ABindexNew").value;
  var meaning = document.getElementById("ABindexMeaning").value;
  instance_AddressBook.addNewCategoryIndex.sendTransaction(newindex, meaning, txnObject, function(error,result){
    document.getElementById("ABHashremove1").value = (result);    
  });
};

document.getElementById("ABchangesecAdd").onclick = function() {
  var txnObject = {
    from: web3.eth.coinbase  
  }
  var orgA = document.getElementById("ABorgAddchange").value;
  var secAddnew = document.getElementById("ABnewsecondAdd").value;

  instance_AddressBook.changeSecMainAddress.sendTransaction(orgA, secAddnew, txnObject, function(error,result){
    document.getElementById("ABHashNewSec").value = (result);    
  });
};

//document.getElementById("ABinfoChange1").onclick = function() {
  //var txnObject = {
  //  from: web3.eth.coinbase  
  //}
  //var orgAdd = document.getElementById("ABOrgInfochange").value;
  //var addressInfo = document.getElementById("ABselectedAdd").value;
  //var index = document.getElementById("ABchangeinfoIndex").value;
  //var newInfo = document.getElementById("ABsetnewInfo").value;
  //instance_AddressBook.changeInfoOfAddress.sendTransaction(orgAdd, index, addressInfo, newInfo, txnObject, function(error,result){
  //  document.getElementById("ABHashinfochange").value = (result);    
  //});
//};
 
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
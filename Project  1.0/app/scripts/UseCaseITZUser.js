console.log('UseCaseITZUser');

var instance_TCS ;

/*
* GETs
*/
document.getElementById("getOrg").onclick = function() {
    var add = document.getElementById("org1").value;
    instance_TCS .getOrganizationStatus.call(add,{}, function(error,result2){
         document.getElementById("org1").value = result2.toNumber();    
     });
  };
  
  document.getElementById("getOrgINfo").onclick = function() {
    var add =  document.getElementById("orgInfo").value;
    instance_TCS.getBasicOrganizationInfos.call(add, function(ee ,result){
      document.getElementById("orgInfo_status").value = result[0]  ;
      document.getElementById("orgInfo_organisationname").value = result[1] ;
      document.getElementById("orgInfo_officeaddress").value = result[2] ;
      document.getElementById("orgInfo_ethAdd").value = result[3] ;
      document.getElementById("orgInfo_webPage").value = result[4] ;
      document.getElementById("orgInfo_foundingYear").value = result[5] ;
      document.getElementById("orgInfo_numOfPostiveReports").value = result[6] ;
  
     });
  };
  
  document.getElementById("getAOrgINfoA").onclick = function() {
    var address =  document.getElementById("orgAddInfo231").value;
    instance_TCS.getadditionalInfos.call(address,{}, function(ee ,result){
      document.getElementById("orgAddInfo1").value = result[0]  ;
      document.getElementById("orgAddInfo2").value = result[1]  ;
      document.getElementById("orgAddInfo3").value = result[2]  ;
      document.getElementById("orgAddInfo4").value = result[3]  ;
      document.getElementById("orgAddInfo5").value = result[4]  ;
      document.getElementById("orgAddInfo6").value = result[5]  ;
     });
  };
   
  document.getElementById("getAnnReport").onclick = function() {
    var add =  document.getElementById("orgAddforReport").value;
    var year =  document.getElementById("reportYear").value;
    instance_TCS.getannualReport.call(add,year ,function(er, result){
      document.getElementById("resOrgAddforReport").value =  (result);
   
     });
  };
  
  document.getElementById("getDMaker").onclick = function() {
    var add =  document.getElementById("orgAddforDM").value;
    var name =  document.getElementById("nameOfDM").value;
    instance_TCS.getdecisionmaking.call(add,name ,function(er, result){
      document.getElementById("resOrgAddforDM").value =  (result);
  
     });
  };
  
  document.getElementById("getContactList").onclick = function() {
    var add =  document.getElementById("orgAddforCL").value;
    var name =  document.getElementById("nameOfContact").value;
    instance_TCS.getContactList.call(add,name ,function(er, result){
      document.getElementById("resOrgAddforCL").value =  (result);
     });
  };
    
  document.getElementById("gettokenStatusOrgAddrBtn").onclick = function() {
    var addr =  document.getElementById("gettokenStatusOrgAddrId").value;
    instance_TCS.getTokenStatus.call(addr, function(er, result){
      document.getElementById("gettokenStatusvaluerId").value =  (result);
     });
  };

  document.getElementById("getVC222").onclick = function() {
    var orgAddN =  document.getElementById("reportedOrgAdd222").value;
    instance_TCS.getVotingContractOfOrg.call(orgAddN, function(error ,result){    
      document.getElementById("returnVCaddress").value = result;
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
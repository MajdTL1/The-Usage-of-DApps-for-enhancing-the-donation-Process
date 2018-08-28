pragma solidity ^0.4.23;

import "./DonationTokenOrg.sol";
import "./FaiToken.sol";
import "./VaultOrg.sol";

contract ProjectOrg {

    // hard coded for every Project
    address owner = 0x57F62bf8531672814B906Bb38971E992ff22Ce28;
    
    // address of the related Contracts 
    address public managementOrg = 0x3f826e9555370dd06dd46f67c89bcc97d2b6e1dc;
    address public dTContract = 0xbfd0c2b508af2b14d85d2e0c94b5341cdada27ec;
    address public faiContract = 0x43ddcbc37fb400976be522e20098a15ac846d044;
    address public vaultContract = 0x4a8db8aef091afc6b71fd617d200e0922368b15c;

    string public name;
    string public location;
    uint256 public startTime; 
    string public webPage;  
    bool public active;
  
    modifier onlyOwner(){
        if(msg.sender == owner){
            _;
        }else{
            revert();
        }
    }

    constructor(string _name, string _webPage, string _location) public {
        active = true;
        name = _name; 
        location = _location;
        webPage = _webPage;
        startTime = block.timestamp;
    }

    /**
     transfers a specific Donation-Token  
     @notice only the owner of the project can transfer token
     @param _to The address of the recipient
     @param _id The Id of token to be transferred
    */
    function transferTokens(address _to, uint256 _id) public onlyOwner {
        DonationTokenOrg token = DonationTokenOrg(dTContract);
        token.transfer(_to, _id);
    }

    /**
     transfers Fai Tokens  
     @notice only the owner can transfer token
     @param _to The address of the recipient
     @param _amount The amount to be transferred
    */
    function transferFaiTo(address _to, uint256 _amount) public onlyOwner {
        FaiToken fai = FaiToken(faiContract);
        fai.transfer(_to, _amount);
    }

    /**
     Split donation Token  
     @notice only the owner can split token
     @param _valueOne  the new value of the original Token
     @param _valueTwo  the value of the new Token
     @param _tokenId the Id of the burned Token
    */
    function splitToken(uint256 _tokenId, uint256 _valueOne, uint256 _valueTwo) public onlyOwner {
        DonationTokenOrg token = DonationTokenOrg(dTContract);
        token._split(_tokenId, _valueOne, _valueTwo);
    }

   /**
     change the status of the project 
     @notice only the ManagementOrg contract invoke this function
    */
    function changeStatus() external {
        require(msg.sender == managementOrg);
        active = !active;
    }

    function getStatus() view public returns (bool) {
        return active;
    }

    //set addresses of the contracts.  
    function setDTContract(address _add) public onlyOwner {
        dTContract = _add;
    }

    function setFaiContract(address _add) public onlyOwner {
        faiContract = _add;
    }

    function setVaultContract(address _add) public onlyOwner {
        vaultContract = _add;
    }

    function setManagementOrg(address _add) public onlyOwner {
        managementOrg = _add;
    }

}
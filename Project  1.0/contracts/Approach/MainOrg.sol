pragma solidity ^0.4.23;

import "./DonationTokenOrg.sol";
import "./FaiToken.sol";
import "./ManagementOrg.sol";

contract MainOrg {

    //hardcoded for each organization
    address public owner = 0xf62fef864D88e3d70F22468EEe3B412b67114946;

    //hardcoded for easy testing, can be changed and set through functions
    address public dTContract = 0xbfd0c2b508af2b14d85d2e0c94b5341cdada27ec;
    address public faiContract = 0x43ddcbc37fb400976be522e20098a15ac846d044;
    address public vaultContract = 0x4a8db8aef091afc6b71fd617d200e0922368b15c;
    address public managementContract = 0x3f826e9555370dd06dd46f67c89bcc97d2b6e1dc;

    uint256 currentCost = 1000;

    uint256 public faiBalance;

    modifier onlyOwner(){
        if(msg.sender == owner){
            _;
        }else{
            revert();
        }
    }
    
    event ChangedCost(uint256 _newCost, uint256 _time);

    /**
     send the amount of Ether you want to donate and get a token 
     @dev there should be a min limit to cover the transaction fee (i think it should be changeable)
     @notice the user "should" check the amount of Dai that is avialable in this contract before the donation, he could do that by calling the refreshbalance methode 
        or getBalance in the FaiToken, if there is no Fai in the contract, then he will lose some gas invoking the method
    */
    function donateEther() public payable returns (uint256 _tokenId) {
        refreshBalance();
        require(msg.value >= 0.05 ether, "not enough ether");
        uint256 i = (msg.value * currentCost);
        uint256 v = i/1000000000000000000; 
        //require(v <= faiBalance, "need more Fai");  
        transferFaiTo(vaultContract, v);
        refreshBalance();
        _tokenId = mintTokens(msg.sender, v);
    }

    /**
     mint a new Token when Ether is donated 
     @dev internal function
     @param _to The address of the recipient 
     @param _value The value of the minted Token
    */
    function mintTokens(address _to, uint256 _value) internal returns (uint256 _tokenid) {
        DonationTokenOrg token = DonationTokenOrg(dTContract);
        _tokenid = token._mint(_to, _value);
    }

    /**
     add a Project which need money to the management contract
     @notice onlyOwner can invoke it
     @param _addr The address of the project 
     @param _amount The amount of money does the project need
    */
    function addProjectinNeed(address _addr, uint256 _amount) public onlyOwner {
        ManagementOrg m = ManagementOrg(managementContract);
        m.addProject(_addr, _amount);
    }

    /**
     transfers Fai Tokens  
     @notice internal Function can only be called when someone donate Ether
     @param _to The address of the recipient(Vault contract)
     @param _amount The amount to be transferred
    */
    function transferFaiTo(address _to, uint256 _amount) internal {
        FaiToken fai = FaiToken(faiContract);
        fai.transfer(_to, _amount);
    }
 
    //is usefull???
    function withdrawFai(uint _amount, address _to) public onlyOwner {
        FaiToken fai = FaiToken(faiContract);
        fai.transferFrom(this, _to, _amount);
        refreshBalance();
    }

    //refresh the balance, actully not neccessary, people can see the balance from the Fai contract
    function refreshBalance() public {
        FaiToken fai = FaiToken(faiContract);
        faiBalance = fai.balanceOf(this);
    }

    //set addresses of the contracts.. 

    function setDTContract(address _add) public onlyOwner {
        dTContract = _add;
    }

    function setFaiContract(address _add) public onlyOwner {
        faiContract = _add;
    }

    function setVaultContract(address _add) public onlyOwner {
        vaultContract = _add;
    }
    
    function setManagementContract(address _add) public onlyOwner {
        managementContract = _add;
    }
       
    function setcurrentCost(uint256 _currentCost) public onlyOwner {
        currentCost = _currentCost; 
        refreshBalance();
        emit ChangedCost(currentCost, now);
    }

    function withdrawEther() public onlyOwner {
        msg.sender.transfer(address(this).balance);
    }
}
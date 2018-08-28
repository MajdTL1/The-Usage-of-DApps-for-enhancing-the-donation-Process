pragma solidity ^0.4.23;

import "./DonationTokenOrg.sol";
import "./FaiToken.sol";
import "../UseCase/AddressBook.sol";

contract VaultOrg {

    //hardcoded for each organization
    address public owner = 0xf62fef864D88e3d70F22468EEe3B412b67114946;
    //hardcoded for easy testing, can be changed and set through functions
    address public dTContract = 0xbfd0c2b508af2b14d85d2e0c94b5341cdada27ec;
    address public faiContract = 0x43ddcbc37fb400976be522e20098a15ac846d044;
    address public addrBookContract = 0xd61293b0e98fc8439976d89333261739e7d02d81;

    modifier onlyOwner(){
        if(msg.sender == owner){
            _;
        }else{
            revert();
        }
    }

    event UnlockedFai(address indexed _from, uint256 indexed _tokenId, address indexed _orgAdd);

    constructor() public {
    }

    /**
     check if the address, which unlock the Dai is valid 
     @dev   Internal function
     @notice the address should be registerd in the addressbook contract
     @param _orgAdd  The Address of the orginal Organisation 
     @param _category The category in which the msg.sender registerd
     @param _idxOf at which Index in the array is the msg.sender 
    */
    function checkAddress(address _orgAdd, uint _category, uint _idxOf) view public returns(bool) {
        AddressBook b = AddressBook(addrBookContract);
        return b.checkEofAddress(_orgAdd, msg.sender, _category, _idxOf);
    }

    /**
     unlock the dai and send it to the msg.sender  
     @notice the address should be registerd in the addressbook contract
     @dev   the first line is where the orgAdd should be changed 
     @param _tokenId The Id of the Token
     @param _orgAdd  The Address of the orginal Organisation 
     @param _category The category in which the msg.sender registerd
     @param _idxOf at which Index in the array is the msg.sender 
    */
    function unlockFai(uint256 _tokenId, address _orgAdd, uint _category, uint _idxOf) external {
        require(_orgAdd == 0xf62fef864D88e3d70F22468EEe3B412b67114946);
        require(checkAddress(_orgAdd, _category, _idxOf)); 
        DonationTokenOrg dtToken = DonationTokenOrg(dTContract);
        dtToken.transfer(this, _tokenId);
        FaiToken faiToken = FaiToken(faiContract);
        faiToken.transfer(msg.sender, dtToken.getValue(_tokenId));
        dtToken._burn(_tokenId, this);
        emit UnlockedFai(msg.sender, _tokenId, _orgAdd);
    }
 
    // set the related Addresses
    function setDTContract(address _add) public onlyOwner {
        dTContract = _add;
    }

    function setFaiContract(address _add) public onlyOwner {
        faiContract = _add;
    }

    function setaddrBookContract(address _add) public onlyOwner {
        addrBookContract = _add;
    }

}
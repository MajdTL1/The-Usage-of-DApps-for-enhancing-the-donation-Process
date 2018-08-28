pragma solidity ^0.4.23;

import "./ProjectOrg.sol";
import "./DonationTokenOrg.sol";
import "./MainOrg.sol";

contract ManagementOrg {

    //hardcoded for each organization
    address owner = 0xf62fef864D88e3d70F22468EEe3B412b67114946;
    
    //hardcoded for easy testing, can be changed and set through functions
    address public dTContract = 0xbfd0c2b508af2b14d85d2e0c94b5341cdada27ec;
    address public mainOrgContract = 0x601f186d8c2171b78766924af4614f56f94711b1;

    //in this array are the project which currently need money
    address[] projectsArray;

    mapping (address => uint256) public  projectNeedMap;
    mapping (address => uint256) public indexInArray;

    modifier onlyOwner(){
        if(msg.sender == owner){
            _;
        }else{
            revert();
        }
    }

    constructor() public{
        projectsArray = new address[](1);
        projectsArray[0] = 0x0;
    }

    /**
     Add a project in need, to enable a direct donation for it
     @notice only the owner can call this function
     @param _addr The address of the project
     @param amount The amount to money is needed
    */
    function addProject(address _addr, uint256 amount) public {
        require(msg.sender == mainOrgContract || msg.sender == owner);
        require(projectNeedMap[_addr] == 0);
        require(indexInArray[_addr] == 0);
        projectsArray.push(_addr);
        projectNeedMap[_addr] = amount;
        indexInArray[_addr] = projectsArray.length - 1;
    }

 
    /**
     donate to a project in need 
     @notice this function is just for the first donation of each token
     @param _addr The address of the project
     @param _tokenId The id of the Token  
    */
    function donateToProject(address _addr, uint256 _tokenId) public returns(uint256 idx) {
        require(projectNeedMap[_addr] > 0);
        DonationTokenOrg dtoken = DonationTokenOrg(dTContract);
        uint256 v = dtoken.getValue(_tokenId);
        require(v <= projectNeedMap[_addr]);
        projectNeedMap[_addr] = projectNeedMap[_addr] - v;
        dtoken.setdonated(_tokenId);
        idx = dtoken.transfer(_addr, _tokenId);
    }

 
    /**
     remove a project from the need Array 
     @notice anyone can call it, project will be remove iff the amount of need equal to null
     @param _addr The address of the project
    */
    function removeProject(address _addr) public {
        require(projectNeedMap[_addr] == 0);
        require(indexInArray[_addr] != 0);
        uint256 _idx = getidxOfProject(_addr);
        delete projectsArray[_idx];
        indexInArray[_addr] = 0;
    }

    /**
     transfer Token in case a doanter missed the free donationTime 
     @notice only the owner can call it, and it only donate to a project in need
     @param _addr The address of the project
     @param _tokenId The id of the Token  
    */
    function transerDToken(address _addr, uint256 _tokenId) public onlyOwner {
        DonationTokenOrg dtoken = DonationTokenOrg(dTContract);
        uint256 v = dtoken.getValue(_tokenId);
        require(v <= projectNeedMap[_addr]);
        projectNeedMap[_addr] = projectNeedMap[_addr] - v;
        dtoken.setdonated(_tokenId);
        dtoken.transfer(_addr, _tokenId);
    }

   //get methods
    function getidxOfProject(address _addr) public view returns(uint256) {
        return indexInArray[_addr]; 
    }

    function getNeedof(address _addr) public view returns(uint256) {
        return projectNeedMap[_addr];
    }

    function getProjects() public view returns (address[]) {
        return projectsArray;
    }

    function changeStatusofPorject(address _addr) public onlyOwner {
        ProjectOrg p = ProjectOrg(_addr);
        p.changeStatus();
    }

    //set the related addressest
    function setDTContract(address _add) public onlyOwner {
        dTContract = _add;
    }

    function setmainOrgContract(address _add) public onlyOwner {
        mainOrgContract = _add;
    }
 
}
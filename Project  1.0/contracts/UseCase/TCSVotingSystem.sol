pragma solidity ^0.4.23;

import "./TransparentCivilSociety.sol";

contract TCSVotingSystem {
 
    //the address of TCS contract
    address public mainContract ;
    //the address of Owner
    address public managerTSC = 0xf62fef864D88e3d70F22468EEe3B412b67114946 ; 
    uint256 public timeNowV = now;
    mapping (address => bool) public orgReportedMap;
    mapping (address => uint256) public votingTime;   
    //to control the voting
    mapping (address => bool) public alreadyVoted;
    mapping (uint => address) public recordVoter;
    
    uint256 public voteCounter = 1;
    uint256 public reward ;
    bool voteEnd;
    //vote counting 
    mapping(address => uint8) public managerVote; 
    mapping(address => uint) public numOfVoterOrg;
    mapping(address => uint) public numOfVoterUser;
    mapping(address => uint) public numPosVoteOrg;
    mapping(address => uint) public numPosVoteUser;
 
    mapping (address => uint) public  voteResult;
    
    modifier onlyOwner(){
        if (msg.sender == managerTSC) {
            _;
        }else {
            revert();
        }
    }
    
    // Constructor
    constructor(address _add) public {
        mainContract = _add;
        recordVoter[0] = managerTSC;
    }

    //fallback function
    function () public {
        revert();
    }  

    //get information about the voting event of an organisation
    function getvotingTime (address _add) public view returns (uint256) {
        return votingTime[_add];
    }

    function isOrgReported (address _add) public view returns (bool) {
        return orgReportedMap[_add];
    }

    function resultOfVoting (address _add) public view returns (uint) {
        return voteResult[_add];
    }
  
    
    /**
    @notice will init the voting vars and set time after checking the conditions
    @dev    the values are in the main contract
    @param _orgadd the Address of the organisation 
    */
    function startVotingProcess (address _orgadd) external payable {
        require(msg.value == 0.7 ether);
        require(msg.sender == mainContract);
        orgReportedMap[_orgadd] = true;
        votingTime[_orgadd] = timeNowV + 3 minutes;
    }
    
    /**
    @notice for normal users, calc the user votes and give points based on the percentage
    @dev    internal function
    @param _add the Address of the organisation 
    */
    function calcUserPoints (address _add) internal view returns (uint) {
        uint userPoints;
        if (numOfVoterUser[_add] == 0) {
            return 2;
        }
        uint userPerc = divP(numPosVoteUser[_add],numOfVoterUser[_add]);
        if (userPerc >= 90) {
            userPoints = 4;
        } else if (userPerc >= 80) {
            userPoints = 3;
        } else if (userPerc >= 70) {
            userPoints = 2;
        } else if (userPerc >= 60) {
            userPoints = 1;
        }
        return userPoints;
    }
    
    /**
    @notice for organisations, calc the votes and give points based on the percentage
    @dev    internal function
    @param _add the Address of the organisation 
    */
    function calcOrgPoints (address _add) internal view returns(uint) {
        uint orgPoints;
        if (numOfVoterOrg[_add] == 0) {
            return 2;
        }
        uint orgPerc = divP(numPosVoteOrg[_add],numOfVoterOrg[_add]);
        if (orgPerc >= 90) {
            orgPoints = 5;
        } else if (orgPerc >= 80) {
            orgPerc = 4;
        } else if (orgPerc >= 70) {
            orgPoints = 3;
        } else if (orgPerc >= 60) {
            orgPoints = 2;
        } else if (orgPerc >= 50) {
            orgPoints = 1;
        }
        return orgPoints;
    }
    
    /**
    @notice after the time is over, this function will calc the points and invoke the methode
            in the other contract which will change the status depends on the results
    @param _add the Address of the organisation 
    */
    function calculatePoints(address _add) public returns (uint) {
        require(block.timestamp > votingTime[_add]);
        require(orgReportedMap[_add] == true);
        uint iTZPoints;
        if (managerVote[_add] == 1) {  //trusted
            iTZPoints = 5; 
        }else if (managerVote[_add] == 2) {  //not trusted
            iTZPoints = 0; 
        }else {
            iTZPoints = 2;
        }
        uint result = iTZPoints + calcUserPoints(_add) + calcOrgPoints (_add);
        orgReportedMap[_add] = false;   
        TransparentCivilSociety tcs = TransparentCivilSociety(mainContract);
        if (result >= 8) {
            tcs.changeStatusFromVoting(_add, 2);
        } else {
            tcs.changeStatusFromVoting(_add, 4);
        }
        voteResult[_add] = result;
        rewardVoters();
        return result;
    }
 
    /*
        Voting section
        voting with yes mean the data of the org are complete & mostly correct
    */

    /**
    @notice user can vote one time with true or false 
    @param _add the Address of the organisation 
    @param _vote true mean trusted, false mean not trusted
    */
    function voteUser(address _add, bool _vote) public {
        require(now <= votingTime[_add]);
        require(alreadyVoted[msg.sender] == false);
        if (orgReportedMap[_add] == true) {
            alreadyVoted[msg.sender] = true;
            recordVoter[voteCounter] = msg.sender;
            voteCounter++;
            numOfVoterUser[_add] += 1;
            if (_vote) {
                numPosVoteUser[_add] += 1;
            } else {
                numPosVoteUser[_add] = numPosVoteUser[_add];
            }
        } else {
            revert();
        }
    }
    
    /**
    @notice Org can vote one time with true or false 
    @param _add the Address of the organisation 
    @param _vote true mean trusted, false mean not trusted
    */
    function voteOrg(address _add,bool _vote) public {
        require(now <= votingTime[_add]);
        require(alreadyVoted[msg.sender] == false);
        TransparentCivilSociety tcs = TransparentCivilSociety(mainContract);
        uint s = tcs.getOrganizationStatus(msg.sender);
        if (s == 2 && orgReportedMap[_add] == true) {
            alreadyVoted[msg.sender] = true;
            recordVoter[voteCounter] = msg.sender;
            voteCounter++;
            numOfVoterOrg[_add] += 1;
            if (_vote) {
                numPosVoteOrg[_add] += 1;
            }else {
                numPosVoteOrg[_add] = numPosVoteOrg[_add];
            }
        } else {
            revert();
        }
    }

    /**
    @notice the vote of the Owner
    @param _add the Address of the organisation 
    @param vote with number 1 for trusted and number 2 for untrusted
    */
    function voteTCS(address _add, uint8 vote) public onlyOwner {
        require(now <= votingTime[_add]);
        if (orgReportedMap[_add] == true && alreadyVoted[msg.sender] == false) {
            alreadyVoted[msg.sender] = true;
            managerVote[_add] = vote;
        }
    }
    // END voting section
    
    /**
    @notice get the reward for voting after the end of the votingtime
    @dev    there is no easy/free way to loop all the voter and send them the reward, that is why they should withdraw it by themself
            voteEnd will be True only after the vote is finished and the result and reward is calculated 
    */
    function getReward() public {
        require(voteEnd);
        require(alreadyVoted[msg.sender] == true);
        alreadyVoted[msg.sender] = false;
        msg.sender.transfer(reward);
    }
    
    // get the reward value
    function getRewardValue() public view returns (uint256){
        return reward;
    }

    function rewardVoters() internal{
        reward = (0.7 ether) / (voteCounter);
        voteEnd = true;
    }
  
    //help functions
    function divP(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = (a*100) / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }
      
}
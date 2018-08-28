pragma solidity ^0.4.23;

import "./TCSVotingSystem.sol";

contract TransparentCivilSociety {

    // management owner
    address public managerTCS ;

    //mapping a reported Org with the related generated votingcontract
    mapping (address => address) public votingCAddress;

    struct Organization1 {
        //1.Pending , 2.verified, 3.underInvestigation, 4.untrusted, 6.failed
        uint status;
        uint256 orgBala;
        //P1.
        bool verifiedToken;
        string registeredName;
        address ethAddress; // which is used by AddressBook contract as the main Address
        string officeAddress;
        string webPage;     //where the information are provided
        mapping (string => string) contactlist;     //map name -> phoneNumber or email
        uint foundingYear;
        uint256 registrationDate;
    }
    
    struct Organization2 {
        //P2. Complete Charter and information about the organisation’s mission
        bytes32 mission;
        //P3. Tax exempt status
        bytes32 certificate;
        //P4. Name und Function of main decision-making bodies
        mapping(string => bytes32) decisionmaking; // mapping  name -> hash of the functionality of that person or his infos
        //P5. Annual Report
        mapping (uint => bytes32) annualReport; // mapping year => hash of the doc
        //P6. Organisation personnelStructure
        bytes32 personnelStructure;  
        //P7. Funding + P8. Allocation of Resources, 
        bytes32 currentResource;  
        //P9.  Institutional Relationships
        bytes32 institutionallist;
        //P10. Name of legal entities, contributing with more than 10 per cent to the organisation’s budget
        bytes32 legalentities; 
    }
    // mapping an organisation with its address
    mapping (address => Organization1) public organisationMap1;
    mapping (address => Organization2) public organisationMap2;
    //mapping Address of the reported organisation -> Address of the user who reported it
    mapping (address => address) public reportedbyUser; 

    event RegistrationRequests(address indexed orgransationAdd, uint indexed timeRR);
    event ModifiedData(address indexed _add, uint256 indexed timeM);
    event ReportedbyStake(address indexed _add, uint256 time);
    event RegistrationAccept(address indexed  orgransationAdd, uint256 timeA);
    event RegistrationReject(address indexed  orgransationAdd, uint256 timeR);
    event ChangingStatus(address indexed  orgransationAdd, uint indexed status, uint indexed timeC );

    modifier onlyOwner(){
        if (msg.sender == managerTCS) {
            _;
        }else {
            revert();
        }
    }
    
    // Constructor
    constructor() public {
        managerTCS = msg.sender;
    }
    
    //fallback function
    function () public {
        revert();
    }  

    /**
    Register an Org in the contract
    @notice payable function
    @dev    event RegistrationRequests
    @param _registeredName the registered name of the organisation
    @param _officeAddress the offical Address of the organisation
    @param _webPage the webPage where the Points are showen
    @param _contactName a person name
    @param _contactPhone email or Phone
    @param _foundingYear the founding year
    */
    function registration(
        string _registeredName,
        string _officeAddress,
        string _webPage,
        string _contactName,
        string _contactPhone,
        uint _foundingYear
    )
        payable public 
    {
        Organization1 storage org = organisationMap1[msg.sender];
        require(msg.value == 1.8 ether);
        require(org.status != 3);
        managerTCS.transfer(0.4 ether);
        org.orgBala = 1.4 ether;
        org.registrationDate = block.timestamp;
        org.status = 1;
        org.registeredName = _registeredName;
        org.ethAddress = msg.sender;
        org.officeAddress = _officeAddress;
        org.webPage = _webPage;
        org.contactlist[_contactName] = _contactPhone;
        org.foundingYear = _foundingYear;
        emit RegistrationRequests(msg.sender, block.timestamp);
    }
    
    /**
    @notice not payable function, input should start with "0x", they can change one or more information without changing the others
    @dev    event ModifiedData
    @param _mission hash of Complete Charter and information about the organisation’s mission
    @param _certificate hash of Tax exempt status
    @param _personnelStructure hash of the Organisation personnelStructure
    @param _currentResource hash of Funding + Allocation of Resources
    @param _institutionallist hash of Institutional Relationships
    @param _legalentities hash of the legal entities, contributing with more than 10 per cent to the organisation’s budget
    */
    function setAdditionalInfo(
        bytes32 _mission,
        bytes32 _certificate,
        bytes32 _personnelStructure,
        bytes32 _currentResource,
        bytes32 _institutionallist,
        bytes32 _legalentities
    ) 
        public 
    { 
        Organization2 storage org = organisationMap2[msg.sender];
        if (_mission != 0) {
            org.mission = _mission;
        }
        if (_certificate != 0) {
            org.certificate = _certificate; 
        }
        if (_personnelStructure != 0) {
            org.personnelStructure = _personnelStructure;
        }
        if (_currentResource != 0) {
            org.currentResource = _currentResource;
        }
        if (_institutionallist != 0) {
            org.institutionallist = _institutionallist;
        }
        if (_legalentities != 0) {
            org.legalentities = _legalentities;
        }
        emit ModifiedData(msg.sender, block.timestamp);
    }
    
    /**
    add the name and info of a decisionMaker
    @notice not payable function, input (_functions) should start with "0x"
    @dev    event ModifiedData
    @param _name name of the decisionmaker 
    @param _functions hash of the role and function of this person
    */
    function setDecisionmaker( string _name, bytes32 _functions) public {
        Organization2 storage org = organisationMap2[msg.sender];
        org.decisionmaking[_name] = _functions;
        emit ModifiedData(msg.sender, block.timestamp);
    }

    /**
    add AnnualReport of a year
    @notice not payable function, input (_annualReport) should start with "0x" 
    @dev    event ModifiedData
    @param _year the year of the AnnualReport
    @param _annualReport hash of the AnnualReport in that year
    */
    function setAnnualReport( uint _year, bytes32 _annualReport) public {
        Organization2 storage org = organisationMap2[msg.sender];
        org.annualReport[_year] = _annualReport;
        emit ModifiedData(msg.sender, block.timestamp);
    }

    /**
    add contactList
    @notice not payable function
    @dev    event ModifiedData
    @param _name name of the contact person in the organisation
    @param _phoneNumber number or email
    */
    function setContactList(string _name, string _phoneNumber) public {
        Organization1 storage org = organisationMap1[msg.sender];
        org.contactlist[_name] = _phoneNumber;
        emit ModifiedData(msg.sender, block.timestamp);
    }
    
    /**
    close the Account
    @notice send the rest of the balance back
    @dev    the organization should be in status 2
    */
    function closeAccount() public {
        Organization1 storage org = organisationMap1[msg.sender];
        require(org.status == 2);
        org.verifiedToken = false;
        org.status = 0;
        org.webPage = "";
        org.registeredName = "closed";
        uint256 fund = org.orgBala;
        org.orgBala = 0 ether;
        (org.ethAddress).transfer(fund);
        org.ethAddress = 0x0;
        org.officeAddress = "";
        fund = 0 ether;
    }
    

    /* SECTION  GET */

    /**
    return the number or email of a person
    @notice view function 
    @param _add the Address of the organisation 
    @param _name name of the person in that organisation
    */
    function getContactList(address _add, string _name) view public returns (string) {
        Organization1 storage org = organisationMap1[_add];
        return org.contactlist[_name];
    }
    
    /**
    return Basic Information
    @notice view function 
    @param _add the Address of the organisation
    */
    function getBasicOrganizationInfos(address _add) view public 
        returns(
            uint _status, 
            string _organisationname, 
            string _officeaddress, 
            address _ethAdd, 
            string _webPage, 
            uint _foundingYear, 
            uint256 _b) 
        {
        Organization1 storage org = organisationMap1[_add];
        _status = org.status;
        _organisationname = org.registeredName;
        _officeaddress = org.officeAddress;
        _ethAdd = org.ethAddress;
        _webPage = org.webPage;
        _foundingYear = org.foundingYear;
        _b = org.orgBala;
        return ( _status, _organisationname, _officeaddress, _ethAdd, _webPage, _foundingYear, _b);
    }

    /**
    return the status of the organisation
    @notice view function
    @param _add the Address of the organisation
    */
    function getOrganizationStatus(address _add) public view returns (uint) {
        Organization1 storage org = organisationMap1[_add];
        return org.status ;
    }

    /**
    return the hash of the functionality of aspecfice person
    @notice view function
    @param _add the Address of the organisation
    @param _name the name of the decisionmaker
    */
    function getdecisionmaking(address _add, string _name) public view returns (bytes32) { 
        Organization2 storage org = organisationMap2[_add];
        return org.decisionmaking[_name];
    }

    /**
    return the hash of AnnualReport in a specfice year 
    @notice view function
    @param _add the Address of the organisation
    @param _year the year of the AnnualReport
    */
    function getannualReport(address _add, uint _year) public view returns (bytes32) {
        Organization2 storage org = organisationMap2[_add];
        return org.annualReport[_year];
    }

    /**
    return hashs of the Additional Information  
    @notice view function
    @param _add the Address of the organisation
    */
    function getadditionalInfos(address _add) public view returns (bytes32, bytes32, bytes32, bytes32, bytes32, bytes32) {
        Organization2 storage org = organisationMap2[_add];
        return (org.mission, org.certificate, org.personnelStructure, org.currentResource, org.institutionallist, org.legalentities);
    }

    /**
    get the voting address for the Org, which is under inv.      
    @notice view Function, will be used to use the related Voting contract
    @param _orgAdd the Address of the organisation
    */
    function getVotingContractOfOrg(address _orgAdd) view public returns(address){
        return votingCAddress[_orgAdd];
    }


    /**
    get if the smart contracts of the Tokens are verfied
    @param _orgAdd the Address of the organisation
    @return if the token contracts are verfied
    */
    function getTokenStatus(address _orgAdd) view public returns(bool){
        Organization1 storage org = organisationMap1[_orgAdd];
        return org.verifiedToken;
    }

   // END SECTION GETs
    

    /* SECTION Report */
    
    /**
    forces an Investigation and start a voting process
    @notice pay 0.7 as fund and if the report was right, the user git a reward + his funds back 
    @dev    payable, event ReportedbyStake
    @param _reportedAdd the Address of the organisation
    */
    function reportWithFund(address _reportedAdd) public payable {
        require (msg.value == 0.7 ether);
        require (votingCAddress[_reportedAdd] == 0x00);
        Organization1  storage org = organisationMap1[_reportedAdd];
        require(org.status == 2);
        TCSVotingSystem tscV = new  TCSVotingSystem(this);
        votingCAddress[_reportedAdd] = tscV;
        if (reportedbyUser[_reportedAdd] == 0x00) {
            org.status = 3;
            reportedbyUser[_reportedAdd] = msg.sender;
            tscV.startVotingProcess.value(0.7 ether)(_reportedAdd);
        }
        emit ReportedbyStake(_reportedAdd, now);
    }
    // //  END SECTION Report
      


    /* SECTION Management methods */
    
    /**
    Accept the request of an Organisation
    @notice only the owner can invoke it
    @dev    event RegistrationAccept
    @param _acceptedorgaddress the Address of the organisation
    */
    function acceptRegRequest(address _acceptedorgaddress) public onlyOwner {
        Organization1 storage org = organisationMap1[_acceptedorgaddress];
        require(org.status == 1);
        org.status = 2;
        emit RegistrationAccept(_acceptedorgaddress, now);
    }
   
    /**
    reject the request of an Organisation, will give 1.4 back of the 1.8
    @notice will give 0.14 back of 0.18, only the owner can invoke it
    @dev    event RegistrationReject
    @param _rejectedorgaddress the Address of the organisation
    */
    function rejectRegRequest(address _rejectedorgaddress) public onlyOwner {
        Organization1 storage org = organisationMap1[_rejectedorgaddress];
        require(org.status == 1);
        org.status = 6;
        org.orgBala = 0 ether;
        _rejectedorgaddress.transfer(1.4 ether);
        emit RegistrationReject(_rejectedorgaddress, now);
    }

    /**
    set the status of the token smart contracts
    @param _orgAdd the Address of the organisation
    @param _status the status of the contracts
    */
    function setverfiedToken(address _orgAdd, bool _status) public onlyOwner {
        Organization1 storage org = organisationMap1[_orgAdd];
        org.verifiedToken = _status;
    }
    
    /**
    will change the status of an Org depends on the voting result
    @notice only the votingcontract can invoke it
    @dev    event ChangingStatus
    @param _add the Address of the organisation
    @param _s the new status of the organisation
    */
    function changeStatusFromVoting(address _add, uint _s) public {
        require(msg.sender == votingCAddress[_add]);
        Organization1  storage org = organisationMap1[_add];
        require(org.status == 3);
        votingCAddress[_add] = 0x0;
        org.status = _s;
        if (org.status == 4) {
            address rewardAdd = reportedbyUser[_add];
            reportedbyUser[_add] = 0x0;
            org.orgBala = 0;
            rewardAdd.transfer(1.4 ether);
        }else {
            reportedbyUser[_add] = 0x0;
        }
        emit ChangingStatus(_add, _s, now);
    }
    // // // END SECTION Management methods
    
}
pragma solidity ^0.4.23;

contract AddressBook{
    
    address owner = 0xf62fef864D88e3d70F22468EEe3B412b67114946;

    struct Organization{
        string name;
        address[2] mainAddress;
    }
    
    //Categories: 1 TokenContracts, 2 projects, 3 moneyAdministration, 4 employees, 5 investors ....
    mapping(uint => string) public categoryIndex; 
    //orgAddress => (OrgName & 2 main address)
    mapping (address => Organization) public organizationMap;
    // orgAddress => categoryIndex(category) => newaddress
    mapping (address => mapping( uint => address[])) public addBookMap;
    // orgAddress => address => index(category) => infoAboutAddress
    mapping (address => mapping(address => mapping(uint => string))) public addressInfo;
    //index of address in the array in its category
    mapping (address => mapping(address => mapping(uint => uint))) indexOfElement;

    event AddressAddEvent(address indexed  orgransationAdd, address indexed addedAddress, uint indexed timeC );
    event AddressRemoveEvent(address indexed  orgransationAdd, address indexed removedAddress, uint indexed timeC );
    //constructor
    constructor () public {
        categoryIndex[1] = "Token Contracts";
        categoryIndex[2] = "projects";
        categoryIndex[3] = "moneyAdministration";
        categoryIndex[4] = "employees";
        categoryIndex[5] = "investors";
    }
    
    //get Methods, all constant
    function getIndexof(address _orgAdd, uint _index, address _toAddAddress) view public returns (uint) {
        return indexOfElement[_orgAdd][_toAddAddress][_index];
    }
    
    function getInfoOf(address _orgAdd, uint _index, address _ofAddress) view public returns (string) {
        return addressInfo[_orgAdd][_ofAddress][_index];
    }
    
    function getcategoryIndex(uint _idx) public view returns (string) {
        return categoryIndex[_idx];
    }
    
    function iterateArrayOf(address _orgAdd, uint _index) view public returns (address[]) {
        return addBookMap[_orgAdd][_index];
    }
    
    /**
    resgister the name and the two main addresses of an organization
    @dev    it is not preferd to hardcode the test wether the Org is already registered in the TSC contract or not
    @param _name the offical name of the organisation. should not be null
    @param _secMainAdd a sec address, which can change data. should not be null
    */
    function regOrg (string _name, address _secMainAdd) public {
        require(bytes(_name).length != 0);
        require(_secMainAdd != 0x0);
        Organization storage org = organizationMap[msg.sender];
        require(bytes(org.name).length == 0);
        org.name = _name;
        org.mainAddress[0] = msg.sender;
        org.mainAddress[1] = _secMainAdd;
    }
    
    /**
    add an address to the organization address-book
    @dev    the first element in the array is always 0x00 to prevent duplicate 
    @param _orgAdd the orignal address of the organisation
    @param _index  to which category belong that address
    @param _toAddAddress the new address
    @param _info infomation about the address
    */
    function addAddressToBook (address _orgAdd, uint _index, address _toAddAddress, string _info) public {
        Organization storage org = organizationMap[_orgAdd];
        require(msg.sender == org.mainAddress[1] || msg.sender == org.mainAddress[0]);
        require(bytes(categoryIndex[_index]).length != 0);
        if((addBookMap[_orgAdd][_index]).length == 0){
            addBookMap[_orgAdd][_index].push(0x0);
        }
        require(getIndexof(_orgAdd,_index,_toAddAddress) == 0);
        addBookMap[_orgAdd][_index].push(_toAddAddress);
        addressInfo[_orgAdd][_toAddAddress][_index] = _info;
        uint i = (addBookMap[_orgAdd][_index]).length;
        indexOfElement[_orgAdd][_toAddAddress][_index] = i-1;
        emit AddressAddEvent(_orgAdd, _toAddAddress, block.timestamp);
    }
    
    /**
    remove an address from the organization address-book
    @dev    could be improved to save more space in the array, but then you need to save the indexes of the addresses
            a could removed indexofAddressinMap but then the user can delete mistakly another address
    @param _orgAdd the orignal address of the organisation
    @param _index  to which category belong that address
    @param _toRemoveAddress the address to remove
    @param _indexofAddressinMap the index of the removed address in the array
    */
    function removeAddressFromBook (address _orgAdd, uint _index, address _toRemoveAddress, uint _indexofAddressinMap) public {
        Organization storage org = organizationMap[_orgAdd];
        require(msg.sender == org.mainAddress[1] || msg.sender == org.mainAddress[0]);
        require(addBookMap[_orgAdd][_index][_indexofAddressinMap] == _toRemoveAddress);
        delete addBookMap[_orgAdd][_index][_indexofAddressinMap];
        delete addressInfo[_orgAdd][_toRemoveAddress][_index];
        delete indexOfElement[_orgAdd][_toRemoveAddress][_index];
        emit AddressRemoveEvent(_orgAdd, _toRemoveAddress, block.timestamp);
    }
    
    /**
    change the infomration about the address 
    @param _orgAdd the orignal address of the organisation
    @param _index  to which category belong that address
    @param _add the wanted address 
    @param _newInfo the new infomation, like stopped or stolen or.....
    */

    //BAD FUNCTION!
    // function changeInfoOfAddress(address _orgAdd, uint _index, address _add, string _newInfo) public {
     //  revert();
     //  Organization storage org = organizationMap[_orgAdd];
     //   require(msg.sender == org.mainAddress[1] || msg.sender == org.mainAddress[0]);
     //   addressInfo[_orgAdd][_add][_index] = _newInfo;
    // }
 
    /**
    change the second main address for some reason
    @notice the second Address can change it self
    @param _orgAdd the orignal address of the organisation
    @param _newMainAdress the new second main address 
    */
    function changeSecMainAddress(address _orgAdd, address _newMainAdress) public {
        Organization storage org = organizationMap[_orgAdd];
        require(msg.sender == org.mainAddress[1] || msg.sender == org.mainAddress[0]);
        org.mainAddress[1] = _newMainAdress;
    }
    
    /**
    add a new category to the originaly five categories, like 6 ICO 
    @dev    could be imporved by forcing a sequence 
    @param _index the new index of the category
    @param _info  the name of the added category
    */
    function addNewCategoryIndex(uint _index, string _info) public {
        require(msg.sender == owner, "wrong Owner");
        require(bytes(categoryIndex[_index]).length == 0, "not empty category");
        categoryIndex[_index] = _info;
    }
    
    /**
     * will be used to check if an address belong to the Organization
     * @param _orgAdd the original address of the Organization
     * @param _checkedAdd the given address
     * @param _category in which category
     * @param _idx the index in that category
    */
    function checkEofAddress(address _orgAdd, address _checkedAdd, uint _category, uint _idx) view external returns (bool){
        require (_checkedAdd == addBookMap[_orgAdd][_category][_idx]); 
        return true;
    }
    
}
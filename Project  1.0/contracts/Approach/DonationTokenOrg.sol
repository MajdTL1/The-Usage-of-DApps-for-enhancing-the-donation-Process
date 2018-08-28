pragma solidity ^0.4.23;

contract DonationTokenOrg{
    
    //hardcoded for each organization
    address owner = 0xf62fef864D88e3d70F22468EEe3B412b67114946;

    //hardcoded for easy testing, can be changed and set through functions
    address public mainOrgContract = 0x601f186d8c2171b78766924af4614f56f94711b1; 
    address public managementContract = 0x3f826e9555370dd06dd46f67c89bcc97d2b6e1dc;
    address public vaultContract = 0x4a8db8aef091afc6b71fd617d200e0922368b15c;

    mapping (uint256 => address) private ownerOfToken;
    mapping (uint256 => uint256) private valueOfToken;
    //mapping (uint256 => address) private approvedTo;
    mapping (uint256 => uint256) private timeOfMint;
    mapping (uint256 => bool) private donated;
    
    uint256 public tokenId;
    uint256 public totalSupply;
    uint256 public decimals;
    string public  symbol ;
    string public  name;

    modifier onlyOwner(){
        if(msg.sender == owner){
            _;
        }else{
            revert();
        }
    }
   
    // emit the events for transfer and transferFrom
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId); 
    // emit the events for transfer and transferFrom
    event Split(uint256 indexed _orginialToken, uint256 indexed _splitedToken, address indexed _owner);

    constructor() public {
        totalSupply = 0;
        symbol = "DT";
        decimals = 0;
        name = "Donate Token";
        tokenId = 1;
    }

    /**
     transfers a specific Token 
     @notice only the ownerOfToken will be changed, no token will be generated or removed
     @param _to The address of the recipient
     @param _tokenId The Id of token to be transferred
     @return  the Token Id
    */
    function transfer(address _to, uint256 _tokenId) public returns (uint256) {
        require(valueOfToken[_tokenId] != 0);
        address oldOwner = ownerOfToken[_tokenId];
        if(msg.sender == ownerOfToken[_tokenId]) {
            require(donated[_tokenId], "first transfer can be invoked just form managementContract"); 
            ownerOfToken[_tokenId] = _to;
        }
        else
            if(tx.origin == ownerOfToken[_tokenId] && (msg.sender == managementContract || msg.sender == vaultContract)){
                ownerOfToken[_tokenId] = _to;
        }   
        else 
            if(msg.sender == managementContract){
                uint256 t = block.timestamp;
                require(t > (timeOfMint[_tokenId] + 10 minutes));
                ownerOfToken[_tokenId] = _to;
            }
        else {
                revert();
        }
        emit Transfer(oldOwner, _to, _tokenId);   
        return (tokenId);
    }
  
    /**
     Mint token function
     @dev   check mainOrgContract 
     @param _to The address that will own the minted token
     @param _value value of Token
     @return  the Token Id
    */
    function _mint(address _to, uint256 _value) public returns(uint256) {
        require(msg.sender == mainOrgContract);
        require(_to != address(0));
        require(_value != 0);
        addToken(_to, _value, tokenId);
        tokenId++;
        emit Transfer(0x0, _to, tokenId - 1);
        return (tokenId - 1);
    }
    
    /**
     add a token ID to the list of a given address
     @dev   can just be invoked from _mint and _split 
     @param _to address representing the new owner of the given token ID
     @param _value the value of the added Token
    */
    function addToken(address _to, uint256 _value, uint _tokenId) internal {
        ownerOfToken[_tokenId] = _to;
        timeOfMint[_tokenId] = block.timestamp;
        valueOfToken[_tokenId] = _value;
        totalSupply = totalSupply + 1;
    }
    
    /**
     burn the Token
     @dev   just change the value of the Token to null 
     @param _from address representing the old owner of the given token ID
     @param _tokenId the Id of the burned Token
    */
    function _burn(uint256 _tokenId, address _from) external {
        require(msg.sender == vaultContract);
        valueOfToken[_tokenId] = 0;
        delete ownerOfToken[_tokenId];
        emit Transfer(_from, 0x0, _tokenId);
    } 
    
    /**
     split the Token to two Tokens with new values
     @dev    
     @param _valueOne  the new value of the original Token
     @param _valueTwo  the value of the new Token
     @param _tokenId the Id of the burned Token
    */
    function _split(uint256 _tokenId, uint256 _valueOne, uint256 _valueTwo) public {
        require(msg.sender == ownerOfToken[_tokenId] || msg.sender == managementContract);
        require(_valueOne + _valueTwo == valueOfToken[_tokenId]);
        valueOfToken[_tokenId] = _valueOne;
        addToken(ownerOfToken[_tokenId], _valueTwo, tokenId);
        donated[tokenId] = donated[_tokenId];
        tokenId++;
        emit Split(_tokenId, tokenId - 1, ownerOfToken[_tokenId]);
    }

    function getOwner(uint256 _tokenId) view public returns(address) {
        return ownerOfToken[_tokenId];
    }

    function getValue(uint256 _tokenId) view public returns(uint256) {
        return valueOfToken[_tokenId];
    }
 
    function setdonated(uint256 _tokenId) public {
        require(msg.sender == managementContract || msg.sender == owner);
        donated[_tokenId] = true;
    }

    function() public {
        revert();
    }

    //set the related addresses of the contract 
    function setmainOrgContract(address _add) public onlyOwner {
        mainOrgContract = _add;
    }

    function setmanagementContract(address _add) public onlyOwner {
        managementContract = _add;
    }

    function setVaultContract(address _add) public onlyOwner {
        vaultContract = _add;
    }
 
}


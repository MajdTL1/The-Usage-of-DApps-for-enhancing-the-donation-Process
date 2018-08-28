pragma solidity ^0.4.23;

contract FaiToken {

    string public constant name = "Fake DAI Token";
    string public constant symbol = "FAI";
    uint8  public constant decimals = 0; // changed to null to make it sample 
    
    event Transfer(address _from, address _to, uint256 _value);

    uint256 public totalSupply = 19987241 ;
    mapping(address => uint256)  balances;
    //mapping (address => mapping (address => uint256))  _approvals;

    constructor() public {
        balances[msg.sender] = totalSupply;
    }

    // 5. transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
        if(_value > 0 && balances[msg.sender] < _value) {
            return false;
        }
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
  
    function transferFrom(address src, address dst, uint wad) public returns (bool) {
        if (src != msg.sender) {
          //_approvals[src][msg.sender] = sub(_approvals[src][msg.sender], wad);
        }
        balances[src] = balances[src] - wad;
        balances[dst] = balances[dst] + wad;
        emit Transfer(src, dst, wad);
        return true;
    }

    function balanceOf(address _someone) public view returns (uint256 balance) {
        return balances[_someone];
    }

    function() public {
      // This will throw an exception - in effect no one can purchase the coin
        assert(true == false);
    }
  //other methods could be ignored 
  
}
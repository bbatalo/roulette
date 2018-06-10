pragma solidity ^0.4.24;


contract Roulette {

    address public owner;
    uint256 public casinoTax;
    uint256 public casinoRoulette;
    uint8 public casinoRate;

    mapping(address => uint) private balances;
    
    // add constraints? min amount of deposit, max amount of deposit, etc...
  
    
    constructor(uint256 tax, uint256 roulette, uint8 rate) public {
        owner = msg.sender;
        casinoTax = tax;
        casinoRoulette = roulette;
        casinoRate = rate;
    }
    
    // infinite gas requirement for some reason
    function getBalance() public view returns (uint256) {
        require(msg.sender == owner, "Only the owner of the contract can view the balance.");
        
        return address(this).balance;
    }
    
    // infinite gas requirement for some reason
    function refill() public payable {
        require(msg.sender == owner, "Only the owner of the contract can update the balance.");
    }

    // infinite gas requirement for some reason
    function check(address player) public view returns (uint balance) {
        return balances[player];
    }
    
    // infinite gas requirement for some reason
    function deposit() public payable {
        balances[msg.sender] = balances[msg.sender] + msg.value;
    }
    
    // infinite gas requirement for some reason
    function withdraw(uint amount) public returns (uint256) {
        require(balances[msg.sender] - amount >= 0);
        
        balances[msg.sender] = balances[msg.sender] - amount;
        
        msg.sender.transfer(amount - casinoTax);
        return amount - casinoTax;
    }
    
    
    function bet(uint8[] numbers, uint256[] money) public returns (uint256 winnings, uint8 randNumber) {
        require(numbers.length == money.length);
        
        uint256 sum = _sum(money);
        require(sum <= balances[msg.sender]);
        
        balances[msg.sender] = balances[msg.sender] - sum;
        
        randNumber = _randomGenerator();
        
        winnings = 0;
        
        for (uint i = 0; i < numbers.length; i++) {
            if (numbers[i] == randNumber) {
                winnings += money[i] * casinoRate;
            }
        }
        
        balances[msg.sender] = balances[msg.sender] + winnings;
    }
    
    function _sum(uint256[] money) private pure returns (uint256 sum) {
        for (uint i = 0; i < money.length; i++) {
            sum += money[i];
        }
        
        return sum;
    }
    
    function _randomGenerator() private view returns (uint8 randomNumber) {
        randomNumber = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % (casinoRoulette + 1));
    }
    
}
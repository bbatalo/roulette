pragma solidity ^0.4.24;


contract Roulette {

    address public owner;
    uint256 public casinoTax;
    uint256 public casinoRoulette;
    uint8 public casinoRate;

    mapping(address => uint) private balances;

    mapping(address => uint) private wins;
    mapping(address => uint) private loss;
    mapping(address => uint8) private number;
    
    
    
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
    function getWins(address player) public view returns (uint balance) {
        return wins[player];
    }
    // infinite gas requirement for some reason
    function getLost(address player) public view returns (uint balance) {
        return loss[player];
    }
    // infinite gas requirement for some reason
    function getNumber(address player) public view returns (uint8 balance) {
        return number[player];
    }

    event Deposit(
        uint newbalance
    );
    // infinite gas requirement for some reason
    function deposit() public payable returns (uint balance) {
        balances[msg.sender] = balances[msg.sender] + msg.value;
        balance =  balances[msg.sender];
        // return balances[msg.sender];
        emit Deposit(balance);
    }

    event Withdraw(
        uint newbalance
    );

    // infinite gas requirement for some reason
    function withdraw(uint amount) public returns (uint balance) {
        require(balances[msg.sender] - amount >= 0);
        
        balances[msg.sender] = balances[msg.sender] - amount;
        
        msg.sender.transfer(amount - casinoTax);
        // return balances[msg.sender];
        balance =  balances[msg.sender];
        emit Withdraw(balance);
    }


    event Bet(
        uint winnings,
        uint lost,
        uint8 randNumber,
        uint newbalance
    );

    function bet(uint8[] numbers, uint[] money) public returns (uint winnings, uint lost, uint8 randNumber, uint newbalance) {
        require(numbers.length == money.length);
        
        uint sum = _sum(money);
        lost = sum;

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
        newbalance = balances[msg.sender];
        loss[msg.sender] = lost;
        wins[msg.sender] = winnings;
        number[msg.sender] = randNumber;
        emit Bet(winnings, lost, randNumber, newbalance);
    }
    
    function _sum(uint[] money) private pure returns (uint sum) {
        for (uint i = 0; i < money.length; i++) {
            sum += money[i];
        }
        
        return sum;
    }
    
    function _randomGenerator() private view returns (uint8 randomNumber) {
        randomNumber = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % (casinoRoulette + 1));
    }
    
}
pragma solidity ^0.4.24;


contract Roulette {

    address public owner;               // owner of the contract
    uint256 public casinoTax;           // amount of ether deducted when withdrawing
    uint256 public casinoRoulette;      // size of roulette - should be 36 for frontend
    uint8 public casinoRate;            // winnings multiplicator

    mapping(address => uint) private balances;  // player balances on this contract

    mapping(address => uint) private wins;      // player wins
    mapping(address => uint) private loss;      // player losses
    mapping(address => uint8) private number;   // last number that was rolled for each player
  

    // mandatory constructor parameters
    constructor(uint256 tax, uint256 roulette, uint8 rate) public {
        owner = msg.sender;
        casinoTax = tax;
        casinoRoulette = roulette;
        casinoRate = rate;
    }
    
    // owner only function
    // check contract balance
    function getBalance() public view returns (uint256) {
        require(msg.sender == owner, "Only the owner of the contract can view the balance.");
        
        return address(this).balance;
    }
    
    // owner only function
    // transact ether to this contract, to enable payouts to players
    function refill() public payable {
        require(msg.sender == owner, "Only the owner of the contract can update the balance.");
    }

    // check the balance of a player on this contract
    function check(address player) public view returns (uint balance) {
        return balances[player];
    }
    
    // get player win count
    function getWins(address player) public view returns (uint balance) {
        return wins[player];
    }

    // get player loss count
    function getLost(address player) public view returns (uint balance) {
        return loss[player];
    }

    // get last number that was rolled for a player
    function getNumber(address player) public view returns (uint8 balance) {
        return number[player];
    }

    // event that will be emitted on every deposit to a player's balance
    // used for logging and communication with frontend
    event Deposit(
        uint newbalance
    );

    // deposit a specified amount of ether to player's balance on this contract
    function deposit() public payable returns (uint balance) {
        balances[msg.sender] = balances[msg.sender] + msg.value;
        balance = balances[msg.sender];
        emit Deposit(balance);
    }

    // event that will be emittet on every player withdraw
    event Withdraw(
        uint newbalance
    );

    // withdraw ether from the player's balance on this contract
    function withdraw(uint amount) public returns (uint balance) {
        require(balances[msg.sender] - amount >= 0);
        
        balances[msg.sender] = balances[msg.sender] - amount;
        
        msg.sender.transfer(amount - casinoTax);
        balance = balances[msg.sender];
        emit Withdraw(balance);
    }

    // emits upon betting
    event Bet(
        uint winnings,
        uint lost,
        uint8 randNumber,
        uint newbalance
    );

    // bet on one or more numbers of the roulette
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
    
    // private function for getting the sum of values from an array of values
    function _sum(uint[] money) private pure returns (uint sum) {
        for (uint i = 0; i < money.length; i++) {
            sum += money[i];
        }
        
        return sum;
    }
    
    // private function for generating a random number
    // NOT SAFE - miners can influence the outcome to a degree
    function _randomGenerator() private view returns (uint8 randomNumber) {
        randomNumber = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % (casinoRoulette + 1));
    }
    
}
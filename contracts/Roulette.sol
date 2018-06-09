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
    
    function _sum(uint256[] money) public pure returns (uint256 sum) {
        for (uint i = 0; i < money.length; i++) {
            sum += money[i];
        }
        
        return sum;
    }
    
    function _randomGenerator() private view returns (uint8 randomNumber) {
        randomNumber = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % (casinoRoulette + 1));
    }
    
    // fix spelling of variable names
    // should the function return info message, or just require certain conditions?
    // we also need an event to notify frontend
    /*
    function getInvest(string userName, uint[] rulletNumber, int[] money) public returns (string infoMessage, uint256 randNumeber) { // solhint-disable-line

        // can this be uint?
        int sumMoney = calculateAmontOfInvestMoney(money);
        randNumeber = randomFunction(); //spelling
        
        bool flagIsNotRegistered;   
        uint acountIndex;   // spelling
        
        (flagIsNotRegistered, acountIndex) = isUserNameUnique(userName);    // refactor to require
       
        // possibly refactor to require
        if (flagIsNotRegistered && rulletNumber.length != money.length) {
            infoMessage = "User is not registered.";
        } else if (flagIsNotRegistered && rulletNumber.length == money.length) {
            infoMessage = "User is not registered.";
        } else if (!flagIsNotRegistered && rulletNumber.length != money.length) {
            infoMessage = "User is  registered but arrays arent same size.";
        } else {
            Account storage acount = accounts[acountIndex];   // spelling
            // separate this into two functions?
            // investing could be one function, and the drawing of numbers could be another (enable group play?)
            if (sumMoney <= acount.amount) {
                acount.amount -= sumMoney;  // watch out for underflow if uint
                infoMessage = "User is registered and it has enough money on his/her acount."; // message grammar
                bool isFound;
                uint index;
                (isFound, index) = isFoundNumber(rulletNumber, randNumeber); // spelling
                if (isFound) {
                    acount.amount += money[index] * 36; // spelling
                }
            } else {
                infoMessage = "User is registered but does not have enough money on his/her acount.";
            }
        }
    }
    
    

    // spelling and int to uint
    function getState(string userName) public view returns(int256) {
        bool flagIsUnique;
        uint acountIndex;   // spelling
        
        (flagIsUnique, acountIndex) = isUserNameUnique(userName);   // spelling
        
        int256 money = -1;  // uint?
        if (!flagIsUnique) {
            money = accounts[acountIndex].amount;    // spelling
        }
       
        return money;
    }

    // uint?
    function addMoneyOnAcount(string userName, int moneyAmount) public {
        bool flagIsNotRegistered;
        uint acountIndex;   // spelling
        
        (flagIsNotRegistered, acountIndex) = isUserNameUnique(userName);    // spelling
        
        if (!flagIsNotRegistered) {
            accounts[acountIndex].amount += moneyAmount; // spelling
        }
    }
    
    // name convention
    function calculateAmontOfInvestMoney(int[] money) private pure returns (int) {
        int sum = 0;    // uint?
        for (uint i = 0; i < money.length; i++) {
            sum += money[i];
        }
        
        return sum;
    }

    

    // name convention  
    function findAccountIndexByUserName(string userName) private view returns (uint index) {
        bool flagIsUserUnique;
        uint acountIndex;
        (flagIsUserUnique, acountIndex) = isUserNameUnique(userName);
        if (!flagIsUserUnique) {
            return acountIndex;
        } else {
            return 0;
        }
    }

    // name convention, spelling
    function isFoundNumber(uint[] rulletNumbers, uint fountNumber) private pure returns (bool, uint) {
        for (uint i = 0; i < rulletNumbers.length; i++) {
            if (rulletNumbers[i] == fountNumber) {
                return (true, i);
            }
        }
        
        return (false, rulletNumbers.length + 1);
    }

    */
    

}
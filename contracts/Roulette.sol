pragma solidity ^0.4.21;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";  // for what do we use this library?


contract Roulette {
    using strings for *;

    uint256 idCounter;  // should this field be public or private? my guess is private
    
    struct Acount {
        uint256 id;
        string name;
        int256 amount;  // uint256? we should also package variables of the same type together (optimization)
    }
    
    Acount[] acounts;   // is this public?
  
    function Roulette() public {
        idCounter = 0;
    } 
   
    // fix spelling of variable names
    // should the function return info message, or just require certain conditions?
    // we also need an event to notify frontend
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
            Acount storage acount = acounts[acountIndex];   // spelling
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
    
    // switch to uint?
    function register(string userName, int256 userMoney) public returns (string registerMessageInfo, uint256 userId) {
        bool flagIsUnique;
        uint acountIndex;
        (flagIsUnique, acountIndex) = isUserNameUnique(userName);   // spelling
        if (flagIsUnique) {
            Acount memory a = Acount({ name: userName, amount: userMoney, id: idCounter++ });   // spelling
            acounts.push(a);
            registerMessageInfo = "User is successfully registered.";
            userId = idCounter;
        } else {
            registerMessageInfo = "User isn't register because his/her username is not unique.";
            userId = 0;
        }
    }

    // spelling and int to uint
    function getState(string userName) public view returns(int256) {
        bool flagIsUnique;
        uint acountIndex;   // spelling
        
        (flagIsUnique, acountIndex) = isUserNameUnique(userName);   // spelling
        
        int256 money = -1;  // uint?
        if (!flagIsUnique) {
            money = acounts[acountIndex].amount;    // spelling
        }
       
        return money;
    }

    // uint?
    function addMoneyOnAcount(string userName, int moneyAmount) public {
        bool flagIsNotRegistered;
        uint acountIndex;   // spelling
        
        (flagIsNotRegistered, acountIndex) = isUserNameUnique(userName);    // spelling
        
        if (!flagIsNotRegistered) {
            acounts[acountIndex].amount += moneyAmount; // spelling
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
    function isUserNameUnique(string userName) private view returns (bool, uint) {
        for (uint i = 0; i < acounts.length; i++) {
            if (keccak256(acounts[i].name) == keccak256(userName)) {
                return (false, i);
            }
        }
        
        return (true, 1);
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
    
    // naming convention, spelling
    function randomFunction() private view returns (uint256) {
      
        uint256 ranodmNumber;
        // double conversion? is uint8 neccessary?
        ranodmNumber = uint8(uint256(keccak256(block.timestamp, block.difficulty)) % 37); // solhint-disable-line

        return ranodmNumber;
    }
    
    

}
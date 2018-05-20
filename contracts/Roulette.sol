pragma solidity ^0.4.21;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";


contract Roulette {
    using strings for *;

    uint256 idCounter;
    
    struct Acount {
        uint256 id;
        string name;
        int256 amount;
    }
    
    Acount[] acounts;
  
    function Roulette() public {
        idCounter = 0;
    } 
   
    function getInvest(string userName, uint[] rulletNumber, int[] money) public returns (string infoMessage, uint256 randNumeber) { // solhint-disable-line

        int sumMoney = calculateAmontOfInvestMoney(money);
        randNumeber = randomFunction();
        
        bool flagIsNotRegistered;
        uint acountIndex;
        
        (flagIsNotRegistered, acountIndex) = isUserNameUnique(userName);
       
        if (flagIsNotRegistered && rulletNumber.length != money.length) {
            infoMessage = "User is not registered.";
        } else if (flagIsNotRegistered && rulletNumber.length == money.length) {
            infoMessage = "User is not registered.";
        } else if (!flagIsNotRegistered && rulletNumber.length != money.length) {
            infoMessage = "User is  registered but arrays arent same size.";
        } else {
            Acount storage acount = acounts[acountIndex];
            if (sumMoney <= acount.amount) {
                acount.amount -= sumMoney;
                infoMessage = "User is registered and it has enough money on his/her acount.";
                bool isFound;
                uint index;
                (isFound, index) = isFoundNumber(rulletNumber, randNumeber);
                if (isFound) {
                    acount.amount += money[index] * 36;
                }
            } else {
                infoMessage = "User is registered but does not have enough money on his/her acount.";
            }
        }
    }
    
    function register(string userName, int256 userMoney) public returns (string registerMessageInfo, uint256 userId) {
        bool flagIsUnique;
        uint acountIndex;
        (flagIsUnique, acountIndex) = isUserNameUnique(userName);
        if (flagIsUnique) {
            Acount memory a = Acount({ name: userName, amount: userMoney, id: idCounter++ });
            acounts.push(a);
            registerMessageInfo = "User is successfully registered.";
            userId = idCounter;
        } else {
            registerMessageInfo = "User isn't register because his/her username is not unique.";
            userId = 0;
        }
    }

    function getState(string userName) public view returns(int256) {
        bool flagIsUnique;
        uint acountIndex;
        
        (flagIsUnique, acountIndex) = isUserNameUnique(userName);
        
        int256 money = -1;
        if (!flagIsUnique) {
            money = acounts[acountIndex].amount;
        }
       
        return money;
    }

    function addMoneyOnAcount(string userName, int moneyAmount) public {
        bool flagIsNotRegistered;
        uint acountIndex;
        
        (flagIsNotRegistered, acountIndex) = isUserNameUnique(userName);
        
        if (!flagIsNotRegistered) {
            acounts[acountIndex].amount += moneyAmount;
        }
    }
    
    function calculateAmontOfInvestMoney(int[] money) private pure returns (int) {
        int sum = 0;
        for (uint i = 0; i < money.length; i++) {
            sum += money[i];
        }
        
        return sum;
    }

    function isUserNameUnique(string userName) private view returns (bool, uint) {
        for (uint i = 0; i < acounts.length; i++) {
            if (keccak256(acounts[i].name) == keccak256(userName)) {
                return (false, i);
            }
        }
        
        return (true, 1);
    }
   
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

    function isFoundNumber(uint[] rulletNumbers, uint fountNumber) private pure returns (bool, uint) {
        for (uint i = 0; i < rulletNumbers.length; i++) {
            if (rulletNumbers[i] == fountNumber) {
                return (true, i);
            }
        }
        
        return (false, rulletNumbers.length + 1);
    }
    
    function randomFunction() private view returns (uint256) {
      
        uint256 ranodmNumber;
        ranodmNumber = uint8(uint256(keccak256(block.timestamp, block.difficulty)) % 37); // solhint-disable-line

        return ranodmNumber;
    }
    
    

}
contract Rulette{
    
    struct Player{
     string name;
     uint256 money;
    }
    
    uint256 idCounter;
    struct Acount{
        uint256 id;
        string name;
        int256 amount;
    }
    Acount[] acounts;
    
    struct Stake{
        uint256 ruletNumber;
        uint256 amount;
        string name;
        uint time;
    }
    
    struct Winner{
        string name;
        uint256 amount;
    }
    
    Stake[]  stakes;
    
    function  Rulette() public{
        idCounter=0;
    }
    
    function Register(string userName, int256 userMoney) public returns(uint256){
        Acount memory  a=Acount({name: userName, amount: userMoney, id: idCounter++});
        acounts.push(a);
        return idCounter;
    }
    
    function GetState(uint256 id) public returns(int256){
        Acount memory foundAcount;
        int256 money=-1;
        for(uint256 i=0; i<acounts.length; i++){
            if(acounts[i].id==id){
                foundAcount = acounts[i];
                money=acounts[i].amount;
              
                break;
            }
        }
        
        return money;
    }
    
    function GetWinner() public returns (string){
        string[] winnersName;
        Winner[] winners;
        var stakesLength= stakes.length;
        uint256 winnigNumber = randomFunction();
        string winnerName;
        for(uint i=0; i<stakesLength; i++){
            if(stakes[i].ruletNumber == winnigNumber){
            winnersName.push(stakes[i].name);
            winnerName=stakes[i].name;
            Winner memory w = Winner({name: stakes[i].name, amount: stakes[i].amount*36});
            winners.push(w);
            }
        }
        
        return winnerName;   
    }
   
    function Invest(uint256 ruletNumber1, int256 amount, uint256 id) public returns(uint256 indexValue,uint256 gottenNumber,int  amountChanged){
        gottenNumber= randomFunction();
        indexValue=getIndex(id);
        var value=indexValue;
      
       require(ruletNumber1>0 && ruletNumber1<37 && amount>0 );
     
        if(gottenNumber == ruletNumber1 && acounts[indexValue].amount>=amount){
          
           acounts[indexValue].amount+=amount*36;
          
        }
        
      acounts[indexValue].amount -= amount;
      amountChanged=acounts[indexValue].amount;
     
    }
    

    
    function invest2(uint256 ruletNumber1, uint256 stake1, string name1) public {
        if(ruletNumber1>0 && ruletNumber1<37)
        {
            Stake memory s=Stake({ruletNumber: ruletNumber1, amount: stake1, name: name1, time: now});
            stakes.push(s);
        }
    }
    
    function isRegister(uint256 id) private returns(bool){
          for(uint256 i=0; i< acounts.length; i++){
            if(acounts[i].id==id){
               return true;
            }
        }
        
        return false;
    }
    
    function getIndex(uint256 id) public returns(uint256){
        uint256 index;
        
        for(uint256 i=0; i< acounts.length; i++){
            if(acounts[i].id==id){
                index=i;
                break;
            }
        }
        
        return index;
    }
    
    function randomFunction() returns(uint256){
        uint256 timeOfForthPlayer;
        uint256 ranodmNumber;
        if(stakes.length>4){
            timeOfForthPlayer=stakes[4].time;
            ranodmNumber = uint8(uint256(keccak256(block.timestamp, timeOfForthPlayer))%37);
        }
        else{
            ranodmNumber = uint8(uint256(keccak256(block.timestamp, block.difficulty))%37);
        }
        
        return ranodmNumber;
    }

}
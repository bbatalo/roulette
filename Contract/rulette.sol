pragma solidity ^0.4.21;
import "github.com/Arachnid/solidity-stringutils/src/strings.sol";
contract Rulette{
     using strings for *;
 /*   struct Player{
     string name;
     uint256 money;
    } */
    
    uint256 idCounter;
    struct Acount{
        uint256 id;
        string name;
        int256 amount;
    }
    
    Acount[] acounts;
    /*
    struct Stake{
        uint256 ruletNumber;
        uint256 amount;
        string name;
        uint time;
    } */
    /*
    struct Winner{
        string name;
        uint256 amount;
    } */
    
    //Stake[]  stakes;
    
   function Rulette() public{
        idCounter=0;
    } /*
    consrtuctor(){
        idCounter=0;
    } */
    function splitString(string input) public returns(string){
       /// var s = "www.google.com".toSlice();
        var s=input.toSlice();
        var delim = ";".toSlice();
        var parts = new string[](s.count(delim) + 1);
        var parts2=new string[](2*parts.length);
        for(uint i = 0; i < parts.length; i++) {
            var el=s.split(delim);
            parts[i] = s.split(delim).toString();
         //   var delimLine="-".toSlice();
          /*  for(uint j=0; j<2; j++){
                parts2[i] = el.split(delimLine).toString();
            } */
        }
        
        uint k=0;
        for(uint j=0; j<parts.length; j++){
            var ss=parts[j].toSlice();
            var delimLine = "-".toSlice();
            var elem=ss.split(delimLine);
            
            parts2[k++]=elem.split(delimLine).toString();
        }
        
        return parts2[1];
    }
    
    function register(string userName, int256 userMoney) public returns(uint256){
        Acount memory  a=Acount({name: userName, amount: userMoney, id: idCounter++});
        acounts.push(a);
        return idCounter;
    }
    
    function getState(uint256 id) public view returns(int256){
        int256 money=-1;
        id--;
        money = acounts[id].amount;
        
        return money;
    }
   
/*   
    function getWinner() public  view returns (string){
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
    */
	
    function invest(uint256 ruletNumber1, int256 amount, uint256 id) public returns(uint256 indexValue,uint256 gottenNumber,int  amountChanged){
        gottenNumber= randomFunction();
        indexValue=getIndex(id);
      
      
       require(ruletNumber1>0 && ruletNumber1<37 && amount>0 );
     
        if(gottenNumber == ruletNumber1 && acounts[indexValue].amount>=amount){
          
           acounts[indexValue].amount+=amount*36;
          
        }
        
      acounts[indexValue].amount -= amount;
      amountChanged=acounts[indexValue].amount;
     
    }
    

    /*
    function invest2(uint256 ruletNumber1, uint256 stake1, string name1) public {
        if(ruletNumber1>0 && ruletNumber1<37)
        {
            Stake memory s=Stake({ruletNumber: ruletNumber1, amount: stake1, name: name1, time: now});
            stakes.push(s);
        }
    } */
    /*
    function isRegister(uint256 id) private view returns(bool){
          for(uint256 i=0; i< acounts.length; i++){
            if(acounts[i].id==id){
               return true;
            }
        }
        
        return false;
    } */
    
    function getIndex(uint256 id) public view returns(uint256){
        uint256 index;
        
        for(uint256 i=0; i< acounts.length; i++){
            if(acounts[i].id==id){
                index=i;
                break;
            }
        }
        
        return index;
    }
    
    function randomFunction() private view returns(uint256){
      //  uint256 timeOfForthPlayer;
        uint256 ranodmNumber;
   /*     if(stakes.length>4){
            timeOfForthPlayer=stakes[4].time;
            ranodmNumber = uint8(uint256(keccak256(block.timestamp, timeOfForthPlayer))%37);
        }
        else{ */
            ranodmNumber = uint8(uint256(keccak256(block.timestamp, block.difficulty))%37);
       // }
        
        return ranodmNumber;
    }

}
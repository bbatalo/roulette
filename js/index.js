(function(){
    "use strict";

    var modul = angular.module('app', ['cookieModul','modalsLibraryModule']);

    modul.controller('svekontroler',['$scope','$http','RedirectionFactory','ModalsFactory', function($scope, $http, RedirectionFactory,ModalsFactory) {
        
        var RouletteDef = require("./../build/contracts/Roulette.json");

        var Web3 = require("web3");
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
        $scope.web3 = web3;

        var contractAddress = "0xc8fa6ee7a10e20ee4d3bad40df44cf6817f74e22";

        $scope.Roulette = web3.eth.contract(RouletteDef.abi);
        $scope.roulette = $scope.Roulette.at(contractAddress);
        console.log($scope.roulette);

        var betEvent = $scope.roulette.Bet({fromBlock: 0, toBlock: 'latest'});
        betEvent.watch(function(error, result){
            // console.log("watchingovanje  bet.....");
            // console.log(error);
            // console.log(result);
            $scope.rz = result;

            // console.log(`NUMBER: ${parseInt(result.args.randNumber)} \n Total investment: ${parseInt(result.args.lost)}, total income: ${parseInt(result.args.winnings)}. \n New balance ${parseInt(result.args.newbalance)}`);
            if($scope.blocked){
                var printNumber = parseInt(result.args.randNumber);
                var printLost = $scope.unitInput(parseInt(result.args.lost));
                var printWin = $scope.unitInput(parseInt(result.args.winnings));
                var printNewBalance = $scope.unitInput(parseInt(result.args.newbalance));
                ModalsFactory.toaster('info',
                    `Пало: ${printNumber} <br> 
                    Улог: ${printLost} <br> 
                    Добитак: ${printWin} <br> 
                    Ваше стање: ${printNewBalance}`);
                $scope.blocked = false;
            }
            
            $scope.bilans = parseInt(result.args.newbalance);
            $scope.clearTable();
            $scope.$apply();
        });

        var withdrawEvent = $scope.roulette.Withdraw({fromBlock: 0, toBlock: 'latest'});
        withdrawEvent.watch(function(error, result){
            // console.log("watchingovanje withdraw.....");
            // console.log(error);
            // console.log(result);
            // $scope.wz = result;
            $scope.bilans = parseInt( result.args.newbalance  );
            $scope.$apply();
        });

        var depositEvent = $scope.roulette.Deposit({fromBlock: 0, toBlock: 'latest'});
        depositEvent.watch(function(error, result){
            // console.log("watchingovanje deposit.....");
            // console.log(error);
            // console.log(result);
            // $scope.dz = result;
            $scope.bilans = parseInt( result.args.newbalance  );
            $scope.$apply();
        });

        $scope.korak = 1
        $scope.cipovi = [1,2,5,10,25,50,100]

        $scope.total = 0
        $scope.bilans = 0

        $scope.bet = {}
        $scope.tabela = [
            {
                "num":1,
                "col":"r"
            },
            {
                "num":2,
                "col":"b"
            },
            {
                "num":3,
                "col":"r"
            },
            {
                "num":4,
                "col":"b"
            },
            {
                "num":5,
                "col":"r"
            },
            {
                "num":6,
                "col":"b"
            },
            {
                "num":7,
                "col":"r"
            },
            {
                "num":8,
                "col":"b"
            },
            {
                "num":9,
                "col":"r"
            },
            {
                "num":10,
                "col":"b"
            },
            {
                "num":11,
                "col":"b"
            },
            {
                "num":12,
                "col":"r"
            },
            {
                "num":13,
                "col":"b"
            },
            {
                "num":14,
                "col":"r"
            },
            {
                "num":15,
                "col":"b"
            },
            {
                "num":16,
                "col":"r"
            },
            {
                "num":17,
                "col":"b"
            },
            {
                "num":18,
                "col":"r"
            },
            {
                "num":19,
                "col":"r"
            },
            {
                "num":20,
                "col":"b"
            },
            {
                "num":21,
                "col":"r"
            },
            {
                "num":22,
                "col":"b"
            },
            {
                "num":23,
                "col":"r"
            },
            {
                "num":24,
                "col":"b"
            },
            {
                "num":25,
                "col":"r"
            },
            {
                "num":26,
                "col":"b"
            },
            {
                "num":27,
                "col":"r"
            },
            {
                "num":28,
                "col":"b"
            },
            {
                "num":29,
                "col":"b"
            },
            {
                "num":30,
                "col":"r"
            },
            {
                "num":31,
                "col":"b"
            },
            {
                "num":32,
                "col":"r"
            },
            {
                "num":33,
                "col":"b"
            },
            {
                "num":34,
                "col":"r"
            },
            {
                "num":35,
                "col":"b"
            },
            {
                "num":36,
                "col":"r"
            }
        ];
        

        $scope.RedirectionFactory = RedirectionFactory;
        $scope.pkey = RedirectionFactory.getKey();
        $scope.bilans = getBilans();
        $scope.login = function(){
            $scope.pkey = $scope.newpk;
            RedirectionFactory.setKey($scope.newpk)
            $scope.bilans = getBilans();
        }
        $scope.logout = function(){
            RedirectionFactory.clear()
            $scope.pkey = null
        }

        function getBilans(){
            if($scope.pkey == null)
                return -2;

                $scope.pkey0x = web3.toBigNumber($scope.pkey)
                console.log("adress hex: "+ $scope.pkey0x);

                $scope.roulette.check.call($scope.pkey, function(err, balance) {
                    // console.log(err);
                    // console.log(balance);
                    $scope.bilans = parseInt(balance);
                    $scope.$apply();
                });
            return $scope.pkey.length*10000;
        }


        $scope.setKorak = function(val){
            $scope.korak = val;
        }

        $scope.transfer = function(value){
            value = parseInt(value);
            value = value * $scope.units.val;

            if( $scope.bilans + value < 0 ){
                ModalsFactory.toaster("error","Немате довољно средстава за ову исплату.");
                return;
            }
                
            
            console.log("adress hex: "+ $scope.pkey0x);

            if(value>0){
                $scope.roulette.deposit.sendTransaction({from: $scope.pkey, value: value, gas: 2000000},function(err,result){
                    if(err!=null){
                        ModalsFactory.toaster("error","Немате довољно средстава за ову уплату.");
                    }
                });
            }
            if(value<0){
                $scope.roulette.withdraw.sendTransaction(-value,{from: $scope.pkey, gas: 2000000});
            }
            // $scope.bilans = parseInt(web3.toBigNumber($scope.bilans).plus(value));
            // console.log(typeof($scope.bilans))
        }

        $scope.blocked = false;
        $scope.play = function(){
            $scope.blocked = true;

            // todo
            var topass = $scope.bet2lists();
            $scope.roulette.bet.sendTransaction(topass["numbers"],topass["values"],{from:$scope.pkey,gas:3000000});
            // a.roulette.bet.sendTransaction(topass["numbers"],topass["values"],{from:a.pkey,gas:3000000},function(err,result){
            //     console.log(err);
            //     console.log(result);
            // })

            // $scope.blocked = false;
        }




        $scope.minus = false;
        $scope.numClick = function(broj){
            var svota = $scope.korak * $scope.units.val;
            if ($scope.minus)
                svota = - svota;

            var brojval = $scope.bet[broj]
            if(brojval == null)
                brojval = 0

                    
            var newtotal = $scope.total + svota
            if (newtotal > $scope.bilans){
                svota = svota - (newtotal - $scope.bilans);
                newtotal = $scope.bilans;
            }
            if(brojval+svota < 0)
                svota = -brojval;
            

            $scope.bet[broj] = brojval+svota;
            $scope.total = $scope.total + svota;
        }
        $scope.clearTable = function(){
            $scope.bet = {};
            $scope.total = 0;
        }


        $scope.bet2lists = function(){
            var l1 = [];
            var l2 = [];
            for(var index in $scope.bet){
                l1.push(parseInt(index));
                l2.push($scope.bet[index]);
            }
            return {
                "numbers":l1,
                "values":l2
            };
        }
    
        $scope.units = {
            "key" : "wei",
            "val": 1,
            "list": [
                {
                    "key":"wei",
                    "val":1
                },
                {
                    "key":"Kwei",
                    "val":1000
                },
                {
                    "key":"Mwei",
                    "val":1000000
                },
                {
                    "key":"Gwei",
                    "val":1000000000
                },
                {
                    "key":"microether",
                    "val":1000000000000
                },
                {
                    "key":"milliether",
                    "val":1000000000000000
                },
                {
                    "key":"ether",
                    "val":1000000000000000000
                }
            ]
    
        };
        
        
        $scope.unitInput = function(value){
            return `${Math.round(value/$scope.units.val*100)/100} ${$scope.units.key}-a`;
        }
        $scope.unitOutput = function(value){
            return value;
        }
        

    }]); 



    // proba.controller('restPokusaj', function($scope, $http) {
    //     $http.get('http://localhost:8080/pokusaj/1').
    //         then(function(response) {
    //             $scope.greeting = response.data;
    //         });
    // });

})();
(function(){
    "use strict";

    var modul = angular.module('app', ['cookieModul']);
        
    modul.controller('svekontroler',['$scope','$http','RedirectionFactory', function($scope, $http, RedirectionFactory){

            var abi = [
                {
                  "constant": true,
                  "inputs": [],
                  "name": "casinoRoulette",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "owner",
                  "outputs": [
                    {
                      "name": "",
                      "type": "address"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "casinoTax",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "casinoRate",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint8"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "name": "tax",
                      "type": "uint256"
                    },
                    {
                      "name": "roulette",
                      "type": "uint256"
                    },
                    {
                      "name": "rate",
                      "type": "uint8"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "constructor"
                },
                {
                  "constant": true,
                  "inputs": [],
                  "name": "getBalance",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [],
                  "name": "refill",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [
                    {
                      "name": "player",
                      "type": "address"
                    }
                  ],
                  "name": "check",
                  "outputs": [
                    {
                      "name": "balance",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [],
                  "name": "deposit",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "amount",
                      "type": "uint256"
                    }
                  ],
                  "name": "withdraw",
                  "outputs": [
                    {
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "constant": false,
                  "inputs": [
                    {
                      "name": "numbers",
                      "type": "uint8[]"
                    },
                    {
                      "name": "money",
                      "type": "uint256[]"
                    }
                  ],
                  "name": "bet",
                  "outputs": [
                    {
                      "name": "winnings",
                      "type": "uint256"
                    },
                    {
                      "name": "randNumber",
                      "type": "uint8"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "constant": true,
                  "inputs": [
                    {
                      "name": "money",
                      "type": "uint256[]"
                    }
                  ],
                  "name": "_sum",
                  "outputs": [
                    {
                      "name": "sum",
                      "type": "uint256"
                    }
                  ],
                  "payable": false,
                  "stateMutability": "pure",
                  "type": "function"
                }
              ]

            
              var Web3 = require("web3");
            var web3 = new Web3();
            web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
            $scope.web3 = web3;

            var contractAddress = "0x147a57526f1262ce166019912623a856c06066e1"
            $scope.roulette = web3.eth.contract(abi).at(contractAddress);

            $scope.korak = 1
            $scope.cipovi = [1,2,5,10,25,50,100]

            $scope.total = 0
            // $scope.bilans = 0

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
                
                    $scope.roulette.methods.check($scope.pkey).then(
                        function successCheck(response) {
                            console.log("success");
                            console.log(response);
                            
                        },function errorBuy(response) {
                            console.log("success");
                            console.log(response);
                            // ModalsFactory.toaster('error','Somewho took your place on some of flights, your reservations are canceled on that flight. Choose position again on these flights.');    
                    });

                return $scope.pkey.length*10000;
            }


            $scope.setKorak = function(val){
                $scope.korak = val;
            }

            $scope.transfer = function(value){
                value = parseInt(value);
                if( $scope.bilans + value < 0 )
                    return;
                
                //todo

                $scope.bilans = $scope.bilans + value;
            }

            $scope.blocked = false;
            $scope.play = function(){
                $scope.blocked = true;

                // todo
                // var getnum = Math.round(Math.random()*36);

                $scope.blocked = false;
            }


            $scope.minus = false;
            $scope.numClick = function(broj){
                var svota = $scope.korak;
                if ($scope.minus)
                    svota = - svota;

                var brojval = $scope.bet[broj]
                if(brojval == null)
                    brojval = 0

                        
                var newtotal = $scope.total + svota
                if (newtotal > $scope.bilans)
                    return
                if(brojval+svota < 0)
                    svota = -brojval;
                

                $scope.bet[broj] = brojval+svota;
                $scope.total = $scope.total + svota;
            }
            $scope.clearTable = function(){
                $scope.bet = {};
                $scope.total = 0;
            }


            




            
    }]); 

    // proba.controller('restPokusaj', function($scope, $http) {
    //     $http.get('http://localhost:8080/pokusaj/1').
    //         then(function(response) {
    //             $scope.greeting = response.data;
    //         });
    // });

})();
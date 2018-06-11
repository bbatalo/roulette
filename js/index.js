(function(){
    "use strict";

    var modul = angular.module('app', ['cookieModul']);

    modul.controller('svekontroler',['$scope','$http','RedirectionFactory', function($scope, $http, RedirectionFactory) {
        
        var RouletteDef = require("./../build/contracts/Roulette.json");

        var Web3 = require("web3");
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
        $scope.web3 = web3;

        var contractAddress = "0x4609b829d2e7055568b5316a2970897af04293de"

        $scope.Roulette = web3.eth.contract(RouletteDef.abi);
        $scope.roulette = $scope.Roulette.at(contractAddress);
        console.log($scope.roulette);

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

                // $scope.roulette.check.call($scope.pkey0x, function(err, balance) {
                //     console.log(err);
                //     console.log(balance);
                //     $scope.bilans = parseInt(balance.c[0]);
                //     $scope.$apply();
                // });

                $scope.roulette.check.call($scope.pkey, function(err, balance) {
                    console.log(err);
                    console.log(balance);
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
            if( $scope.bilans + value < 0 )
                return;
            
            console.log("adress hex: "+ $scope.pkey0x);

            if(value>0){
                $scope.roulette.deposit.sendTransaction({from: $scope.pkey, value: value, gas: 2000000}, function(err, result){
                    console.log("deposit returned:");
                    console.log(err);
                    console.log(parseInt(result));
                    console.log(result);
                    if(err == null){
                        $scope.bilans = getBilans();
                        // $scope.$apply();
                    }
                });
            
            }
            if(value<0){
                $scope.roulette.withdraw.sendTransaction(-value,{from: $scope.pkey, gas: 2000000}, function(err, result){
                    console.log("withdraw returned:");
                    console.log(err);
                    console.log(parseInt(result));
                    console.log(result);
                    if(err == null){
                        $scope.bilans = getBilans();
                        // $scope.$apply();
                    }
                });

            }
            $scope.bilans = parseInt(web3.toBigNumber($scope.bilans).plus(value));
            console.log(typeof($scope.bilans))
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
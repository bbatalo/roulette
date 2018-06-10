(function(){
    "use strict";

    var modul = angular.module('app', ['cookieModul']);

    modul.controller('svekontroler',['$scope','$http','RedirectionFactory', function($scope, $http, RedirectionFactory) {
        
        var RouletteDef = require("./../build/contracts/Roulette.json");

        var Web3 = require("web3");
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
        $scope.web3 = web3;

        var contractAddress = "0x133f9b5f94a219fb76c3321165b6dc8374533db6"

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
                
                
                $scope.roulette.check.call(web3.toBigNumber($scope.pkey), function(err, balance) {
                    console.log(err);
                    console.log(balance);
                    $scope.bilans = balance.c[0];
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
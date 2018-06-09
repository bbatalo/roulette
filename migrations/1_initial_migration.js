var Migrations = artifacts.require("./Migrations.sol");
var Roulette = artifacts.require("./Roulette.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  var tax = 666;
  var roulette = 36;
  var multiplier = 36;
  deployer.deploy(Roulette, tax, roulette, multiplier);
};

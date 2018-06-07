var Migrations = artifacts.require("./Migrations.sol");
var Roulette = artifacts.require("./Roulette.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Roulette);
};

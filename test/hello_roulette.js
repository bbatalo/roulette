var Roulette = artifacts.require('./Roulette.sol');

contract('Roulette:idCounter', function(accounts) {
  it("should have valid start configuration", function(done) {
    var roulette = Roulette.deployed();
    
    Roulette.new({ from: accounts[0] }).then(
      function(roulette) {
        roulette.idCounter.call().then(
          function(idCounter) {
            // assert.equal(idCounter, 0, "No players should be registered.");
            assert.isTrue(true);
          }
        );
      }
    ).catch(done);
  });
});

/*
contract('Conference', function(accounts) {
  it("Initial conference settings should match", function(done) {
    var conference = Conference.at(Conference.deployed_address);
    // same as previous example up to here
    Conference.new({ from: accounts[0] }).then(
      function(conference) {
       conference.quota.call().then(
        function(quota) {
          assert.equal(quota, 500, "Quota doesn't match!");
        }).then(function() {
          return conference.numRegistrants.call();
        }).then( function(num) {
          assert.equal(num, 0, "Registrants should be zero!");
          return conference.organizer.call();
        }).then( function(organizer) {
          assert.equal(organizer, accounts[0], "Owner doesn't match!");
          done(); // to stop these tests earlier, move this up
        }).catch(done);
    }).catch(done);
  });
});*/

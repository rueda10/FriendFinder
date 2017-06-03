var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    const newFriend = req.body;
    const newFriendScores = newFriend.scores;
    var matchingFriend;
    var minScore = 200;

    for (var i = 0; i < friends.length; i++) {
      const scores = friends[i].scores;
      var counter = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        var score = scores[j] - newFriendScores[j];
        counter += Math.abs(score);
      }

      if (counter < minScore) {
        minScore = counter;
        matchingFriend = friends[i];
      }
    }

    friends.push(newFriend);
    res.json(matchingFriend);

  });
};

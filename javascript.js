
var config = {
    apiKey: "AIzaSyCxqtnaDgJRPQm4md2VH3KleHLRjDtv3qM",
    authDomain: "train-activity-63886.firebaseapp.com",
    databaseURL: "https://train-activity-63886.firebaseio.com",
    projectId: "train-activity-63886",
    storageBucket: "train-activity-63886.appspot.com",
    messagingSenderId: "597141732287"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

    var trainName = "";
    var destination = "";
    var frequency = 0;
    var nextArrival = 0;
    var minsAway = 0;

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      trainName = $("#train-name-input").val();
      destination = $("#destination-input").val();
      frequency = $("#frequency-input").val();
      nextArrival = $("#start-input").val();

      database.ref().push({
          trainName: trainName,
          destination: destination,
          frequency: frequency,
          nextArrival: nextArrival,
      });
})

database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();

    var newRow = $("<tr>").append(
        $("<td>").text(sv.trainName),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.frequency),
        $("<td>").text(sv.nextArrival)
    );

    $("#train-table > tbody").append(newRow);
})
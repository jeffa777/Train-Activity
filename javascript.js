// variables to set up database
var config = {
    apiKey: "AIzaSyCxqtnaDgJRPQm4md2VH3KleHLRjDtv3qM",
    authDomain: "train-activity-63886.firebaseapp.com",
    databaseURL: "https://train-activity-63886.firebaseio.com",
    projectId: "train-activity-63886",
    storageBucket: "train-activity-63886.appspot.com",
    messagingSenderId: "597141732287"
  };
    //iniatializing database
  firebase.initializeApp(config);

  var database = firebase.database();

    var trainName = "";
    var destination = "";
    var frequency = 0;
    var nextArrival = "";
    
    //add train on click
  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      trainName = $("#train-name-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      nextArrival = $("#start-input").val().trim();
        // pushing to database
      database.ref().push({
          trainName: trainName,
          destination: destination,
          frequency: frequency,
          nextArrival: nextArrival,
      });
      $("input").val("");
})
        // adding noew train/info to html
database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();

    var freq = parseInt(sv.frequency)
        // moment function added to calculate mins away
    var dConverted = moment(snapshot.val().nextArrival, 'HH:mm').subtract(1, 'years');
    var trainTime = moment(dConverted).format('HH:mm');
    var timeConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var timeDifference = moment().diff(moment(timeConverted), 'minutes');
    var timeRemainder = timeDifference % freq;
    var minsAway = freq - timeRemainder;
     nextArrival = moment().add(minsAway, 'minutes');
        //appending new row/info to html
    var newRow = $("<tr>").append(
        $("<td>").text(sv.trainName),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.frequency),
        $("<td>").text(moment(sv.nextArrival, 'HH:mm').format('hh:mm a')),
        $("<td>").text(minsAway),
    );

    $("#train-table > tbody").append(newRow);

})
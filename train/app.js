$(document).ready(function() {


var config = {
    apiKey: "AIzaSyBDREkEzdTbK0G3myM6929GSzB0yO06bjY",
    authDomain: "train-9bccc.firebaseapp.com",
    databaseURL: "https://train-9bccc.firebaseio.com",
    projectId: "train-9bccc",
    storageBucket: "train-9bccc.appspot.com",
    messagingSenderId: "783643610692"
  };


firebase.initializeApp(config);
var database = firebase.database();

$('#addTrainBtn').on("click", function() {


  console.log("внутри!!!!");
  var nameTrain = $("#trainNameInput").val().trim();
  var dstn = $("#destinationInput").val().trim();
  var startTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  var newTrain = {
      name: nameTrain,
      place: dstn,
      ftrain: startTrain,
      freq: frequency
    }
debugger;
  database.ref().push(newTrain);
  console.log(newTrain.name);
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  return false;
});
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  var nameTrain = childSnapshot.val().name;
  var dstn = childSnapshot.val().place;
  var startTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  var firstTimeConverted = moment(startTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(startTrain);
  console.log("Difference in Time: " + timeDiff);
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
  var minToTrain = frequency - timeRemainder;
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + nameTrain + "</td><td>" + dstn + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});

})
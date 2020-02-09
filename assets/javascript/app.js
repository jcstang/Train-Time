$(document).ready(function () {

  var config = {
      apiKey:       "AIzaSyB67m85nNRzS49VhIff-QAQb8sLi1SwyFY",
      authDomain:   "dinosaur-train.firebaseio.com",
      databaseURL:  "https://dinosaur-train.firebaseio.com/"
  };

  firebase.initializeApp(config);
  var database = firebase.database();


  // found this solution on stackoverflow
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }



  // ===================================================
  // has a child been added to DB?
  // ===================================================
  database.ref().on('child_added', function(child_snapshot) {

      var trainData = child_snapshot.val();
      const row = $('<tr>');
      

      const trainName = $('<td>').text(trainData.name);
      const trainDest = $('<td>').text(trainData.destination);
      const firstTrainTime = $('<td>').text(trainData.firstTrainTime);
      var trainFrequency = $('<td>').text(' ');

      row
          .append(trainName)
          .append(trainDest)
          .append(firstTrainTime)
          .append(trainFrequency);
      
      $('tbody').append(row);


  });



  // ===================================================
  // submit new train form
  // ===================================================
  $('button[type="submit"]').on('click', function (event) {
      event.preventDefault();

      var trainName = $('#train-input').val();

      var trainDestination = $('#dest-input').val().trim();
      var trainFirstTime = $('#first-train-input').val().trim();
      var trainFrequency = $('#freq-input').val().trim();

      console.log(trainName, trainDestination, trainFirstTime, trainFrequency);
      

      database.ref().push({
          name: trainName,
          destination: trainDestination,
          firstTrainTime: trainFirstTime,
          trainFrequency: trainFrequency
      });

  });

});
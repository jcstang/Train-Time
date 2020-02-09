$(document).ready(function () {

  var config = {
      apiKey:       "AIzaSyB67m85nNRzS49VhIff-QAQb8sLi1SwyFY",
      authDomain:   "dinosaur-train.firebaseio.com",
      databaseURL:  "https://dinosaur-train.firebaseio.com/"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(tz);
  var d = new Date();
  var unixTimeNow = d.getTime();
  console.log('unix time now: ', unixTimeNow);
  // var dateString = moment.unix(employeeData.startDate).format('MM/DD/YYYY'); // input: 1273816800, output: 05/14/2010
  var timeNow = moment.unix( unixTimeNow ).format();
  console.log('moment.calendar ', moment().calendar() );
  console.log('18 min ago: ', moment().startOf('hour').fromNow() );


  // THIS IS GOOD
  // this spits out an object of time 30 mins ago. 
  console.log('thing ', moment().subtract(30, 'minutes') );

  
  // TODO: get now and see what one is next
  
  


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
      var trainFrequency = $('<td>').text(trainData.trainFrequency);
      // const firstTrainTime = $('<td>').text(trainData.firstTrainTime);
      // TODO: calc the next arrival time based on first train and freq and current time
      var nextArrival = $('<td>').text( moment().calendar() );
      // TODO: above calculated next arrival time delta to right now. Next train in 29mins.
      var minAway = $('<td>').text('Next train in YY mins');

      row
          .append(trainName)
          .append(trainDest)
          .append(trainFrequency)
          .append(nextArrival)
          .append(minAway);
          // .append(firstTrainTime)
      
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
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
      // var employeeData = child_snapshot.val();
      var trainData = child_snapshot.val();

      const row = $('<tr>');

      // OLD DATA
      // const name = $('<td>').text(employeeData.name);
      // const role = $('<td>').text(employeeData.role);
      // var dateString = moment.unix(employeeData.startDate).format('MM/DD/YYYY'); // input: 1273816800, output: 05/14/2010
      // const startDate = $('<td>').text( dateString );

      
      
      // ===== diff in months,  from start date to now ==============
      // var timeNow = moment(Date.now());
      // var diffMonths = timeNow.diff( moment(dateString), 'months', true );
      // var howManyMonthsWorked = Math.floor(diffMonths);
      
      // =============== calc totalBilled ===========================
      // var howMuchEarned = employeeData.monthlyRate * howManyMonthsWorked;
      // console.log('howMuchEarned: ', howMuchEarned);
      // howMuchEarned = howMuchEarned.toFixed(2);
      // console.log('howMuchEarned: ', howMuchEarned);
      
      
      // const monthsWorked = $('<td>').text('');
      // const monthsWorked = $('<td>').text(howManyMonthsWorked);
      // const monthlyRate = $('<td>').text(employeeData.monthlyRate);
      // const totalBilled = $('<td>').text('$ ' + numberWithCommas(howMuchEarned) );
      
      // row
      //     .append(name)
      //     .append(role)
      //     .append(startDate)
      //     .append(monthsWorked)
      //     .append(monthlyRate)
      //     .append(totalBilled);
      
      // $('tbody').append(row);
      

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

      // var name = $('#employee-name').val();
      var trainName = $('#train-input').val();
      // console.log(trainName);
      
      // var role = $('#role').val();
      var trainDestination = $('#dest-input').val().trim();
      // var startDate = $('#start-date').val();
      var trainFirstTime = $('#first-train-input').val().trim();
      // var monthlyRate = $('#monthly-rate').val();
      var trainFrequency = $('#freq-input').val().trim();

      console.log(trainName, trainDestination, trainFirstTime, trainFrequency);
      

      database.ref().push({
          // name: name,
          // role: role,
          // startDate: moment(startDate, 'MM/DD/YYYY').format('X'),
          // monthlyRate: monthlyRate
          name: trainName,
          destination: trainDestination,
          firstTrainTime: trainFirstTime,
          trainFrequency: trainFrequency
      });

  });

});
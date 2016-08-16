'use strict';

/*jshint esversion: 6 */
function drawVisualization(p) {
  $('#holder').show();
  var header = '<th>First Name</th><th>Last Name</th><th>Gender</th><th>Birth Date</th><th>Age</th><th>Height</th><th>Systolic Blood Pressure</th><th>Diastolic Blood Pressure</th>';
  $('#header').html(header);
  $('#fname').html(p.fname);
  $('#lname').html(p.lname);
  $('#gender').html(p.gender);
  $('#birthday').html(p.birthday);
  $('#age').html(p.age);
  $('#height').html(p.obv.height);
  $('#systolicbp').html(p.obv.systolicbp);
  $('#diastolicbp').html(p.obv.diastolicbp);
}
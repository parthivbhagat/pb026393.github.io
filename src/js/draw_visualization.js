/*jshint esversion: 6 */
function drawVisualization(p) { 
  $('#holder').show();
  let header = '<th>First Name</th><th>Last Name</th><th>Gender</th><th>Birth Date</th><th>Age</th><th>Height</th>';
  $('#header').html(header); 
  $('#fname').html(p.fname);
  $('#lname').html(p.lname);
  $('#gender').html(p.gender);
  $('#birthday').html(p.birthday);
  $('#age').html(p.age);
  $('#height').html(p.height);
}
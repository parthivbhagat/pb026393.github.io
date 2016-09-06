'use strict';

/*jshint esversion: 6 */
function drawVisualization(p) {
  $('#holder').show();
  $('#fname').html(p.fname);
  $('#lname').html(p.lname);
  $('#gender').html(p.gender);
  $('#birthday').html(p.birthday);
  $('#age').html(p.age);
  $('#height').html(p.obv.height);
  $('#systolicbp').html(p.obv.systolicbp);
  $('#diastolicbp').html(p.obv.diastolicbp);
  $('#ldl').html(p.obv.ldl);
  $('#hdl').html(p.obv.hdl);
}
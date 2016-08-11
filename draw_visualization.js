/*jshint esversion: 6 */
function drawVisualization(p) { 
    let table = '<table><thead><th>First Name</th><th>Last Name</th><th>Gender</th><th>Birth Date</th><th>Age</th><th>Height</th></thead><tbody>';
    table += '<tr>';            
    table += '<td>' + p.fname.value + '</td>';
    table += '<td>' + p.lname.value + '</td>';
    table += '<td>' + p.gender.value + '</td>';
    table += '<td>' + p.birthday.value + '</td>';
    table += '<td>' + p.age.value + '</td>';
    table += '<td>' + p.height.value + '</td>';
    table += '</tr>';
    table += '</tbody></table>';
    $('#holder').html(table);  
}
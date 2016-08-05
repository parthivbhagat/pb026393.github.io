var draw_visualization = function(p) {
    var table = '<table><thead><th>First Name</th><th>Last Name</th><th>Gender</th><th>Birth Date</th><th>Age</th></thead><tbody>';
    table += '<tr>';            
    table += '<td>' + p.givenName.value + '</td>';
    table += '<td>' + p.familyName.value + '</td>';
    table += '<td>' + p.gender.value + '</td>';
    table += '<td>' + p.birthday.value + '</td>';
    table += '<td>' + p.age.value + '</td>';
    table += '</tr>';
    table += '</tbody></table>';
    $('#holder').html(table);
};
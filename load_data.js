(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    FHIR.oauth2.ready(function(smart){
      var patient = smart.patient;
      var pt = patient.read();
     
      $.when(pt).done(function(patient){
        var gender = patient.gender;
        var dob = new Date(patient.birthDate);     
        var day = dob.getDate();
        var monthIndex = dob.getMonth() + 1;
        var year = dob.getFullYear();

        var dobStr = monthIndex + '/' + day + '/' + year;
        
        var fname = patient.name[0].given.join(" ");
        var lname = patient.name[0].family.join(" ");
        var age = parseInt(calculateAge(dob));
        
        p = defaultPatient();
        p.birthday = {value:dobStr};
        p.gender = {value:gender};
        p.fname = {value:fname};
        p.lname = {value:lname};
        p.age = {value:age};
        ret.resolve(p);
    
      });
    });
    return ret.promise();
  };
  
  function isLeapYear(year) {
    return new Date(year, 1, 29).getMonth() == 1;
  }

  function calculateAge(date) {
    var d = new Date(date), now = new Date();
    var years = now.getFullYear() - d.getFullYear();
    d.setFullYear(d.getFullYear() + years);
    if (d > now) {
        years--;
        d.setFullYear(d.getFullYear() - 1);
    }
    var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
    return years + days / (isLeapYear(now.getFullYear()) ? 366 : 365);
  }

  
  function defaultPatient(){
    return {
     'fname' : {'value': null}
    ,'lname' : {'value': null}
    ,'gender' : {'value': null}
    ,'birthday' : {'value': null}
    ,'age' : {'value': null}
    }
  };


})(window);
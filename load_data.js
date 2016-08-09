/*jshint esversion: 6 */
(function(window){
  window.extractData = function() {
    const ret = $.Deferred();

    FHIR.oauth2.ready(onReady, onError);

    function onReady(smart)  {
      const patient = smart.patient;
      const pt = patient.read();
      
      $.when(pt).fail(onError);

      $.when(pt).done(function(patient) {
        const gender = patient.gender;
        const dob = new Date(patient.birthDate);     
        const day = dob.getDate();
        const monthIndex = dob.getMonth() + 1;
        const year = dob.getFullYear();

        const dobStr = monthIndex + '/' + day + '/' + year;
        
        const fname = patient.name[0].given.join(" ");
        const lname = patient.name[0].family.join(" ");
        const age = parseInt(calculateAge(dob));
        
        p = defaultPatient();
        p.birthday = {value:dobStr};
        p.gender = {value:gender};
        p.fname = {value:fname};
        p.lname = {value:lname};
        p.age = {value:age};
        ret.resolve(p);
    
      });
    }


    function onError() {
      console.log("Loading error", arguments);
      ret.reject();
    }
    
    return ret.promise();
  };
  
  function isLeapYear(year) {
    return new Date(year, 1, 29).getMonth() === 1;
  }

  function calculateAge(date) {
    const d = new Date(date), now = new Date();
    let years = now.getFullYear() - d.getFullYear();
    d.setFullYear(d.getFullYear() + years);
    if (d > now) {
        years--;
        d.setFullYear(d.getFullYear() - 1);
    }
    const days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
    return years + days / (isLeapYear(now.getFullYear()) ? 366 : 365);
  }

  
  function defaultPatient() {
    return {
     'fname' : {'value': null},
     'lname' : {'value': null},
     'gender' : {'value': null},
     'birthday' : {'value': null},
     'age' : {'value': null}
    };
  }


})(window);
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
		var monthIndex = dob.getMonth();
		var year = dob.getFullYear();

		var dobStr = monthIndex + '/' + day + '/' + year;
		
		var fname = patient.name[0].given.join(" ");
		var lname = patient.name[0].family.join(" ");
		var age = calculateAge(dob);
		
		p = defaultPatient();
		p.birthday = {value:dobStr};
		p.gender={value:gender};
		p.givenName={value:fname};
		p.familyName={value:lname};
		p.age = {value:age};
		ret.resolve(p);
		
      });
    });
    return ret.promise();
  };
  
  function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  
  function defaultPatient(){
	return {
      'givenName':    {'value': null}
	  ,'familyName':  {'value': null}
	  ,'gender':      {'value': null}
	  ,'birthday':    {'value': null}
	  ,'age':         {'value': null}
    }
  };


})(window);
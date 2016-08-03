(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    FHIR.oauth2.ready(function(smart){
      var patient = smart.patient;
      var pt = patient.read();
     
      $.when(pt).done(function(patient){
		 var gender = patient.gender;
		 dob = new XDate(patient.birthDate);
		 age = Math.floor(dob.diffYears(new XDate()));
		 var fname = patient.name[0].given.join(" "),
		 lname = patient.name[0].family.join(" ");
		 
		  p = defaultPatient();
		  p.birthday = {value:dob};
		  p.age = {value:age};
		  p.gender={value:gender};
		  p.givenName={value:fname};
		  p.familyName={value:lname};
		  
		  ret.resolve(p);
      });
    });
    return ret.promise();
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
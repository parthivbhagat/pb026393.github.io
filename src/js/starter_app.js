(function(window){
  window.extractData = function() {
    var ret = $.Deferred(); 
  
    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }     
    function defaultOnFail(promise, defaultValue) {
      var deferred = $.Deferred();
      $.when(promise).then(
          function (data) {
            deferred.resolve(data);
          },
          function () {
            deferred.resolve(defaultValue);
          }
      );
      return deferred.promise();
    };

    function get(url) {
	  // Return a new promise.
	  	return new Promise(function(resolve, reject) {
	    // Do the usual XHR stuff
	    var req = new XMLHttpRequest();
	    req.open('GET', url);

	    req.onload = function() {
	      // This is called even on 404 etc
	      // so check the status
	      if (req.status == 200) {
	        // Resolve the promise with the response text
	        resolve(JSON.parse(req.response));
	      }
	      else {
	        // Otherwise reject with the status text
	        // which will hopefully be a meaningful error
	        reject(Error(req.statusText));
	      }
	    };

	    // Handle network errors
	    req.onerror = function() {
	      reject(Error("Network Error"));
	    };

	    // Make the request
	    req.send();
	  });
	}

    function translate(patientfield, query){
				//alert("er")
        console.log("patient: " +  patientfield);
		var targeturl = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCqAgf0Umm5IwbAUCDjxwjscmLMRaS2O08&source=en&target=hi&q=" + query;
		var retvalue = "";
		console.log(targeturl);
        
          var deferred = $.Deferred();
	      $.when($.ajax({
					type: "GET",
					url: targeturl,
					data: "", //ur data to be sent to server
					contentType: "application/json",  
					dataType: "json"})).then(
	         function(response) {
					  console.log(response);
				  	  var obj = $.parseJSON(JSON.stringify(response));
					  console.log(obj.data);
					  $.each(obj.data.translations, function(key , value) {
		                    console.log("inside:" + value.translatedText);
							deferred.resolve(value.translatedText); 
							
						});
						
			 },
	          function(error) {
		  		deferred.reject("error"); 
			});
	      
	      
		
				
			
        console.log("retvalue:" + deferred.promise());
		return deferred.promise();		

	};
	
    function onReady(smart)  {
      
      if (smart.hasOwnProperty('patient')) { 

        var patient = smart.patient;
        var pt = patient.read();
		
        var obv = smart.patient.api.fetchAll({
                      type: 'Observation', 
                      query: {
                        code: {
                          $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
                                'http://loinc.org|8480-6', 'http://loinc.org|2085-9',
                                'http://loinc.org|2089-1', 'http://loinc.org|55284-4',
								'http://loinc.org|8867-4', 'http://loinc.org|20564-1',
								'http://loinc.org|29463-7', 'http://loinc.org|8310-5']
                              }
                             }
                    });
		
		var familyHistoryFetch = defaultOnFail(smart.patient.api.fetchAll({type: "RelatedPerson"}), []);
        
        $.when(pt, obv).fail(onError);

        $.when(pt, obv).done(function(patient, obv) {
		  console.log(patient);
		  
          var byCodes = smart.byCodes(obv, 'code');
          var gender =  patient.gender;
          var dob = new Date(patient.birthDate);     
          var day = dob.getDate(); 
          var monthIndex = dob.getMonth() + 1;
          var year = dob.getFullYear();

          var dobStr = monthIndex + '/' + day + '/' + year;
          var fname = '';
          var lname = '';

          if(typeof patient.name[0].given !== 'undefined') {
            fname = patient.name[0].given.join(' ');            
          }
		  
		  if(typeof patient.name[0].family !== 'undefined') {
            lname = patient.name[0].family.join(' ');
          }
          var height = byCodes('8302-2');
          var systolicbp = getBloodPressureValue(byCodes('55284-4'),'8480-6');
          var diastolicbp = getBloodPressureValue(byCodes('55284-4'),'8462-4');
          var hdl = byCodes('2085-9');
          var ldl = byCodes('2089-1');
          var hr = byCodes('8867-4');
		      var spo2 = byCodes('20564-1');
		      var weight = byCodes('29463-7');
		      var temp = byCodes('8310-5');
          var p = defaultPatient();          
          p.birthdate = dobStr;
          p.gender = gender;
          translate(p, fname).then(
		    function (data) {
		    	console.log("inside traslate" + data);
		        $("#fname").html(data);
		    }, 
		    function (response) {
		        alert(response);
		    } 
		  );         
          p.lname = lname;
          p.age = parseInt(calculateAge(dob));

          if(typeof height[0] != 'undefined' && typeof height[0].valueQuantity.value != 'undefined' && typeof height[0].valueQuantity.unit != 'undefined') {
            p.height = height[0].valueQuantity.value + ' ' + height[0].valueQuantity.unit;
          }
          
          if(typeof systolicbp != 'undefined')  {
            p.systolicbp = systolicbp;
          }

          if(typeof diastolicbp != 'undefined') {
            p.diastolicbp = diastolicbp;
          }
          
          if(typeof hdl[0] != 'undefined' && typeof hdl[0].valueQuantity.value != 'undefined' && typeof hdl[0].valueQuantity.unit != 'undefined') {
            p.hdl = hdl[0].valueQuantity.value + ' ' + hdl[0].valueQuantity.unit;
          }

          if(typeof ldl[0] != 'undefined' && typeof ldl[0].valueQuantity.value != 'undefined' && typeof ldl[0].valueQuantity.unit != 'undefined') {
            p.ldl = ldl[0].valueQuantity.value + ' ' + ldl[0].valueQuantity.unit;
          }
		  
		  if(typeof hr[0] != 'undefined' && typeof hr[0].valueQuantity.value != 'undefined' &&  hr[0].valueQuantity.unit != 'undefined') {
            p.hr = hr[0].valueQuantity.value + ' ' + hr[0].valueQuantity.unit;
          }
		  
		  if(typeof spo2[0] != 'undefined' && typeof spo2[0].valueQuantity.value != 'undefined' &&  spo2[0].valueQuantity.unit != 'undefined') {
            p.spo2 = spo2[0].valueQuantity.value + ' ' + spo2[0].valueQuantity.unit;
          }
		  
		  if(typeof weight[0] != 'undefined' && typeof weight[0].valueQuantity.value != 'undefined' &&  weight[0].valueQuantity.unit != 'undefined') {
            p.weight = weight[0].valueQuantity.value + ' ' + weight[0].valueQuantity.unit;
          }

          if(typeof temp[0] != 'undefined' && typeof temp[0].valueQuantity.value != 'undefined' &&  temp[0].valueQuantity.unit != 'undefined') {
            p.temp = temp[0].valueQuantity.value + ' ' + temp[0].valueQuantity.unit;
          }
	      console.log(p);
          ret.resolve(p);
        });
      } else { 
        onError();
      }      
    }
    
    FHIR.oauth2.ready(onReady, onError);
    return ret.promise();

  };

  function defaultPatient(){
    return {
      fname: {value: ''},
      lname: {value: ''},
      gender: {value: ''},
      birthdate: {value: ''},
      age: {value: ''},
      height: {value: ''},
      systolicbp: {value: ''},
      diastolicbp: {value: ''},
      ldl: {value: ''},
      hdl: {value: ''},
	    hr: {value: ''},
	    spo2: {value: ''},
	    weight: {value: ''},
	    temp: {value: ''},
	    fatherName: {value: ''},
      motherName: {value: ''}
    }
  };
  

  function getBloodPressureValue(BPObservations, typeOfPressure){
    var formattedBPObservations = [];
    BPObservations.forEach(function(observation){
      var BP = observation.component.find(function(component){
        return component.code.coding.find(function(coding) {
          return coding.code == typeOfPressure;
        });
      });
      if (BP) { 
        observation.valueQuantity = BP.valueQuantity;
        formattedBPObservations.push(observation);
      }
    });
    console.log(formattedBPObservations);
    if(typeof formattedBPObservations[0].valueQuantity != 'undefined'){
    	if (typeof formattedBPObservations[0].valueQuantity.value != 'undefined' && formattedBPObservations[0].valueQuantity.unit != 'undefined') {
	      return formattedBPObservations[0].valueQuantity.value + ' ' + formattedBPObservations[0].valueQuantity.unit ;
	    }
	    else {
	      return undefined;
	    }
    }else{
    	return undefined;
    }    
    
  }

  function isLeapYear(year) {
    return new Date(year, 1, 29).getMonth() === 1;
  }

  function calculateAge(date) {
    if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())) {
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
    else {
      return undefined;
    }
    
  }


  window.drawVisualization = function(p) { 
    $('#holder').show();
    $('#loading').hide();
    $('#fname').html(p.fname);
    $('#lname').html(p.lname);
    $('#gender').html(p.gender);
    $('#birthdate').html(p.birthdate);  
    $('#age').html(p.age);
    
    $('#height').html(p.height.substr(0,p.height.indexOf(' ')));
    //$('#height').html(p.height);
    
    var sysnum = p.systolicbp.substr(0,p.systolicbp.indexOf(' '));
    $('#systolicbp').html(sysnum);
    //$('#systolicbp').html(p.systolicbp);
    var diasnum = p.diastolicbp.substr(0,p.diastolicbp.indexOf(' '));    
    $('#diastolicbp').html(diasnum);
    //$('#diastolicbp').html(p.diastolicbp);
    
    try{ $('#ldl').html(p.ldl.substr(0,p.ldl.indexOf(' '))); }
    catch(e){}
    //$('#ldl').html(p.ldl);
    $('#hdl').html(p.hdl.substr(0,p.hdl.indexOf(' ')));
    //$('#hdl').html(p.hdl);
    
    var hrnum = p.hr.substr(0,p.hr.indexOf(' '));    
    $('#hr').html(hrnum);
    //$('#hr').html(p.hr);
    $('#spO2').html(p.spo2);
    $('#weight').html(p.weight);  
    $('#temp').html(p.temp);
    $('#fatherName').html(p.fatherName);
    $('#motherName').html(p.motherName);
    
    $('#lastUpdated').html('Dec 08, 2016  16:21 CST');
    
  };

})(window);
(function(window){
  window.extractData = function() {
    var ret = $.Deferred(); 
	
    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }     

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
                                'http://loinc.org|2089-1']
                              }
                             }
                    });
        
        $.when(pt, obv).fail(onError);

        $.when(pt, obv).done(function(patient, obv) {
          var byCodes = smart.byCodes(obv, 'code');
          var gender = patient.gender;
          var dob = new Date(patient.birthDate);     
          var day = dob.getDate(); 
          var monthIndex = dob.getMonth() + 1;
          var year = dob.getFullYear();

          var dobStr = monthIndex + '/' + day + '/' + year;
          var fname = '';
          var lname = '';

          if(typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given.join(' ');
            lname = patient.name[0].family.join(' ');
          }

          var height = byCodes('8302-2');
          var systolicbp = byCodes('8480-6');
          var diastolicbp = byCodes('8462-4');
          var hdl = byCodes('2085-9');
          var ldl = byCodes('2089-1');

          var p = defaultPatient();          
          p.birthday = dobStr;
          p.gender = gender;
          p.fname = fname;
          p.lname = lname;
          p.age = parseInt(calculateAge(dob));

          if(typeof height[0] != 'undefined') {
            p.height = height[0].valueQuantity.value + ' ' + height[0].valueQuantity.unit;
          }
          
          if(typeof systolicbp[0] != 'undefined') {
            p.systolicbp = systolicbp[0].valueQuantity.value + 
                                  ' ' + systolicbp[0].valueQuantity.unit;
          }

          if(typeof diastolicbp[0] != 'undefined') {
            p.diastolicbp = diastolicbp[0].valueQuantity.value + 
                                  ' ' + diastolicbp[0].valueQuantity.unit;
          }
          
          if(typeof hdl[0] != 'undefined') {
            p.hdl = hdl[0].valueQuantity.value + ' ' + hdl[0].valueQuantity.unit;
          }

          if(typeof ldl[0] != 'undefined') {
            p.ldl = ldl[0].valueQuantity.value + ' ' + ldl[0].valueQuantity.unit;
          }
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
      birthday: {value: ''},
      age: {value: ''},
      height: {value: ''},
      systolicbp: {value: ''},
      diastolicbp: {value: ''},
      ldl: {value: ''},
      hdl: {value: ''},
    };
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
    $('#birthday').html(p.birthday);  
    $('#age').html(p.age);
    $('#height').html(p.height);
    $('#systolicbp').html(p.systolicbp);
    $('#diastolicbp').html(p.diastolicbp);
    $('#ldl').html(p.ldl);
    $('#hdl').html(p.hdl);
  }

})(window);
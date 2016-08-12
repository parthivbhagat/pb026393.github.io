/*jshint esversion: 6 */
(function(window){
  window.extractData = function() {
    const ret = $.Deferred();
    
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
       'age' : {'value': null},
       'height' : {'value' : null}
      };
    }

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) { 
        const patient = smart.patient;
        const pt = patient.read();
        const obv = smart.patient.api.fetchAll({type: 'Observation', query: {code: {$or: ['http://loinc.org|8302-2']}}});

        $.when(pt, obv).fail(onError);

        $.when(pt, obv).done(function(patient) {
          const byCodes = smart.byCodes(obv, 'code');
          const gender = patient.gender;
          const dob = new Date(patient.birthDate);     
          const day = dob.getDate(); 
          const monthIndex = dob.getMonth() + 1;
          const year = dob.getFullYear();

          const dobStr = monthIndex + '/' + day + '/' + year;
          
          const fname = patient.name[0].given.join(' ');
          const lname = patient.name[0].family.join(' ');
          const age = parseInt(calculateAge(dob));
          
          const height = byCodes('8302-2');
        
          let p = defaultPatient();
          p.birthday = {value:dobStr};
          p.gender = {value:gender};
          p.fname = {value:fname};
          p.lname = {value:lname};
          p.age = {value:age};

          if(typeof height[0] !== 'undefined'){
            p.height = {value:height[0].valueQuantity.value};
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
  
})(window);
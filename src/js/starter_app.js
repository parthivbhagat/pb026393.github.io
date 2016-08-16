/*jshint esversion: 6 */
import Util from './util';
import Patient from './patient';

class StarterApp {
  static extractData(){
   
    const ret = $.Deferred();     
    
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

        $.when(pt, obv).done(function(patient, obv) {
          const byCodes = smart.byCodes(obv, 'code');
          const gender = patient.gender;
          const dob = new Date(patient.birthDate);     
          const day = dob.getDate(); 
          const monthIndex = dob.getMonth() + 1;
          const year = dob.getFullYear();

          const dobStr = monthIndex + '/' + day + '/' + year;
          
          const fname = patient.name[0].given.join(' ');
          const lname = patient.name[0].family.join(' ');
          
          const height = byCodes('8302-2');
        
          let p = new Patient();
          p.birthday = dobStr;
          p.gender = gender;
          p.fname = fname;
          p.lname = lname;
          p.age = parseInt(Util.calculateAge(dob));

          if(typeof height[0] !== 'undefined'){
            p.height = height[0].valueQuantity.value;
          }
          
          ret.resolve(p);
        });
      } else { 
        onError();
      }
      
    }

    FHIR.oauth2.ready(onReady, onError);

    return ret.promise();
  }
}

export default StarterApp;

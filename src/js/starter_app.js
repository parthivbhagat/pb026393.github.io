/*jshint esversion: 6 */
import Util from './util';
import Patient from './patient';
// jshint unused:false 
import FHIRClient from '../../node_modules/fhirclient/fhir-client.js';
import $ from '../../node_modules/jquery/src/jquery';

class StarterApp {
  static extractData() {
   
    const ret = $.Deferred();     
    
    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }     

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) { 
        const patient = smart.patient;
        const pt = patient.read();
        const obv = smart.patient.api.fetchAll({
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
          const byCodes = smart.byCodes(obv, 'code');
          const gender = patient.gender;
          const dob = new Date(patient.birthDate);     
          const day = dob.getDate(); 
          const monthIndex = dob.getMonth() + 1;
          const year = dob.getFullYear();

          const dobStr = monthIndex + '/' + day + '/' + year;
          let fname = '';
          let lname = '';

          if(typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given.join(' ');
            lname = patient.name[0].family.join(' ');
          }

          const height = byCodes('8302-2');
          const systolicbp = byCodes('8480-6');
          const diastolicbp = byCodes('8462-4');
          const hdl = byCodes('2085-9');
          const ldl = byCodes('2089-1');

          let p = new Patient();          
          p.birthday = dobStr;
          p.gender = gender;
          p.fname = fname;
          p.lname = lname;
          p.age = parseInt(Util.calculateAge(dob));

          if(typeof height[0] !== 'undefined') {
            p.obv.height = height[0].valueQuantity.value + ' ' + height[0].valueQuantity.unit;
          }
          
          if(typeof systolicbp[0] !== 'undefined') {
            p.obv.systolicbp = systolicbp[0].valueQuantity.value + 
                                  ' ' + systolicbp[0].valueQuantity.unit;
          }

          if(typeof diastolicbp[0] !== 'undefined') {
            p.obv.diastolicbp = diastolicbp[0].valueQuantity.value + 
                                  ' ' + diastolicbp[0].valueQuantity.unit;
          }
          
          if(typeof hdl[0] !== 'undefined') {
            p.obv.hdl = hdl[0].valueQuantity.value + ' ' + hdl[0].valueQuantity.unit;
          }

          if(typeof ldl[0] !== 'undefined') {
            p.obv.ldl = ldl[0].valueQuantity.value + ' ' + ldl[0].valueQuantity.unit;
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

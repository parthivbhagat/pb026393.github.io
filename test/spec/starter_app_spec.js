import StarterApp from 'js/starter_app';
import Patient from 'js/patient';

describe ('StarterApp', function() {
  
  describe ('FHIR service', function (){
    it ('checked if ready method gets invoked', function () {
      var func1 = function(){};
      var func2 = function(){};
      spyOn(FHIR.oauth2, 'ready');
      FHIR.oauth2.ready(func1, func2);
      expect(FHIR.oauth2.ready).toHaveBeenCalledWith(func1, func2);     
    });
  });
  
  describe ('Extract Data', function (){
    it ('checked if extractData method gets invoked', function () {
      spyOn(StarterApp, 'extractData');
      StarterApp.extractData();
      expect(StarterApp.extractData).toHaveBeenCalled();      
    });
  });
 
  describe ('Patient Constructor', function (){
    it ('checked if patient Constructor returns object with blank elements', function () {
      var patient = new Patient();      
      expect(patient.fname).toEqual('');
      expect(patient.lname).toEqual('');
      expect(patient.gender).toEqual('');
      expect(patient.birthday).toEqual('');
      expect(patient.age).toEqual('');
      expect(patient.obv.height).toEqual('');
      expect(patient.obv.systolicbp).toEqual('');
      expect(patient.obv.diastolicbp).toEqual('');
    });
  });




});

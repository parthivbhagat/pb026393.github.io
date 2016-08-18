import StarterApp from 'js/starter_app';
import Patient from 'js/patient';

describe ('StarterApp', function() {
  
  describe ('FHIR service', function (){
    it ('checked if ready method gets invoked', function () {
      var mock = jasmine.createSpyObj('FHIR.oauth2', ['ready']);
      mock.ready();
      expect(mock.ready).toBeDefined();
      expect(mock.ready).toHaveBeenCalled();
     
    });
  });
  
  describe ('Extract Data', function (){
    it ('checked if onReady method gets invoked', function () {
      var mock = jasmine.createSpyObj('StarterApp.extractData', ['onReady']);
      mock.onReady();
      expect(mock.onReady).toBeDefined();
      expect(mock.onReady).toHaveBeenCalled();      
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

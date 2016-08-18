import Util from 'js/util';

describe ('Util', function() {

  describe ('computeAgeFromBirthDate', function () {
    it ('returns undefined for invalid date object', function () {
      var date = new Date('03/04/fff');
      var mock = jasmine.createSpyObj('Util', ['calculateAge']);
      var response = mock.calculateAge(date);
      expect(mock.calculateAge).toBeDefined();
      expect(mock.calculateAge).toHaveBeenCalledWith(date);
      expect(response).toEqual(undefined);
    });
  });

});

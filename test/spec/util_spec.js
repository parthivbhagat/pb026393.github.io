import Util from 'js/util';

describe ('Util', function() {

  describe ('computeAgeFromBirthDate', function () {
    it ('returns undefined for invalid date object', function () {
      var date = new Date('03/04/fff');
      var response = Util.calculateAge(date);
      expect(response).toEqual(undefined);
    });
  });
  
  describe ('computeAgeFromBirthDate', function () {
    it ('returns valid age for valid date object', function () {
      var date = new Date('03/04/2000');
      var response = parseInt(Util.calculateAge(date));
      expect(response).toEqual(16);
    });
  });
});

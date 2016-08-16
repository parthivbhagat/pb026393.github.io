/*jshint esversion: 6 */
import Observations from './observations';

class Patient {  
  constructor() {
    this.fname = '';
    this.lname = '';
    this.gender = '';
    this.birthday = '';
    this.age = '';
    this.obv = new Observations();
  }
}

export default Patient;
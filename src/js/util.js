/*jshint esversion: 6 */
class Util{
  static isLeapYear(year) {
    return new Date(year, 1, 29).getMonth() === 1;
  }

  static calculateAge(date) {
    const d = new Date(date), now = new Date();
    let years = now.getFullYear() - d.getFullYear();
    d.setFullYear(d.getFullYear() + years);
    if (d > now) {
      years--;
      d.setFullYear(d.getFullYear() - 1);
    }
    const days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
    return years + days / (this.isLeapYear(now.getFullYear()) ? 366 : 365);
  }
}

export default Util;
export default class Age {
  constructor() {
    // today info
    this._actualDate = new Date();
    this._actualDay = this._actualDate.getDate();
    this._actualMonth = this._actualDate.getMonth() + 1;
    this._actualYear = this._actualDate.getFullYear();

    // born day info
    this._bornDay = 24;
    this._bornMonth = 6;
    this._bornYear = 1997;

    this.myAge = 0;
  }

  calculate() {
    if (this._actualMonth < this._bornMonth) {
      this.myAge = this._actualYear - this._bornYear - 1;
    } else if (this._actualMonth > this._bornMonth) {
      this.myAge = this._actualYear - this._bornYear;
    } else if (this._actualMonth === this._bornMonth) {
      if (this._actualDay < this._bornDay) {
        this.myAge = this._actualYear - this._bornYear - 1;
      } else {
        this.myAge = this._actualYear - this._bornYear;
      }
    }

    return this.myAge;
  }
}
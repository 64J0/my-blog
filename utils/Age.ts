class Age {
  private _actualDate: Date;
  private _actualDay: number;
  private _actualMonth: number;
  private _actualYear: number;

  private _bornDay: number;
  private _bornMonth: number;
  private _bornYear: number;

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
  }

  getMyAge() {
    let myAge = 0;

    if (this._actualMonth < this._bornMonth) {
      myAge = this._actualYear - this._bornYear - 1;

    } else if (this._actualMonth > this._bornMonth) {
      myAge = this._actualYear - this._bornYear;
    } else if (this._actualMonth === this._bornMonth) {

      if (this._actualDay < this._bornDay) {
        myAge = this._actualYear - this._bornYear - 1;

      } else {
        myAge = this._actualYear - this._bornYear;

      }
    }

    return myAge;
  }
}

export default Age;
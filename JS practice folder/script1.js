// const Car = function (name, speed) {
//   this.name = name;
//   this.speed = speed;
// };

// Car.prototype.acceleration = function () {
//   return `${this.speed + 10}km/hr`;
// };
// Car.prototype.brake = function () {
//   return `${this.speed - 10}km/hr`;
// };

// const bmw = new Car('bmw', 200);
// const tata = new Car('TATA', 100);
// console.log(bmw.acceleration());
// console.log(tata.brake());

class Account {
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // protected property
    // this._movements = [];
    this.locale = navigator.language;
  }
  getMovements() {
    return this.#movements;
  }
  //   Public interface
  deposite(val) {
    this.#movements.push(val);
  }
  withdraw(val) {
    this.deposite(-val);
  }
  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposite(val);
    }
  }
}
const chhetri = new Account('Chhetri', 'Nep', 5555);
chhetri.requestLoan(5000);
chhetri.deposite(20);
chhetri.withdraw(200);
// console.log(chhetri.#movements);

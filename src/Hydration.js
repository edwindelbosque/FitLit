class Hydration {
  constructor(dataHydration) {
    this.userId = dataHydration.userID;
    this.date = dataHydration.date;
    this.numOunces = dataHydration.numOunces;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
class HydrationRepository {
  constructor(data, id) {
    this.data = data;
    this.id = id;
    this.user = this.getHydrationData();
    this.today = this.getCurrentDate();
  }

  getHydrationData() {
    return this.data.filter((user => user.userID === this.id));
  }

  getAllTimeAvg() {
    return Math.round(this.user.reduce((totalNumOz, ozPerDay) => {
      totalNumOz += ozPerDay.numOunces;
      return totalNumOz;
    }, 0) / this.user.length);
  }

  getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = `${yyyy}/${mm}/${dd}`;
    return today;
  }

  totalOzDay() {
    let foundUser = this.user.find(user => user.date === this.today);
    return foundUser.numOunces;
  }

  weeklyHydrationAvg() {
    const indexCurrentDay = this.user.findIndex(data => data.date === this.today);
    const lastWeekData = this.user.slice(indexCurrentDay - 6, indexCurrentDay + 1);
    return lastWeekData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}
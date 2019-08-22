class HydrationRepository {
  constructor(data, id) {
    this.data = data;
    this.userHydro = this.getHydrationData(id);
  }

  getHydrationData(id) {
    return this.data.filter((user => user.userID === id));
  }

  getAllTimeAvg(id) {
    return Math.round(this.getHydrationData(id).reduce((totalNumOz, ozPerDay) => {
      totalNumOz += ozPerDay.numOunces;
      return totalNumOz;
    }, 0) / this.getHydrationData(id).length);
  }

  getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = `${yyyy}/${mm}/${dd}`;
    console.log(today);
    return today;
  }

  totalOzDay() {
    return this.userHydro.find(user => user.date === this.getCurrentDate()).numOunces;
  }

  weeklyHydrationAvg() {
    const userData = this.userHydro;
    const indexCurrentDay = userData.findIndex(data => data.date === this.getCurrentDate());
    const lastWeekData = userData.splice(indexCurrentDay - 6, indexCurrentDay);
    console.log(indexCurrentDay);
    console.log(lastWeekData);
    return lastWeekData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}
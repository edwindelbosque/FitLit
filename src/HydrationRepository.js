class HydrationRepository {
  constructor(data) {
    this.data = data;
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

  totalOzDay(day) {
    return this.data.find(user => user.date === day).numOunces;
  }

  weeklyHydrationAvg(id, day) {
    const userData = this.getHydrationData(id);
    const indexLastDay = userData.findIndex(data => data.date === day);
    const lastWeekData = userData.splice(indexLastDay - 6, indexLastDay);
    return lastWeekData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}
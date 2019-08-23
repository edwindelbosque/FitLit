class SleepRepository {
  constructor(sleepData, id) {
    this.sleepData = sleepData;
    this.id = id;
    this.user = this.getSleepData();
  }

  getSleepData() {
    return this.sleepData.filter(user => user.userID === this.id);
  }

  getAllTimeAvg() {
    const totalHrs = this.user.reduce((totalHours, day) => {
      totalHours += day.hoursSlept;
      return totalHours;
    }, 0);
    return Math.round(totalHrs / this.user.length);
  }

  getQualitySleepAvg() {
    const sleepQualAvg = this.user.reduce((sleepQual, day) => {
      sleepQual += day.sleepQuality;
      return sleepQual;
    }, 0);
    return parseFloat((sleepQualAvg / this.user.length).toFixed(1));
  }

  getDailySleepHours(date) {
    return this.user.find(day => day.date === date).hoursSlept;
  }

  weeklySleepData(date) {
    let i = this.user.findIndex(day => day.date === date);
    return this.user.slice(i - 6, i + 1);
  }

  getWeeklyHours(date) {
    return this.weeklySleepData(date).map(day => {
      return { date: day.date, hoursSlept: day.hoursSlept };
    });
  }

  getWeeklyQuality(date) {
    return this.weeklySleepData(date).map(day => {
      return { date: day.date, sleepQuality: day.sleepQuality }
    });
  }

  getAvgQuality() {
    const avgQual = this.sleepData.reduce((totalQual, day) => {
      totalQual += day.sleepQuality;
      return totalQual;
    }, 0);
    return parseFloat((avgQual / this.sleepData.length).toFixed(1));
  }

  highestQualitySleep() {

  }

}

if (typeof module !== 'undefined') {
  module.exports = SleepRepository;
}
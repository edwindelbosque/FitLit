class ActivityRepository {
  constructor(id, activityData) {
    this.id = id;
    this.activityData = activityData;
    this.user = this.getUserLogs();
  }

  getUserLogs() {
    return this.activityData.filter(user => user.userID === this.id)
  }

  getMilesWalked(date, user) {
    const activityDate = this.user.find(log => log.date === date);
    const miles = (user.strideLength * activityDate.numSteps) / 5280;
    return parseFloat(miles.toFixed(1));
  }

  getMinutesActive(date) {
    const activityDate = this.user.find(log => log.date === date);
    return activityDate.minutesActive;
  }

  getAverageActivity(date) {
    const i = this.user.findIndex(log => log.date === date);
    const week = this.user.slice(i - 6, i + 1);
    const totalMinutes = week.reduce((totalHours, log) => {
      totalHours += log.minutesActive;
      return totalHours;
    }, 0);
    return Math.round(totalMinutes / week.length);
  }

  reachedDailyStepGoal(date, user) {
    const dateSteps = this.user.find(log => log.date === date).numSteps;
    const stepGoal = user.dailyStepGoal;
    return dateSteps >= stepGoal;
  }

  getAllTimeExceededSteps(user) {
    let exceededStepGoalDates = this.user.filter(log => log.numSteps >= user.dailyStepGoal);
    return exceededStepGoalDates.map(log => {
      return { "date": log.date, "numSteps": log.numSteps };
    });
  }

  getAllTimeStairClimb() {
    const maxFlightsClimbed = this.user.find(log => log.flightsOfStairs === Math.max.apply(Math, this.user.map(log => log.flightsOfStairs)));
    return { "date": maxFlightsClimbed.date, "flightsOfStairs": maxFlightsClimbed.flightsOfStairs }
  }

  getAverageStairsDay(date) {
    const filteredDate = this.activityData.filter(log => log.date === date);
    const totalStairs = filteredDate.reduce((total, log) => {
      total += log.flightsOfStairs;
      return total;
    }, 0);
    return Math.round(totalStairs / filteredDate.length);
  }

  getAverageStepsDay(date) {
    const filteredDate = this.activityData.filter(log => log.date === date);
    const totalSteps = filteredDate.reduce((total, log) => {
      total += log.numSteps;
      return total;
    }, 0);
    return Math.round(totalSteps / filteredDate.length);
  }

  getAvergageMinutesActive(date) {
    const filteredDate = this.activityData.filter(log => log.date === date);
    const totalMinutes = filteredDate.reduce((total, log) => {
      total += log.minutesActive;
      return total;
    }, 0);
    return Math.round(totalMinutes / filteredDate.length);
  }

}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
class ActivityRepository {
  constructor(id, activityData) {
    this.id = id;
    this.activityData = activityData;
    this.user = this.getUserLogs(id);
  }

  getUserLogs(id) {
    return this.activityData.filter(user => user.userID === id);
  }

  getUserDate(date) {
    return this.user.find(log => log.date === date);
  }

  getFilteredDate(date) {
    return this.activityData.filter(log => log.date === date);
  }

  getMilesWalked(date, user) {
    const miles = (user.strideLength * this.getUserDate(date).numSteps) / 5280;
    return parseFloat(miles.toFixed(1));
  }

  getMinutesActive(date) {
    return this.getUserDate(date).minutesActive;
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
    const stepGoal = user.dailyStepGoal;
    return this.getUserDate(date) >= stepGoal;
  }

  getAllTimeExceededSteps(user) {
    let exceededStepGoalDates = this.user.filter(log => {
      return log.numSteps >= user.dailyStepGoal;
    });
    return exceededStepGoalDates.map(log => {
      return { "date": log.date, "numSteps": log.numSteps };
    });
  }

  getAllTimeStairClimb() {
    const maxFlightsClimbed = this.user.find(log => {
      return log.flightsOfStairs === Math.max.apply(Math, this.user.map(log => {
        return log.flightsOfStairs;
      }));
    });
    return {
      "date": maxFlightsClimbed.date,
      "flightsOfStairs": maxFlightsClimbed.flightsOfStairs
    };
  }

  getAverageStairsDay(date) {
    const filteredDate = this.getFilteredDate(date);
    const totalStairs = filteredDate.reduce((total, log) => {
      total += log.flightsOfStairs;
      return total;
    }, 0);
    return Math.round(totalStairs / filteredDate.length);
  }

  getAverageStepsDay(date) {
    const filteredDate = this.getFilteredDate(date);
    const totalSteps = filteredDate.reduce((total, log) => {
      total += log.numSteps;
      return total;
    }, 0);
    return Math.round(totalSteps / filteredDate.length);
  }

  getAvergageMinutesActive(date) {
    const filteredDate = this.getFilteredDate(date);
    const totalMinutes = filteredDate.reduce((total, log) => {
      total += log.minutesActive;
      return total;
    }, 0);
    return Math.round(totalMinutes / filteredDate.length);
  }

  getKilometersWalked(date, user) {
    const miles = this.getMilesWalked(date, user);
    return parseFloat((miles * 1.609).toFixed(1));
  }

  getDailyStats(date, detail) {
    return this.getUserDate(date)[detail];
  }

  getWeeklyStats(date) {
    const index = this.user.findIndex(log => log.date === date);
    return this.user.slice(index - 6, index + 1);
  }

  getPositiveStepTrends() {
    return this.user.reduce((acc, day, index) => {
      if (index < 2) {
        return acc;
      }
      if ((day.numSteps > this.user[index - 1].numSteps) &&
        (this.user[index - 1].numSteps > this.user[index - 2].numSteps)) {
        acc.push(day.date);
      }
      return acc;
    }, []);
  }

  getNegativeStepTrends() {
    return this.user.reduce((acc, day, index) => {
      if (index < 2) {
        return acc;
      }
      if ((day.numSteps < this.user[index - 1].numSteps) &&
        (this.user[index - 1].numSteps < this.user[index - 2].numSteps)) {
        acc.push(day.date);
      }
      return acc;
    }, []);
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
class UserRepository {
  constructor(data, id) {
    this.data = data;
    this.id = id;
  }

  getUserData() {
    return this.data.find(user => user.id === this.id);
  }

  getAvgStep() {
    let totalStep = this.data.reduce((avg, user) => {
      return avg += user.dailyStepGoal;
    }, 0);
    return totalStep / this.data.length;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
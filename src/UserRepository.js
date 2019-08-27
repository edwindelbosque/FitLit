class UserRepository {
  constructor(data, id) {
    this.data = data;
    this.id = id;
    this.friendIds = this.getFriends();
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

  getFriends() {
    this.getUserData().friends;
  }

  getFriendsUserInfo() {
    let friendsData = [];
    let friendIds = this.friendIds;
    friendIds.forEach(friend => {
      let foundFriend = this.data.find(user => user.id === friend);
      friendsData.push(foundFriend);
    });
    return friendsData;
  }

  getFriendsActivityInfo() {
    let activityData = [];
    let friendsIds = this.friendIds;
    friendsIds.forEach(friend => {
      let foundData = activity.filter(user => user.id === friend);
      activityData.push(foundData);
    });
    return activityData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
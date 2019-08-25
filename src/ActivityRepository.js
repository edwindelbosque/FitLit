class ActivityRepository {
  constructor(id, activityData) {
    this.id = id;
    this.activityData = activityData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
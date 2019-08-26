const chai = require('chai');
const expect = chai.expect;
const ActivityRepository = require('../src/ActivityRepository');
const User = require('../src/User.js');
const UserRepository = require('../src/UserRepository');

let activityRepository, activityData, user, sampleData;

beforeEach(() => {
  activityData =
    [
      { "userID": 13, "date": "2019/08/18", "numSteps": 1242, "minutesActive": 64, "flightsOfStairs": 16 },
      { "userID": 13, "date": "2019/08/19", "numSteps": 3425, "minutesActive": 112, "flightsOfStairs": 4 },
      { "userID": 13, "date": "2019/08/20", "numSteps": 5321, "minutesActive": 140, "flightsOfStairs": 174 },
      { "userID": 13, "date": "2019/08/21", "numSteps": 12, "minutesActive": 846, "flightsOfStairs": 24 },
      { "userID": 13, "date": "2019/08/22", "numSteps": 3455, "minutesActive": 836, "flightsOfStairs": 18 },
      { "userID": 13, "date": "2019/08/23", "numSteps": 5321, "minutesActive": 134, "flightsOfStairs": 85 },
      { "userID": 13, "date": "2019/08/24", "numSteps": 2948, "minutesActive": 456, "flightsOfStairs": 162 },
      { "userID": 13, "date": "2019/08/25", "numSteps": 9352, "minutesActive": 567, "flightsOfStairs": 143 },
      { "userID": 2, "date": "2019/06/15", "numSteps": 1112, "minutesActive": 875, "flightsOfStairs": 16 },
      { "userID": 2, "date": "2019/06/16", "numSteps": 3253, "minutesActive": 174, "flightsOfStairs": 52 },
      { "userID": 5, "date": "2019/08/25", "numSteps": 6425, "minutesActive": 67, "flightsOfStairs": 42 },
      { "userID": 5, "date": "2019/08/25", "numSteps": 842, "minutesActive": 43, "flightsOfStairs": 86 },
    ];

  sampleData = {
    "id": 13,
    "name": "Tom Schmeler",
    "address": "1524 Clemmie River, Newtonbury RI 02849-3159",
    "email": "Leopoldo.Sauer@gmail.com",
    "strideLength": 3.2,
    "dailyStepGoal": 4000,
    "friends": [33, 14, 3, 43, 35]
  };

  user = new User(sampleData);
  activityRepository = new ActivityRepository(13, activityData);
});

describe('ActivityRepository', () => {

  it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be an instance of ActivityRepository', () => {
    expect(activityRepository).to.be.an.instanceOf(ActivityRepository);
  });

  it('should return the miles a user has walked based on their number of steps and stride length', () => {
    expect(activityRepository.getMilesWalked('2019/08/25', user)).to.equal(5.7); //5.66787878.......
  });

  it('should return how many minutes the user was active for a given day', () => {
    expect(activityRepository.getMinutesActive('2019/08/24')).to.equal(456);
  });

  it('should return how many minutes active the user averaged for the week', () => {
    expect(activityRepository.getAverageActivity('2019/08/24')).to.equal(370); //369.714286
  });

  it('should return whether a user met their daily step goal for a given date', () => {
    expect(activityRepository.reachedDailyStepGoal('2019/08/24', sampleData)).to.equal(false);
  });

  it('should return the days where the user exceeded their step goal', () => {
    expect(activityRepository.getAllTimeExceededSteps(sampleData)).to.deep.equal(
      [
        { "date": "2019/08/20", "numSteps": 5321 },
        { "date": "2019/08/23", "numSteps": 5321 },
        { "date": "2019/08/25", "numSteps": 9352 },
      ]);
  });

  it('should return the user"s all-time stair climbing record', () => {
    expect(activityRepository.getAllTimeStairClimb()).to.deep.equal(
      { "date": "2019/08/20", "flightsOfStairs": 174 }
    );
  });

  it('should return the average number of stairs climbed for all users on a given date', () => {
    expect(activityRepository.getAverageStairsDay('2019/08/25')).to.equal(90);
  });

  it('should return the average number of steps taken for all users on a given date', () => {
    expect(activityRepository.getAverageStepsDay('2019/08/25')).to.equal(5540);
  });

  it('should return the average number of minutes active for all users on a given date', () => {
    expect(activityRepository.getAvergageMinutesActive('2019/08/25')).to.equal(226);
  });

});

// Make a metric of your own! Document it, calculate it, and display it.
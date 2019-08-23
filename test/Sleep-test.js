const chai = require('chai');
const expect = chai.expect;
const SleepRepository = require('../src/SleepRepository');

let dataSleep, sleepRepository;

beforeEach(() => {
  dataSleep =
    [
      { userID: 45, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
      { userID: 45, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 },
      { userID: 45, date: "2019/08/18", hoursSlept: 7.3, sleepQuality: 2.1 },
      { userID: 46, date: "2019/08/18", hoursSlept: 9.2, sleepQuality: 1.5 },
      { userID: 45, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
      { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
      { userID: 45, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 1.7 },
      { userID: 45, date: "2019/08/22", hoursSlept: 8.5, sleepQuality: 2.3 },
      { userID: 45, date: "2019/08/23", hoursSlept: 10.9, sleepQuality: 2.3 },
      { userID: 45, date: "2019/08/24", hoursSlept: 8.3, sleepQuality: 1.5 }
    ];

  sleepRepository = new SleepRepository(dataSleep, 45);
});

describe('SleepRepository', () => {
  it('should be a function', () => {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be an instance of SleepRepository', () => {
    expect(sleepRepository).to.be.an.instanceOf(SleepRepository);
  });

  it('should be able to filter the user"s data by ID', () => {
    expect(sleepRepository.getSleepData()).to.deep.equal(
      [
        { userID: 45, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
        { userID: 45, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 },
        { userID: 45, date: "2019/08/18", hoursSlept: 7.3, sleepQuality: 2.1 },
        { userID: 45, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
        { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
        { userID: 45, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 1.7 },
        { userID: 45, date: "2019/08/22", hoursSlept: 8.5, sleepQuality: 2.3 },
        { userID: 45, date: "2019/08/23", hoursSlept: 10.9, sleepQuality: 2.3 },
        { userID: 45, date: "2019/08/24", hoursSlept: 8.3, sleepQuality: 1.5 }
      ]
    );
  });

  it('should return the user"s average number of hours slept per day', () => {
    expect(sleepRepository.getAllTimeAvg()).to.equal(9); //8.55555555
  });

  it('should return the user"s average sleep quality per day over all time', () => {
    expect(sleepRepository.getQualitySleepAvg()).to.equal(2.9); //2.8555555
  });

  it('should return how many hours the user slept for a specific day', () => {
    expect(sleepRepository.getDailySleepHours('2019/08/22')).to.equal(8.5);
  });

  it('should return the user"s sleep data over the course of a given week', () => {
    expect(sleepRepository.weeklySleepData('2019/08/22')).to.deep.equal(
      [
        { userID: 45, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
        { userID: 45, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 },
        { userID: 45, date: "2019/08/18", hoursSlept: 7.3, sleepQuality: 2.1 },
        { userID: 45, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
        { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
        { userID: 45, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 1.7 },
        { userID: 45, date: "2019/08/22", hoursSlept: 8.5, sleepQuality: 2.3 },
      ]
    );
  });

  it('should return the user"s number of hours slept each day over the course of a given week', () => {
    expect(sleepRepository.getWeeklyHours('2019/08/22')).to.deep.equal(
      [
        { date: "2019/08/16", hoursSlept: 9.9 },
        { date: "2019/08/17", hoursSlept: 6.9 },
        { date: "2019/08/18", hoursSlept: 7.3 },
        { date: "2019/08/19", hoursSlept: 7 },
        { date: "2019/08/20", hoursSlept: 10.4 },
        { date: "2019/08/21", hoursSlept: 7.8 },
        { date: "2019/08/22", hoursSlept: 8.5 }
      ]
    );
  });

  it('should return the user"s sleep quality each day over the course of a given week', () => {
    expect(sleepRepository.getWeeklyQuality('2019/08/22')).to.deep.equal(
      [
        { date: "2019/08/16", sleepQuality: 2.8 },
        { date: "2019/08/17", sleepQuality: 4.5 },
        { date: "2019/08/18", sleepQuality: 2.1 },
        { date: "2019/08/19", sleepQuality: 4.2 },
        { date: "2019/08/20", sleepQuality: 4.3 },
        { date: "2019/08/21", sleepQuality: 1.7 },
        { date: "2019/08/22", sleepQuality: 2.3 }
      ]
    );
  });

  it('should return the average sleep quality of all users', () => {
    expect(sleepRepository.getAvgQuality()).to.equal(2.7); //2.72
  });

  it.skip('should find all users who average a sleep quality greater than 3 for a given week', () => {
    expect(sleepRepository.highestQualitySleep().to.equal("Jennie O'Hara"));
  });

});
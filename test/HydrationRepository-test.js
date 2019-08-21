const chai = require('chai');
const expect = chai.expect;
const HydrationRepository = require('../src/HydrationRepository');

let dataHydration, hydrationRepository;

beforeEach(() => {
  dataHydration = [
    {
      "userID": 12,
      "date": "2019/07/12",
      "numOunces": 71
    },
    {
      "userID": 12,
      "date": "2019/07/13",
      "numOunces": 37
    },
    {
      "userID": 12,
      "date": "2019/07/14",
      "numOunces": 97
    },
    {
      "userID": 14,
      "date": "2019/07/15",
      "numOunces": 62
    },
    {
      "userID": 12,
      "date": "2019/07/15",
      "numOunces": 62
    },
    {
      "userID": 12,
      "date": "2019/07/16",
      "numOunces": 77
    },
    {
      "userID": 12,
      "date": "2019/07/17",
      "numOunces": 76
    },
    {
      "userID": 12,
      "date": "2019/07/18",
      "numOunces": 85
    },
    {
      "userID": 12,
      "date": "2019/07/19",
      "numOunces": 58
    }
  ];
  hydrationRepository = new HydrationRepository(dataHydration);
});

describe('HydrationRepository', () => {
  it('should be a function', () => {
    expect(HydrationRepository).to.be.a('function');
  });

  it('should be an instance of HydrationRepository', () => {
    expect(hydrationRepository).to.be.an.instanceOf(HydrationRepository);
  });

  it('should be able to filter the user"s data by ID', () => {
    expect(hydrationRepository.getHydrationData(12)).to.deep.equal([
      {
        "userID": 12,
        "date": "2019/07/12",
        "numOunces": 71
      },
      {
        "userID": 12,
        "date": "2019/07/13",
        "numOunces": 37
      },
      {
        "userID": 12,
        "date": "2019/07/14",
        "numOunces": 97
      },
      {
        "userID": 12,
        "date": "2019/07/15",
        "numOunces": 62
      },
      {
        "userID": 12,
        "date": "2019/07/16",
        "numOunces": 77
      },
      {
        "userID": 12,
        "date": "2019/07/17",
        "numOunces": 76
      },
      {
        "userID": 12,
        "date": "2019/07/18",
        "numOunces": 85
      },
      {
        "userID": 12,
        "date": "2019/07/19",
        "numOunces": 58
      }
    ]);
  });

  it('should return the average fluid ounces consumed per day for all time', () => {
    expect(hydrationRepository.getAllTimeAvg(12)).to.equal(70);
  });

  it('should return how many fluid ounces they consumed for a specific day', () => {
    expect(hydrationRepository.totalOzDay('2019/07/13')).to.equal(37);
  });

  it('should return how many fluid ounces of water consumed each day over the course of a week', () => {
    expect(hydrationRepository.weeklyHydrationAvg(12, '2019/07/19')).to.deep.equal(
      [
        { userID: 12, date: '2019/07/13', numOunces: 37 },
        { userID: 12, date: '2019/07/14', numOunces: 97 },
        { userID: 12, date: '2019/07/15', numOunces: 62 },
        { userID: 12, date: '2019/07/16', numOunces: 77 },
        { userID: 12, date: '2019/07/17', numOunces: 76 },
        { userID: 12, date: '2019/07/18', numOunces: 85 },
        { userID: 12, date: '2019/07/19', numOunces: 58 }
      ]);
  });

});
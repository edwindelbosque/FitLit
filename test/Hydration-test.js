const chai = require('chai');
const expect = chai.expect;
const Hydration = require('../src/Hydration');

let dataHydration, hydration;

beforeEach(() => {
  dataHydration =
    {
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    };
  hydration = new Hydration(dataHydration);
});

describe('Hydration', () => {
  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

});

// eslint-disable-next-line no-undef
const name = $('#name');
const address = $('#address');
const email = $('#email');
const strideLength = $('#strideLength');
const dailyStepGoal = $('#stepGoal');
const stepCompare = $('#step-compare');
const dailyOz = $('#daily-oz');
const weeklyOz = $('#weekly-oz');

let userId = Math.floor(Math.random() * (50 - 1) + 1);
let userRepository = new UserRepository(userData);
let hydrationRepository = new HydrationRepository(hydrationData, userId);

$(document).ready(() => {
  let userInfo = userRepository.getUserData(userId);
  updateUserDataDOM(userInfo);
  compareStepGoal(userInfo);
  displayDailyOz();
  displayWeeklyOz();
});

function updateUserDataDOM(userInfo) {
  name.text(userInfo.name);
  address.text(userInfo.address);
  email.text(userInfo.email);
  strideLength.text(userInfo.strideLength);
  dailyStepGoal.text(userInfo.dailyStepGoal);
}

function compareStepGoal(userInfo) {
  const avgStep = userRepository.getAvgStep()
  const dailyStep = userInfo.dailyStepGoal;
  const numSteps = Math.abs(avgStep - dailyStep);
  const stepStatus = avgStep > dailyStep ? `under` : `over`;
  stepCompare.text(`You are ${numSteps} steps ${stepStatus} the average daily goal!`);
}

function displayDailyOz() {
  dailyOz.text(`You have drank ${hydrationRepository.totalOzDay()} oz today!`);
}

function displayWeeklyOz() {
  const users = hydrationRepository.weeklyHydrationAvg()
  return users.forEach(user => {
    return $(`<li>${user.date}: ${user.numOunces} oz</li>`).appendTo(weeklyOz)
  })
}
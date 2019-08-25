const name = $('#name');
const address = $('#address');
const email = $('#email');
const strideLength = $('#strideLength');
const dailyStepGoal = $('#stepGoal');
const stepCompare = $('#step-compare');
const dailyOz = $('#daily-oz');
const weeklyOz = $('#weekly-oz');

let userIdRandomizer = Math.floor(Math.random() * (50 - 1) + 1);
let userRepository = new UserRepository(userData);
let hydrationRepository = new HydrationRepository(hydrationData, userIdRandomizer);
let sleepRepository = new SleepRepository(sleepData, userIdRandomizer);

$(document).ready(() => {
  let userInfo = userRepository.getUserData(userIdRandomizer);
  updateUserDataDOM(userInfo);
  compareStepGoal(userInfo);
  displayDailyOz();
  displayWeeklyOz();
  sleepRepository.getBestSleepers();
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
  dailyOz.text(`You have drank ${hydrationRepository.totalOzDay(getCurrentDate())} oz today!`);
}

function displayWeeklyOz() {
  const users = hydrationRepository.weeklyHydrationAvg(getCurrentDate())
  return users.forEach(user => {
    return $(`<li>${user.date}: ${user.numOunces} oz</li>`).appendTo(weeklyOz)
  });
}

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = `${yyyy}/${mm}/${dd}`;
  return today;
}
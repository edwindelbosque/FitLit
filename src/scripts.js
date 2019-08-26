const name = $('#name');
const address = $('#address');
const email = $('#email');
const strideLength = $('#strideLength');
const dailyStepGoal = $('#stepGoal');
const stepCompare = $('#step-compare');
const dailyOz = $('#daily-oz');
const weeklyOz = $('#weekly-oz');
const date = $('#date');
const yesterdaySleep = $('#yesterday-sleep');
const weeklySleep = $('#weekly-sleep');
const allTimeSleep = $('#all-time-sleep');
const dailyActivity = $('#daily-activity');
const weeklySteps = $('#weekly-steps');
const weeklyMinutes = $('#weekly-minutes');
const weeklyStairs = $('#weekly-stairs-climbed');

const compareActivity = $('#compare-activity');
const weeklyActivity = $('#weekly-activity');

let userIdRandomizer = Math.floor(Math.random() * (50 - 1) + 1);
let userRepository = new UserRepository(userData, userIdRandomizer);
let hydrationRepository = new HydrationRepository(hydrationData, userIdRandomizer);
let sleepRepository = new SleepRepository(sleepData, userIdRandomizer);
let activityRepository = new ActivityRepository(userIdRandomizer, activityData);

$(document).ready(() => {
  let userInfo = userRepository.getUserData();
  updateUserDataDOM(userInfo);
  compareStepGoal(userInfo);
  displayDailyOz();
  displayWeeklyOz();
  sleepRepository.getBestSleepers();
  displayCurrentDate();
  displaySleep();
  displayActivity();
  displayWeeklyActivity();
});

function updateUserDataDOM(userInfo) {
  name.text(userInfo.name);
  address.text(userInfo.address);
  email.text(userInfo.email);
  strideLength.text(userInfo.strideLength);
  dailyStepGoal.text(userInfo.dailyStepGoal);
}

function compareStepGoal(userInfo) {
  const avgStep = userRepository.getAvgStep();
  const dailyStep = userInfo.dailyStepGoal;
  const numSteps = Math.abs(avgStep - dailyStep);
  const stepStatus = avgStep > dailyStep ? `under` : `over`;
  stepCompare.text(`You are ${numSteps} steps ${stepStatus} the average daily goal!`);
}

function displayDailyOz() {
  dailyOz.text(`You have drank ${hydrationRepository.totalOzDay(getCurrentDate())} oz today!`);
}

function displayWeeklyOz() {
  const users = hydrationRepository.weeklyHydrationAvg(getCurrentDate());
  return users.forEach(log => {
    return $(`<li>${log.date}: ${log.numOunces} oz</li>`).appendTo(weeklyOz);
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

function getCurrentDateDOM() {
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

  today = `Date: ${mm}/${dd}/${yyyy}`;
  return today;
}

function displayCurrentDate() {
  date.text(getCurrentDateDOM());
}

function displaySleep() {
  const userLogsHours = sleepRepository.getAllTimeAvg();
  const userLogsQuality = sleepRepository.getQualitySleepAvg();
  const weeklyData = sleepRepository.weeklySleepData(getCurrentDate());

  $(`<p>You slept ${sleepRepository.getDailySleepHours(getCurrentDate())} hours last night!</p>`).appendTo(yesterdaySleep);
  $(`<li>Hours Slept: ${userLogsHours}</li>`).appendTo(allTimeSleep);
  $(`<li>Quality of sleep: ${userLogsQuality}</li>`).appendTo(allTimeSleep);

  weeklyData.forEach(day => {
    return $(`<li>${day.date}: ${day.hoursSlept} hours, ${day.sleepQuality} qual</li>`).appendTo(weeklySleep);
  });
}

function displayActivity() {
  $(`<li>You took ${activityRepository.getDailyStats(getCurrentDate(), 'numSteps')} steps</li>`).appendTo(dailyActivity);
  $(`<li>You were active for ${activityRepository.getMinutesActive(getCurrentDate())} minutes</li>`).appendTo(dailyActivity);
  $(`<li>You walked ${activityRepository.getMilesWalked(getCurrentDate(), userRepository.getUserData())} miles</li>`).appendTo(dailyActivity);

  $(`<li>${activityRepository.getAverageStairsDay(getCurrentDate()) - activityRepository.getDailyStats(getCurrentDate(), 'flightsOfStairs')} stairs from the average</li>`).appendTo(compareActivity);
  $(`<li>${activityRepository.getAverageStepsDay(getCurrentDate()) - activityRepository.getDailyStats(getCurrentDate(), 'numSteps')}  from the average</li>`).appendTo(compareActivity);
  $(`<li>${activityRepository.getAvergageMinutesActive(getCurrentDate()) - activityRepository.getDailyStats(getCurrentDate(), 'minutesActive')} from the average</li>`).appendTo(compareActivity);
}

function displayWeeklyActivity() {
  activityRepository.getWeeklyStats(getCurrentDate()).forEach(day => {
    $(`<li>${day.date}: ${day.numSteps} steps</li>`).appendTo(weeklySteps);
    $(`<li>${day.date}: ${day.minutesActive} mins</li>`).appendTo(weeklyMinutes);
    $(`<li>${day.date}: ${day.flightsOfStairs} flights</li>`).appendTo(weeklyStairs);
  });
}
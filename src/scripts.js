const weeklyStepsChart = $('#weekly-steps-chart');
const weeklyMinutesChart = $('#weekly-minutes-chart');
const weeklyFlightsChart = $('#weekly-flights-chart');
const weeklyOzGraph = $('#weekly-oz-graph');
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
const friendSteps = $('#friend-weekly-steps');
const stepTrends = $('#step-trends');
const stepGoalProggress = $('#step-goal-proggress');
const stepGoalChart = $('#step-goal-chart');

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
  displayCurrentDate(getCurrentDate());
  displaySleep();
  displayActivity();
  displayWeeklyActivity();
  friendActivityData(getCurrentDate());
  displayTrends()
});

function updateUserDataDOM(userInfo) {
  $(`<p>Welcome,</p><h1>${userInfo.name}</h1>`).prependTo(name);
  address.text(userInfo.address);
  email.text(userInfo.email);
  strideLength.text(userInfo.strideLength);
  dailyStepGoal.text(userInfo.dailyStepGoal);
}

function compareStepGoal(userInfo) {
  const avgStep = userRepository.getAvgStep();
  const dailyStep = userInfo.dailyStepGoal;
  const numSteps = Math.abs(avgStep - dailyStep);
  avgStep >= dailyStep
    ? stepCompare.append(`<h5>${numSteps} steps until you reach your goal!</h5>`)
    : stepCompare.append(`<h5>You've reached your daily goal!<h5>`)

  if (dailyStep >= avgStep) {
    new Chart(stepGoalChart, {
      type: 'doughnut',
      data: {
        labels: ['TODAY', 'GOAL'],
        datasets: [{
          label: 'Your weekly steps',
          backgroundColor: ['#f7be16', 'lightgray'],
          borderWidth: 3,
          borderColor: 'white',
          hoverBackgroundColor: 'pink',
          hoverBorderColor: 'white',
          data: [1]
        }]
      },
    });
  } else {
    new Chart(stepGoalChart, {
      type: 'doughnut',
      data: {
        labels: ['TODAY', 'GOAL'],
        datasets: [{
          label: 'Your weekly steps',
          backgroundColor: ['#f7be16', 'lightgray'],
          borderWidth: 3,
          borderColor: 'white',
          hoverBackgroundColor: 'pink',
          hoverBorderColor: 'white',
          data: [avgStep, dailyStep]
        }]
      },
    });
  }
}

function displayDailyOz() {
  $(`<h5>You have drank <span>${hydrationRepository.totalOzDay(getCurrentDate())}</span> oz today!</h5>`).appendTo(dailyOz);
}

function displayWeeklyOz() {
  let ozs = [];
  let dates = [];
  const users = hydrationRepository.weeklyHydrationAvg(getCurrentDate());
  users.forEach(log => {
    dates.push(new Date(log.date).toString().slice(0, 3));
    ozs.push(log.numOunces);
  });

  new Chart(weeklyOzGraph, {
    type: 'bar',

    data: {
      labels: dates,
      datasets: [{
        label: 'Oz water drank',
        backgroundColor: '#6bc5d2',
        borderColor: '#6bc5d2',
        data: ozs
      }]
    },

    options: {}
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

function displayCurrentDate(day) {
  date.text(`${new Date(day).toString().slice(0, 10)}`);
}

function displaySleep() {
  const userLogsHours = sleepRepository.getAllTimeAvg();
  const userLogsQuality = sleepRepository.getQualitySleepAvg();
  const weeklyData = sleepRepository.weeklySleepData(getCurrentDate());

  $(`<h5>You slept <span>${sleepRepository.getDailySleepHours(getCurrentDate())}</span> hours last night!</h5>`).appendTo(yesterdaySleep);
  $(`<h5>You slept an average of <span>${sleepRepository.weeklyAvgHours(getCurrentDate())}</span> hours a night this week!</h5>`).appendTo(yesterdaySleep);
  $(`<h5>Avg. Hours Slept : <span>${userLogsHours}</span></h5>`).appendTo(allTimeSleep);
  $(`<h5>Avg. Sleep Quality : <span>${userLogsQuality}</span></h5>`).appendTo(allTimeSleep);

  weeklyData.forEach(day => {
    return $(`<li>${day.date}: ${day.hoursSlept} hours, ${day.sleepQuality} qual</li>`).appendTo(weeklySleep);
  });
}

function displayActivity() {
  $(`<li>You took ${activityRepository.getDailyStats(getCurrentDate(), 'numSteps')} steps</li>`).appendTo(dailyActivity);
  $(`<li>You were active for ${activityRepository.getMinutesActive(getCurrentDate())} minutes</li>`).appendTo(dailyActivity);
  $(`<li>You walked ${activityRepository.getMilesWalked(getCurrentDate(), userRepository.getUserData())} miles</li>`).appendTo(dailyActivity);
  $(`<li>You walked ${activityRepository.getKilometersWalked(getCurrentDate(), userRepository.getUserData())} km</li>`).appendTo(dailyActivity);

  $(`<li>${activityRepository.getAverageStairsDay(getCurrentDate()) - activityRepository.getDailyStats(getCurrentDate(), 'flightsOfStairs')} stairs from the average</li>`).appendTo(compareActivity);
  $(`<li>${activityRepository.getAverageStepsDay(getCurrentDate()) - activityRepository.getDailyStats(getCurrentDate(), 'numSteps')}  from the average</li>`).appendTo(compareActivity);
  $(`<li>${activityRepository.getAvergageMinutesActive(getCurrentDate()) - activityRepository.getDailyStats(getCurrentDate(), 'minutesActive')} from the average</li>`).appendTo(compareActivity);
}

function displayWeeklyActivity() {
  let stepLogs = [];
  let dateLogs = [];
  let minuteLogs = [];
  let flightLogs = [];
  activityRepository.getWeeklyStats(getCurrentDate()).map(day => {
    stepLogs.push(day.numSteps);
    dateLogs.push(new Date(day.date).toString().slice(0, 3));
    minuteLogs.push(day.minutesActive);
    flightLogs.push(day.flightsOfStairs);
  });

  new Chart(weeklyStepsChart, {
    type: 'bar',
    data: {
      labels: dateLogs,
      datasets: [{
        label: 'Your weekly steps',
        backgroundColor: '#f7be16',
        borderColor: '#f7be16',
        data: stepLogs
      }]
    },
  });

  new Chart(weeklyMinutesChart, {
    type: 'bar',
    data: {
      labels: dateLogs,
      datasets: [{
        label: 'Your weekly minutes active',
        backgroundColor: '#00818a',
        borderColor: '#00818a',
        data: minuteLogs
      }]
    },
  });

  new Chart(weeklyFlightsChart, {
    type: 'bar',
    data: {
      labels: dateLogs,
      datasets: [{
        label: 'Your weekly flights of stairs',
        backgroundColor: '#293462',
        borderColor: '#293462',
        data: flightLogs
      }]
    },
  });
}

function friendActivityData(date) {
  let friends = [];
  let findFriends = userRepository.getFriends();
  findFriends.forEach(friend => {
    let friendData = activityRepository.getUserLogs(friend);
    let friendName = userRepository.getUserData(friend).name;
    let indexDay = friendData.findIndex(user => user.date === date);
    let friendWeeks = friendData.slice(indexDay - 6, indexDay + 1);
    displayFriendsActivity(friendWeeks, friendName, friends);
  });
  displayFriendSteps(friends);
}

function displayFriendsActivity(friendWeeks, friendName, friends) {
  let friendWeekSteps = friendWeeks.reduce((steps, day) => {
    return steps + day.numSteps;
  }, 0);
  friends.push({ name: friendName, weeklySteps: friendWeekSteps })
}

function displayFriendSteps(array) {
  let counter = 0;
  array.sort((a, b) => b.weeklySteps - a.weeklySteps);
  array.forEach(friend => {
    counter++
    $(`<li class="friend-${counter}">${counter}. <span>${friend.name}</span> <br> --- ${friend.weeklySteps} steps.</li>`).appendTo(friendSteps);
  })
}

function displayTrends() {
  let positiveTrend = activityRepository.getPositiveStepTrends().length;
  let negativeTrend = activityRepository.getNegativeStepTrends().length;
  $(`<p>Since joining you've had:</p> <p><span>${positiveTrend}</span> positive trends</p>`).appendTo(stepTrends);
  $(`<p><span>${negativeTrend}</span> negative trends</p>`).appendTo(stepTrends);
}
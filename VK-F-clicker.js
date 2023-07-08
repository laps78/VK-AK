// ==UserScript==
// @name     L.A.P.S. Lab VK recomended friends auto clicker
// @version  0.1
// @description Автокликер для добавления друзей ВК со страницы рекомендаций
// @grant    none
// ==/UserScript==

/* FEATURES:
 * 1. variable click interval delay
 * 2. click all links in random order
 **/

// Initial prefs
const targetURL = "https://vk.com/friends?act=find";
const minTimeToClick = 10;
const maxTimeToClick = 30;
const autostart = false;
const tasks = [];
const logs = [];

/**
 * this function checks url
 * @returns true or false
 */
const checkLocation = () => (window.location.href === targetURL ? true : false);

const findDataOnPage = () => {
  // init
  const boxes = document.querySelectorAll(".friends_find_user_info");
  const data = [];

  // prepare data
  boxes.forEach((box) => {
    const boxUserLink = box.querySelector(".friends_find_user_add");
    const boxUserName = box.querySelector(
      ".friends_find_user_name"
    ).textContent;

    data.push({
      name: boxUserName,
      link: boxUserLink,
    });
  });

  return data;
};

const getTimeStamp = () => {
  const time = new Date();
  let hours = time.getHours();
  hours < 10 ? (hours = `0${hours}`) : `${hours}`;
  let minutes = time.getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : `${minutes}`;
  let seconds = time.getSeconds();
  seconds < 10 ? (seconds = `0${seconds}`) : `${seconds}`;
  return `${hours}:${minutes}:${seconds}`;
};

/**
 * this function shuffles found links
 * @param {HTMLCollection} collection
 * @returns sorted collection in random order
 */
const shuffleData = (collection) =>
  collection.sort((a, b) => Math.random() - 0.5);

/**
 * this function generates random interval in range of arguments
 * @param {number} min
 * @param {number} max
 * @returns value of timeout to make click in seconds
 */
const setRandomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 *
 * @param {object} friend with "name" & "link"
 */
const clickThisLink = (friend) => {
  // do work
  //friend.link.click();

  // remove task from array tasks
  if (tasks.find((item) => item.name === friend.name) !== -1) {
    tasks.splice(tasks.indexOf(friend.name), 1);
  }

  // prepare log string
  const timestamp = getTimeStamp();
  const logString = `Запрос в друзья отправлен пользователю ${friend.name} в ${timestamp}.`;

  // log string push
  console.info(logString);
  logs.push(logString);

  // end app if finished
  if (tasks.length === 0) {
    endApp();
  }
};

/**
 * This func make clicks with timeout
 * @param {array} items
 * @param {number} timeout
 */
const clickItemWithTimeout = (item, timeout) =>
  window.setTimeout(clickThisLink, timeout * 1000, item);

const endApp = () => {
  console.info("L.A.P.S. Lab: завершение...");
  if (logs.length > 0) {
    logs.forEach((item) => console.info(item));
    logs.length = 0;
  } else {
    console.info(`L.A.P.S. Lab: логи автокликера не обнаружены.`);
  }
  console.info(
    "L.A.P.S. Lab: автокликер закончил работу. Для повторного запуска скрипта обновите страницу."
  );
};

const makeWork = (data) => {
  let prevTimeoutSum = 0;
  let newTimeout = null;

  data.forEach((item) => {
    newTimeout = setRandomInterval(minTimeToClick, maxTimeToClick);
    clickItemWithTimeout(item, prevTimeoutSum + newTimeout);
    prevTimeoutSum += newTimeout;
    tasks.push(item.name);
  });
};

const app = () => {
  console.info(
    "L.A.P.S. Lab: запускаем автокликер для добавления друзей ВК..."
  );
  // define & prepare data
  const foundData = findDataOnPage();
  const shuffledData = shuffleData(foundData);

  // make work
  if (autostart) {
    makeWork(shuffledData);
  } else {
    const start = confirm(
      `найдено ${foundData.length} рекомендаций. Добавить?`
    );
    start ? makeWork(shuffledData) : endApp();
  }
};

window.addEventListener("DOMContentLoaded", (event) => {
  app();
});

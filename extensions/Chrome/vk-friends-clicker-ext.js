/* FEATURES:
 * 1. variable click interval delay
 * 2. click all links in random order
 **/

import HotkeysUI from "./modules/hotkeys.ui";

// Initial prefs
const targetURL = "https://vk.com/friends?act=find";
const minTimeToClick = 10;
const maxTimeToClick = 30;
const autostart = false;
let hotkeysUI = null;
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
  friend.link.click();

  // remove task from array tasks
  if (tasks.find((item) => item.name === friend.name) !== -1) {
    tasks.splice(tasks.indexOf(friend.name), 1);
  }

  // prepare log string
  const timestamp = getTimeStamp();
  const logString = `Запрос в друзья отправлен: ${friend.name} в ${timestamp}.`;

  // log string push
  console.info(logString);
  logs.push(logString);

  // end app if finished
  if (tasks.length === 0) {
    endApp();
  }
};

const prepareLogsParagraph = () => {
  let logsParagraph = new String();
  logs.forEach((logItem) => {
    logsParagraph = logsParagraph + logItem + "\n";
  });
  logsParagraph +=
    "-----------------------\nL.A.P.S. Lab: автокликер закончил работу. Для повторного запуска скрипта обновите страницу.";
  alert(logsParagraph);
  return logsParagraph;
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
  console.info(
    "Удаление обработчиков событий клавиатуры...\n",
    (hotkeysUI.kill() && "Обработчики событий удалены.") ||
      "hotkeysUI.kill() failed!"
  );
  if (logs.length > 0) {
    prepareLogsParagraph();
    logs.length = 0;
  } else {
    alert(
      `L.A.P.S. Lab: Логи автокликера не обнаружены.\nАвтокликер закончил работу. Для повторного запуска скрипта обновите страницу.`
    );
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

export const app = () => {
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
      `L.A.P.S. Lab VK friends autoclicker:\n------------------------------------\nНайдено ${foundData.length} рекомендаций. Добавить?`
    );
    start ? makeWork(shuffledData) : endApp();
    endApp();
  }
};

window.addEventListener("load", (event) => {
  if (window.location.href === targetURL) {
    hotkeysUI = new HotkeysUI();
  }
});

export default app;

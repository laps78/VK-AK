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
const minTimeToClick = 10;
const maxTimeToClick = 30;
const autostart = false;
const tasks = [];
const logs = [];

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

/**
 *
 * @param {HTMLCollection} collection
 * @returns sorted collection in random order
 */
const shuffleData = (collection) =>
  collection.sort((a, b) => Math.random() - 0.5);

/**
 *
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
  //friend.link.click();
  console.info(
    `Запрос на добавление в друзья отправлен пользователю ${friend.name}.`
  );
  logs.push(
    `Запрос на добавление в друзья отправлен пользователю ${friend.name}.`
  );
};

const checkTasks = () => {
  const isCompleted = Promise.all(tasks);
  isCompleted.then(endApp()).catch((err) => promiseReject(err));
};

/**
 * This func make clicks with timeout
 * @param {array} items
 * @param {number} timeout
 */
const clickItemWithTimeout = async (item, timeout) => {
  const newTask = new Promise((resolve, reject) => {
    window.setTimeout(resolve(), timeout * 1000, item);
  });
  tasks.push(newTask);
  newTask.then(clickThisLink(item));
};

const promiseReject = (err) => {
  console.error(`L.A.P.S. Lab: что-то не так в Promisse: ${err}`);
};

const endApp = () => {
  console.info("L.A.P.S. Lab: выгрузка логов:");
  if (logs.length > 0) {
    logs.forEach((item) => console.info(item));
    tasks.length = 0;
    logs.length = 0;
  } else {
    console.info(`L.A.P.S. Lab: логи автокликера не обнаружены.`);
  }
  console.info("L.A.P.S. Lab: автокликер закончил работу.");
};

const makeWork = (data) => {
  let prevTimeoutSum = 0;
  let newTimeout = null;

  const asyncActions = (data) => {
    data.forEach((item) => {
      newTimeout = setRandomInterval(minTimeToClick, maxTimeToClick);
      clickItemWithTimeout(item, prevTimeoutSum + newTimeout);
      prevTimeoutSum += newTimeout;
      if (data.length === tasks.length) {
        checkTasks();
      }
    });
  };
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

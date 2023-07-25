# VK recomended friends auto clicker

[TOC]

## Описание программного обеспечения

__Автокликер для добавления друзей Вконтакте__
by L.A.P.S. Lab

Данный продукт поставляется бесплатно и представляет собой mvp версию расширенного ПО для работы с социальными сетями от лаборатории [L.A.P.S. Lab](https://prolaps.ru)

ПО распространяется свободно в нескольких версиях:

- Google Chrome Extension - расширение для браузера google chrome
- userScript - пользовательский скрипт для браузерных расширений типа [GreaseMonkey](https://ru.wikipedia.org/wiki/Greasemonkey), [TemperMonkey](https://ru.wikipedia.org/wiki/Tampermonkey), e.t.c.
- Исходного кода на языке программирования javascript, содержащегося [тут](https://github.com/laps78/VK-friends-auto-add/blob/main/vk-friends-clicker.js), в данном репозитории.

В данном репозитории содержится его свободно распространяемый открытый [исходный код](https://github.com/laps78/VK-friends-auto-add/blob/main/vk-friends-clicker.js).

![screenshot](./assets/clicker-actions.png)

## Возможности алгоритма

1.Имитация человеческого поведения

- прокликивает ссылки в случайной последовательности
- случайный интервал между кликами (задаются параметрами, по-умолчанию - от 10 до 15 секунд между кликами)
- ограничено количество кликов (задается параметрами - по умолчанию 30)
- логи действий в консоли браузера и localStorage (ожидается)

§ 2.Доступно несколько режимов работы

- из консоли браузера
- Firefox GreeseMonkey UserScript
- Chrome расширение(ожидается)

## Как это работает?

Скрипт запускается в консоли, в расширении браузера или как выделенное расширение браузера и предлагает скликать найденное количество специфических ссылок на странице. В выдаче страницы по умолчанию 30 рекоммендаций.

После запуска скрипт:

- составляет массив ссылок из всех найденных по классу
- перемешивает ссылки в массиве
- составляет список отложенных задач типа _element.click()_
- выполняет задачи
- отчитывается о выполнении

Скрипт предполагает запуск при каждой перезагрузке страницы.

![screenshot-report](./assets/report-new.png)

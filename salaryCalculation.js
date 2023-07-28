// Расчет зарплаты

// Посчитать заработную плату сотрудника за отработанные часы.

// Условия:

// - Всё время должно рассчитываться в UTC, результат должен оставаться тем же самым вне зависимости от таймзоны на сервере. 
// - Время отработанное с 08 до 18 оплачичивается в размере 100%. 
// - Время отработанное с 18 до 23 оплачичивается в размере 150%. 
// - Время отработанное с 23 до 08 оплачичивается в размере 200%. 
// - Никто не работает больше 12 часов подряд. 
// - Входные данные уже отсортирован по времени. 
// Файл с ответом должен экспортировать функцию с тремя параметрами:

// - timesheet — массив с отметками о входе и выходе на работу (например: [['login', 1669914900000], ['logout', 1669914900000]]) 
// - hourRate — оплата за час работы 
// Шаблон:

// module.exports = function (timesheet, hourRate) { // ваш код } 
// Ваша функция должна вернуть число с двумя знаками после запятой (например: 1550.25).

// Solution:

function salary(timesheet, hourRate) {
  const logins = [];
  const logouts = [];

  for (let i = 0; i < timesheet.length; i += 1) {
    const [name, time] = timesheet[i];
    const date = new Date(time);
    const utcTime = {
      day: date.getUTCDate(),
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
    }
    if (name === 'login') {
      logins.push(utcTime);
    } else {
      logouts.push(utcTime);
    }
  }
  const res = logins.reduce((acc, { day, hours, minutes, seconds }, i) => {
    let onceTime = 0;
    let middleTime = 0;
    let twiceTime = 0;
    const logs = logouts[i];
    if (hours >= 8 && hours <= 18 && logs.hours <= 18 ) {
      onceTime += logs.hours - hours + (logs.minutes - minutes)/60 + (logs.seconds - seconds)/60/60;
    }
    if (hours >= 8 && hours <= 18 && logs.hours > 18  && logs.hours <= 23) {
      onceTime += 18 - hours - minutes/60 - seconds/60/60;
      middleTime += logs.hours - 18 + logs.minutes + logs.seconds;
    }
    if (hours >= 8 && hours <= 18 && logs.hours > 23) {
      onceTime += 18 - hours - minutes/60 - seconds/60/60;
      middleTime += 23 - 18;
      twiceTime = logs.hours - 23 + logs.minutes/60 + logs.seconds/60/60;
    }
    if (hours >= 8 && hours <= 18 && logs.hours < 8 && day !== logs.day) {
      onceTime += 18 - hours - minutes/60 - seconds/60/60;
      middleTime += 23 - 18;
      twiceTime = 24 - 23 + logs.hours  + logs.minutes/60 + logs.seconds/60/60;
    }

    acc += (onceTime + middleTime * 1.5 + twiceTime * 2) * hourRate;
    return acc;
  }, 0);

return res.toFixed(2);
}
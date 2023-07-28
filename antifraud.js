// Антифрод

// Часто злоумышленники применяют DDoS-атаки: на сервер-жертву отправляется огромное количество запросов, чтобы нарушить его работоспособность. Вам необходимо написать функцию-декоратор, которая бы помогла противостоять такому виду атак.

// Ваш декоратор должен принимать три параметра: исходную функцию, временной интервал T и количество запросов N, которое можно совершить одному устройству за определённое время.

// В качестве результата должна возвращаться «защищённая функция», она принимает IP-адрес устройства, текущее время и все аргументы, которые были у исходной функции.

// Если в течение последних T секунд «защищённая функция» была вызвана больше N раз, то IP устройства отправляется в бан и больше запросы к исходной функции от него не проходят.

// Файл с ответом должен экспортировать функцию с тремя параметрами:

// - originalFunction — исходная функция, которую необходимо «защитить» 
// - timeInterval — временной интервал, гарантируется, что с каждым новым вызовом «защищённой функции» он будет только увеличиваться 
// - maxRequests — максимально количество запросов, которое можно сделать за временной интервал timeInterval, чтобы не попасть в бан

// Solution:

// Зачтено:

module.exports = function(originalFunction, timeInterval, maxRequests) {
  let counter = {};
  let start = {};
  
  return (ip, timestamp, ...args) => {
    start[ip] = start[ip] ?? timestamp;
    
    if (timestamp - start[ip] <= timeInterval) {
      counter[ip] = counter[ip] + 1 || 1;
    }
    const ban = counter[ip] > maxRequests;
    
    if (!ban) {
      return originalFunction(...args);
    }
  }
}
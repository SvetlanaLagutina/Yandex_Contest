// Спиннер крутится 

// При запросах в интерфейсах мы заправшиваем данные и иногда показываем спиннер, но если запрос выполняется быстро, то его показывать пользователю нету смысла — всё и так готово!
// Нужно реализовать подобную логику в асинхронной функции.

// - На вход подается функция request, которая возвращает Promise. 
// - Если она выполняется меньше чем за 250 миллисекунд, то спиннер показывать нет смысла. 
// - А если она выполняется дольше, то нужно показать спиннер, при помощи функции showSpinner, который должен крутиться не меньше 1000 миллисекунд и скрыться при помощи функции hideSpinner. 
// - Гарантируется, что запрос выполняется не дольше 1000 миллисекунд. 
// Файл с ответом должен экспортировать функцию с тремя параметрами:

/**
*request: () => Promise
*showSpinner: () => void
*hideSpinner: () => void 
*/ 
// module.exports = async function (request, showSpinner, hideSpinner) { 
//   // ваш код 
// } 

// У функции нет возвращаемого значения, нужно корректно вызвать переданные функции и завершиться.

// Solution:

// Зачтено

module.exports =async function (request, showSpinner, hideSpinner) {
    const timeout = {};
    const result = request();
    const race = await Promise.race([result, delay(250, timeout)]);
    
    if (race == timeout) {
      showSpinner();
      await delay(1000);
      hideSpinner();
    }
    function delay(ms, result) {
      return new Promise(r => setTimeout(() => r(result), ms));
    }
}
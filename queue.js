// Слишком длинные очереди 

// В столовой Яндекса начали образовываться слишком длинные очереди. Каждый новый сотрудник вставая в очередь (и, естественно, ужасаясь количеством людей перед ним), получает некоторый уровень недовольства, определяемый натуральным числом. Уровень недовольства не меняется во время ожидания в очереди.

// Руководство собирает статистику и хочет знать о минимальном и максимальном недовольстве в очереди в определенные моменты времени.

// Вам предстоит реализовать такую очередь и обработать некоторое количество запросов.

// Запросы бывают вида:

// 1. push(x) — добавить яндексоида с уровнем недовольства x в конец очереди 
// 2. shift() — обслужить первого в очереди яндексоида и вернуть его уровень недовольства 
// 3. min() — вернуть минимальное недовольство в очереди 
// 4. max() — вернуть максимальное недовольство в очереди 

// В случае пустой очереди минимальное и максимальное недовольство, а также возвращаемое из shift значение, равны нулю.

// Файл с ответом должен экспортировать объект у которого обязательно будут присутствовать функции push(), shift(), min(), max().

// Solution:

// Зачтено: 

module.exports = {
    queue: {},
    newIndex: 1,
    oldIndex: 1,
    minValue: Infinity,
    maxValue: -Infinity,
    push(x) {
        this.queue[this.newIndex] = x;
        this.newIndex++;
        if (x < this.minValue) {
        this.minValue = x;
        }
        if (x > this.maxValue) {
        this.maxValue = x;
        }
    },
    shift() {
        if (this.oldIndex === this.newIndex) {
        return 0;
        }
        let res  = this.queue[this.oldIndex];
        delete this.queue[this.oldIndex];
        this.oldIndex++;
        if (res === this.maxValue) {
        this.maxValue = Object.values(this.queue).reduce((acc, el) => el > acc ? el : acc);
        }
        if (res === this.minValue) {
        this.minValue = Object.values(this.queue).reduce((acc, el) => el < acc ? el : acc);
        }
        
        return res;
    },
    min() {
        if (this.oldIndex === this.newIndex) {
        return 0;
        }
        return this.minValue;
    },
    max() {
        if (this.oldIndex === this.newIndex) {
        return 0;
        }
        return this.maxValue;
    }
}
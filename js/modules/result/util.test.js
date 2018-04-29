import {assert} from 'chai';
import {LIFE, answer, answers} from './mock';
import {calculateAnswerScore, calculateTotalGameScore} from './util';

describe(`функция calculateAnswerScore: проверка параметров`, () => {
  const objDefault = answer.normal;

  it(`Должен выдывать ошибку, если параметр 'answer' не обьект`, () => {
    const types = [[], ``, 2, null, true];

    for (const type of types) {
      assert.throws(() => calculateAnswerScore(type));
    }
  });

  it(`Должен выбрасывать ошибку, если у параметра 'answer' отсутсвует свойство 'isCorrect'`, () => {
    const obj = Object.assign({}, objDefault);
    delete obj.isCorrect;
    assert.throw(() => calculateAnswerScore(obj));
  });

  it(`Должен выбрасывать ошибку, если у параметра 'answer' отсутсвует свойство 'time'`, () => {
    const obj = Object.assign({}, objDefault);
    delete obj.time;
    assert.throw(() => calculateAnswerScore(obj));
  });

  it(`Должен выбрасывать ошибку, если значение параметра 'answer.isCorrect' не булево`, () => {
    const obj = Object.assign({}, objDefault);
    obj.isCorrect = ``;
    assert.throw(() => calculateAnswerScore(obj));
  });

  it(`Должен выбрасывать ошибку, если значение параметра 'answer.time' не число`, () => {
    const obj = Object.assign({}, objDefault);
    obj.time = NaN;
    assert.throw(() => calculateAnswerScore(obj));
  });

  it(`Функция должна возвращать число`, () => {
    const obj = Object.assign({}, objDefault);
    obj.time = 8;
    assert.isNumber(calculateAnswerScore(obj));
  });
});

describe(`Функция calculateAnswerScore: подсчет количества очков в конкретном ответе`, () => {
  it(`При медленной скорости ответа`, () => {
    assert.equal(calculateAnswerScore(answer.slow), 50);
  });

  it(`При нормальной скорости ответа`, () => {
    assert.equal(calculateAnswerScore(answer.normal), 100);
  });

  it(`При быстрой скорости ответа`, () => {
    assert.equal(calculateAnswerScore(answer.fast), 150);
  });

  it(`При неверном ответе`, () => {
    assert.equal(calculateAnswerScore(answer.failed), 0);
  });
});

describe(`Функция calculateTotalGameScore: проверка параметров`, () => {
  it(`Должен выдавать ошибку, если параметр 'answers' не массив`, () => {
    const types = [{}, 1, ``, null, true];

    for (const type of types) {
      assert.throws(() => calculateTotalGameScore(type));
    }
  });

  it(`Должно возращаться -1, если количество ответов меньше 10`, () => {
    const arr = answers.normal.slice();
    arr.length = 9;

    assert.equal(-1, calculateTotalGameScore(arr, LIFE.max));
  });

  it(`Должен выдавать ошибку, если параметр 'lives' не число`, () => {
    const types = [`1`, true, {}, [], null];

    for (const type of types) {
      assert.throws(() => calculateTotalGameScore(type));
    }
  });

  it(`Должен выдавать ошибку, если жизней указано < 0 и > 3`, () => {
    assert.throws(() => calculateTotalGameScore(answers.normal, -1));
    assert.throws(() => calculateTotalGameScore(answers.normal, 4));
  });

  it(`Функция должна возвращать число`, () => {
    assert.isNumber(calculateTotalGameScore(answers.normal, LIFE.max));
  });
});

describe(`Функция calculateTotalGameScore: подсчет общего количества очков, с учетом количества жизней`, () => {

  it(`При медленной скорости ответов`, () => {
    assert.equal(calculateTotalGameScore(answers.slow, LIFE.max), 650);
    assert.equal(calculateTotalGameScore(answers.slow, LIFE.medium), 600);
    assert.equal(calculateTotalGameScore(answers.slow, LIFE.min), 550);
    assert.equal(calculateTotalGameScore(answers.slow, LIFE.none), 500);
  });

  it(`При нормальной скорости ответов`, () => {
    assert.equal(calculateTotalGameScore(answers.normal, LIFE.max), 1150);
    assert.equal(calculateTotalGameScore(answers.normal, LIFE.medium), 1100);
    assert.equal(calculateTotalGameScore(answers.normal, LIFE.min), 1050);
    assert.equal(calculateTotalGameScore(answers.normal, LIFE.none), 1000);
  });

  it(`При быстрой скорости ответов`, () => {
    assert.equal(calculateTotalGameScore(answers.fast, LIFE.max), 1650);
    assert.equal(calculateTotalGameScore(answers.fast, LIFE.medium), 1600);
    assert.equal(calculateTotalGameScore(answers.fast, LIFE.min), 1550);
    assert.equal(calculateTotalGameScore(answers.fast, LIFE.none), 1500);
  });
});

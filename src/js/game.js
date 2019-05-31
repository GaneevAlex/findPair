import {Square} from './square';
import {Utils} from './utiils';

/**
 * Размер поля по иксу
 * @type {number}
 */
const FIELD_SIZE_X = 4;

// Размер поля по игрику
const FIELD_SIZE_Y = 4;

/**
 * @class Game
 */
export class Game {
    /**
     * @param $canvas
     * @constructor
     */
    constructor ($canvas) {
        this.$canvas = $canvas;

        // Подстраиваем размеры сцены под квадраты
        this.$canvas.width(Square.size() * FIELD_SIZE_X);

        this.isRestart = false;

        this.reset();
    }

    /**
     * Создаёт поле игры
     */
    create () {
        this.reset();
        const squareAmount = Math.round((FIELD_SIZE_X * FIELD_SIZE_Y) / 2);

        // Создаём поле, т.к. всегда должна быть пара для каждого, добавляем сразу по 2
        for (let i = 0; i < squareAmount; i++) {
            const color = Utils.getRandomColor();
            this.field.push(new Square(color), new Square(color));
        }

        // Перемешиваем все клетки поля
        Utils.shuffle(this.field);

        // Добавляем клетки на сцену
        this.field.forEach((square) => {
            this.$canvas.append(square.getSquareHTML());
            square.element = $('div', this.$canvas).last();
        });
    }

    /**
     * Обнуляет все состояния игры
     */
    reset () {
        this.$canvas.html('');
        this.field = [];
        this.matchAmount = 0;

        this.firstSelectSquare = null;
        this.secondSelectSquare = null;

        this._gameStarted = false;
        this._startTime = 0;

        this.timerId = null;
    }

    /**
     * Обновляет состояние игры
     * @param {boolean} clear
     */
    update (clear) {
        if (!this.firstSelectSquare || !this.secondSelectSquare) {
            return;
        }

        // Если нужно очистить стиль клетки
        if (clear) {
            this.firstSelectSquare.removeAttr('style');
            this.secondSelectSquare.removeAttr('style');
        }

        this.firstSelectSquare = null;
        this.secondSelectSquare = null;
    }

    /**
     * Проверяет на выйгрыш
     */
    isGuess () {
        let result = false;

        // Если цвета совпадают
        if (this.firstSelectSquare.data('color') === this.secondSelectSquare.data('color')) {
            // Убираем обработчик события с клеток
            this.firstSelectSquare.off('click');
            this.secondSelectSquare.off('click');
            this.matchAmount++;
            result = true;
        }

        // Если количество найденных совпадений соответствует количеству возможных пар на поле
        if (this.matchAmount === (FIELD_SIZE_Y * FIELD_SIZE_X) / 2) {
            this.stopTimer();
            alert(`Вы выйграли! Затраченное время: ${this.duration}`);
            this._gameStarted = false;
            this.isRestart = true;
        }

        return result;
    }

    /**
     * Биндит обработчик на нажатие по клеткам
     */
    bind () {
        this.field.forEach((square) => {
            square.element.click(({target}) => {
                const $square = $(target);

                // Если не выбран хотя бы один квадрат
                if (!this.firstSelectSquare || !this.secondSelectSquare) {
                    $square.css('background-color', $square.data('color'));

                    if (this.firstSelectSquare && !$square.is(this.firstSelectSquare)) {
                        this.secondSelectSquare = $square;
                        const isGuess = this.isGuess();
                        setTimeout(() => this.update(!isGuess), 800);

                    } else {
                        this.firstSelectSquare = $square;
                    }
                }
            });
        })
    }

    /**
     * Проверяет запущена ли игра
     * @returns {boolean}
     */
    isStarted () {
        return this._gameStarted;
    }

    /**
     * Запускает таймер
     */
    startTimer () {
        this.timerId = setInterval(() => {
            const currentTime = new Date().getTime() - this._startTime;
            const hours = Math.floor((currentTime / 3600000) % 60);
            const minutes = Math.floor((currentTime / 60000) % 60);
            const seconds = currentTime / 1000 % 60;
            this.duration = `${hours > 0 ? hours + ':' : ''}${minutes > 10 ? minutes : '0' + minutes}:${seconds > 10 ? seconds : '0' + seconds}`;

            $('.timer').html(this.duration);

        }, 1);
    }

    /**
     * Останавливает время
     */
    stopTimer () {
        clearInterval(this.timerId);
    }

    /**
     * Стартует игру
     */
    start () {
        if (this.isRestart) {
            this.create();
        }

        this._gameStarted = true;
        this._startTime = new Date().getTime();
        this.startTimer();
        this.bind();
    }
}
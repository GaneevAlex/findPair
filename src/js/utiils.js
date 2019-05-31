export class Utils {
    /**
     * Получает случайный цвет
     * @returns {string}
     */
    static getRandomColor() {
        return '#' + (0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    }

    /**
     * Перемешивает элементы массива
     * @param {Array} array
     */
    static shuffle (array) {
        array.sort((a, b) => {
            return Math.random() - 0.5;
        });
    }
}
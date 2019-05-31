/**
 * @class Square
 */
export class Square {
    /**
     * @param {string} color
     * @constructor
     */
    constructor (color) {
        /**
         * @type {string}
         */
        this.color = color;

        /**
         * @type {jQuery|HTMLElement}
         * @private
         */
        this._element = null;
    }

    /**
     * @returns {jQuery|HTMLElement}
     */
    get element () {
        return this._element;
    }

    /**
     * @param {jQuery|HTMLElement} value
     */
    set element (value) {
        this._element = value;
    }

    /**
     * @returns {string}
     */
    getSquareHTML () {
        return `<div class="square" style="width: ${Square.size()}px; height: ${Square.size()}px" data-color="${this.color}">`;
    }

    /**
     * @returns {number}
     */
    static size () {
        return 70;
    }
}
import '../styles/main.less';
import {Game} from './game';

const game = new Game($('.canvas'));
game.create();

$('.start').on('click', ({target}) => {
    if (!game.isStarted()) {
        game.start();
    }
});
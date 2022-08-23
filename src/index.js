import './styles/index.scss';
import greenCards from './assets/MythicCards/green/index';
import redCards from './assets/MythicCards/brown/index';
import blueCards from './assets/MythicCards/blue/index';
import difficulties from './data/difficulties';
import ancients from './data/ancients';
import greenCardsData from './data/mythicCards/green/index';
import redCardsData from './data/mythicCards/brown/index';
import blueCardsData from './data/mythicCards/blue/index';
import cardBack from './assets/mythicCardBackground.png';

let cardDeck = []; //колода карт ссылки
let cardColor = []; //колода карт цвета


//трекер (обновляет текущее состояние колоды)-------------------------------
const tracker = () => {
    let stats = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    //подсчитывает количество карт каждого цвета
    for (let i = 0; i < cardColor[0].length; i++) {
        if (cardColor[0][i] === 'green') stats[0] += 1;
        if (cardColor[0][i] === 'red') stats[1] += 1;
        if (cardColor[0][i] === 'blue') stats[2] += 1;
    }
    for (let i = 0; i < cardColor[1].length; i++) {
        if (cardColor[1][i] === 'green') stats[3] += 1;
        if (cardColor[1][i] === 'red') stats[4] += 1;
        if (cardColor[1][i] === 'blue') stats[5] += 1;
    }
    for (let i = 0; i < cardColor[2].length; i++) {
        if (cardColor[2][i] === 'green') stats[6] += 1;
        if (cardColor[2][i] === 'red') stats[7] += 1;
        if (cardColor[2][i] === 'blue') stats[8] += 1;
    }
    //заполняет ячейки в документе
    document.getElementById('stat1').textContent = stats[0];
    document.getElementById('stat2').textContent = stats[1];
    document.getElementById('stat3').textContent = stats[2];
    document.getElementById('stat4').textContent = stats[3];
    document.getElementById('stat5').textContent = stats[4];
    document.getElementById('stat6').textContent = stats[5];
    document.getElementById('stat7').textContent = stats[6];
    document.getElementById('stat8').textContent = stats[7];
    document.getElementById('stat9').textContent = stats[8];
}

//-------------------------------------------------------------------------

//выкладывает по одной карте из колоды -------------------------------------
const deck = document.querySelector('.right__deck');
deck.addEventListener('click', () => { takeNextCard() });
const takeNextCard = () => {
    console.log(cardDeck)
    if (cardDeck[0].length > 0) { //проверка наличия карт в массиве
        changeCard(cardDeck[0].pop()); //меняет кущую карту на экране и удаляет из массива
        cardColor[0].pop(); //удаляет карту из массива цветов
        tracker(); //обновляет текущее состояние колоды
    } else if (cardDeck[1].length > 0) {
        changeCard(cardDeck[1].pop());
        cardColor[1].pop();
        tracker();
    } else if (cardDeck[2].length > 0) {
        changeCard(cardDeck[2].pop());
        cardColor[2].pop();
        tracker();
    } else { //если карты закончились
        deck.style.background = `none`;
    }
}
//---------------------------------------------------------------------------

//меняет текущую карту на экране --------------------------------------------
const changeCard = (img) => {
    const card = document.querySelector('.right__card');
    card.style.background = `url(${img})`;
    card.style.backgroundPosition = 'center';
    card.style.backgroundRepeat = 'no-repeat';
    card.style.backgroundSize = 'contain';
}
//--------------------------------------------------------------------------

//выбор древнего --------------------------------------------------------
let gameAncients; //хранит выбор древнего
const azathothCard = document.getElementById('a1');
const cthulhuCard = document.getElementById('a2');
const iogSothothCard = document.getElementById('a3');
const shubNiggurathCard = document.getElementById('a4');

const removeActivAncients = () => { //убирает класс актиив со всех карт
    azathothCard.classList.remove('activ');
    cthulhuCard.classList.remove('activ');
    iogSothothCard.classList.remove('activ');
    shubNiggurathCard.classList.remove('activ');
}
azathothCard.addEventListener('click', (e) => {
    gameAncients = 'azathoth';
    removeActivAncients();
    azathothCard.classList.add('activ'); //добавляет класс актив выбраной карте
})
cthulhuCard.addEventListener('click', (e) => {
    gameAncients = 'cthulhu';
    removeActivAncients();
    cthulhuCard.classList.add('activ');
})
iogSothothCard.addEventListener('click', (e) => {
    gameAncients = 'iogSothoth';
    removeActivAncients();
    iogSothothCard.classList.add('activ');
})
shubNiggurathCard.addEventListener('click', (e) => {
    gameAncients = 'shubNiggurath';
    removeActivAncients();
    shubNiggurathCard.classList.add('activ');
})

//--------------------------------------------------------------------------

// выбор уровня сложности --------------------------------------------------
let gameDifficult; //хранит выбор сложности
const d1 = document.getElementById('d1');
const d2 = document.getElementById('d2');
const d3 = document.getElementById('d3');
const d4 = document.getElementById('d4');
const d5 = document.getElementById('d5');

const removeActivDif = () => { //убирает класс актиив со всех кнопок
    d1.classList.remove('activ');
    d2.classList.remove('activ');
    d3.classList.remove('activ');
    d4.classList.remove('activ');
    d5.classList.remove('activ');
}
d1.addEventListener('click', (e) => {
    gameDifficult = 'd1';
    removeActivDif();
    d1.classList.add('activ'); //добавляет класс актив выбраной карте
})
d2.addEventListener('click', (e) => {
    gameDifficult = 'd2';
    removeActivDif();
    d2.classList.add('activ');
})
d3.addEventListener('click', (e) => {
    gameDifficult = 'd3';
    removeActivDif();
    d3.classList.add('activ');
})
d4.addEventListener('click', (e) => {
    gameDifficult = 'd4';
    removeActivDif();
    d4.classList.add('activ');
})
d5.addEventListener('click', (e) => {
    gameDifficult = 'd5';
    removeActivDif();
    d5.classList.add('activ');
})
//--------------------------------------------------------------------------

// Замешивает колоду----------------------------------------------------------
const mixBtn = document.querySelector('.right__btnMix');
mixBtn.addEventListener('click', () => {
    mixDeck(); //замешывает колоду
    tracker(); //обновляет текущее состояние колоды
    removeActivDif(); //убирает активный класс с кнопок
    removeActivAncients(); //убирает класс актив с карт
    gameDifficult = ''; //очищает переменные
    gameAncients = '';
    deck.style.background = `url(${cardBack})`; //добавляет картинку полной калоды карт
    document.querySelector('.right__card').style.background = `none`; //убирает картинку карты с предыдущей игры
})


//доделать функцию замеса колоды карт
const mixDeck = () => {
    console.log(gameAncients, gameDifficult);
    cardDeck = [[greenCards.green12, redCards.brown11, redCards.brown14], [redCards.brown6, greenCards.green14], [blueCards.blue10]];
    cardColor = [['green', 'red', 'red'], ['red', 'green'], ['blue']];
}
//--------------------------------------------------------------------------
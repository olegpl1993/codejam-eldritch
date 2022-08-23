import './styles/index.scss';
import ancients from './data/ancients';
import greenCardsData from './data/mythicCards/green/index';
import brownCardsData from './data/mythicCards/brown/index';
import blueCardsData from './data/mythicCards/blue/index';
import cardBack from './assets/mythicCardBackground.png';

let cardDeck = [[], [], []]; //колода карт ссылки

//трекер (обновляет текущее состояние колоды)-------------------------------
const tracker = () => {
    let stats = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    //подсчитывает количество карт каждого цвета
    for (let i = 0; i < cardDeck[0].length; i++) {
        if (cardDeck[0][i].color === 'green') stats[0] += 1;
        if (cardDeck[0][i].color === 'brown') stats[1] += 1;
        if (cardDeck[0][i].color === 'blue') stats[2] += 1;
    }
    for (let i = 0; i < cardDeck[1].length; i++) {
        if (cardDeck[1][i].color === 'green') stats[3] += 1;
        if (cardDeck[1][i].color === 'brown') stats[4] += 1;
        if (cardDeck[1][i].color === 'blue') stats[5] += 1;
    }
    for (let i = 0; i < cardDeck[2].length; i++) {
        if (cardDeck[2][i].color === 'green') stats[6] += 1;
        if (cardDeck[2][i].color === 'brown') stats[7] += 1;
        if (cardDeck[2][i].color === 'blue') stats[8] += 1;
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
    if (cardDeck[0].length > 0) { //проверка наличия карт в массиве
        changeCard(cardDeck[0].pop()); //меняет кущую карту на экране и удаляет из массива
        tracker(); //обновляет текущее состояние колоды
    } else if (cardDeck[1].length > 0) {
        changeCard(cardDeck[1].pop());
        tracker();
    } else if (cardDeck[2].length > 0) {
        changeCard(cardDeck[2].pop());
        tracker();
    }
    if (cardDeck[0].length === 0 && cardDeck[1].length === 0 && cardDeck[2].length === 0) { // карты закончились
        deck.style.background = `none`; //убирает картинку колоды
    }
}
//---------------------------------------------------------------------------

//меняет текущую карту на экране --------------------------------------------
const changeCard = (img) => {
    const card = document.querySelector('.right__card');
    card.style.background = `url(${img.cardFace})`;
    card.style.backgroundPosition = 'center';
    card.style.backgroundRepeat = 'no-repeat';
    card.style.backgroundSize = 'contain';
}
//--------------------------------------------------------------------------

//выбор древнего --------------------------------------------------------
let ancientNumber; //хранит выбор древнего

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
    ancientNumber = 0;
    removeActivAncients();
    azathothCard.classList.add('activ'); //добавляет класс актив выбраной карте
})
cthulhuCard.addEventListener('click', (e) => {
    ancientNumber = 1;
    removeActivAncients();
    cthulhuCard.classList.add('activ');
})
iogSothothCard.addEventListener('click', (e) => {
    ancientNumber = 2;
    removeActivAncients();
    iogSothothCard.classList.add('activ');
})
shubNiggurathCard.addEventListener('click', (e) => {
    ancientNumber = 3;
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


// выбирает карты подходящие по уровню сложности -----------------------------
let priorDeck = [[], [], []]; //главный промежуточный массив
let secondDeck = [[], [], []]; //дополнительный промежуточный массив

let commonDeck = () => {
    //для очень низкого уровня сложности
    if (gameDifficult === 'd1') {
        for (let el of greenCardsData) {
            if (el.difficulty === 'easy') priorDeck[0].push(el);
            if (el.difficulty === 'normal') secondDeck[0].push(el);
        }
        for (let el of brownCardsData) {
            if (el.difficulty === 'easy') priorDeck[1].push(el);
            if (el.difficulty === 'normal') secondDeck[1].push(el);
        }
        for (let el of blueCardsData) {
            if (el.difficulty === 'easy') priorDeck[2].push(el);
            if (el.difficulty === 'normal') secondDeck[2].push(el);
        }
    }
    //для низкого уровня сложности
    if (gameDifficult === 'd2') {
        for (let el of greenCardsData) {
            if (el.difficulty === 'easy' || el.difficulty === 'normal') priorDeck[0].push(el);
        }
        for (let el of brownCardsData) {
            if (el.difficulty === 'easy' || el.difficulty === 'normal') priorDeck[1].push(el);
        }
        for (let el of blueCardsData) {
            if (el.difficulty === 'easy' || el.difficulty === 'normal') priorDeck[2].push(el);
        }
    }
    //для средний уровня сложности
    if (gameDifficult === 'd3') {
        for (let el of greenCardsData) {
            priorDeck[0].push(el);
        }
        for (let el of brownCardsData) {
            priorDeck[1].push(el);
        }
        for (let el of blueCardsData) {
            priorDeck[2].push(el);
        }
    }
    //для высокого уровня сложности
    if (gameDifficult === 'd4') {
        for (let el of greenCardsData) {
            if (el.difficulty === 'hard' || el.difficulty === 'normal') priorDeck[0].push(el);
        }
        for (let el of brownCardsData) {
            if (el.difficulty === 'hard' || el.difficulty === 'normal') priorDeck[1].push(el);
        }
        for (let el of blueCardsData) {
            if (el.difficulty === 'hard' || el.difficulty === 'normal') priorDeck[2].push(el);
        }
    }
    //для очень высокого уровня сложности
    if (gameDifficult === 'd5') {
        for (let el of greenCardsData) {
            if (el.difficulty === 'hard') priorDeck[0].push(el);
            if (el.difficulty === 'normal') secondDeck[0].push(el);
        }
        for (let el of brownCardsData) {
            if (el.difficulty === 'hard') priorDeck[1].push(el);
            if (el.difficulty === 'normal') secondDeck[1].push(el);
        }
        for (let el of blueCardsData) {
            if (el.difficulty === 'hard') priorDeck[2].push(el);
            if (el.difficulty === 'normal') secondDeck[2].push(el);
        }
    }

    //проверка каких карт нехватает в главном промежуточном массиве
    let minusGreen = priorDeck[0].length - (ancients[ancientNumber].firstStage.greenCards + ancients[ancientNumber].secondStage.greenCards + ancients[ancientNumber].thirdStage.greenCards);
    if (minusGreen < 0) {
        for (let i = 0; i < Math.abs(minusGreen); i++) {
            let rndNum = Math.floor(Math.random() * secondDeck[0].length); //случайное значение из дополнительного массива
            priorDeck[0].push(secondDeck[0][rndNum]); //добавляет елемент в главный массив
            secondDeck[0].splice(rndNum, 1); //удаляет елемент из дополнительного массива
        }
    }
    let minusBrown = priorDeck[1].length - (ancients[ancientNumber].firstStage.brownCards + ancients[ancientNumber].secondStage.brownCards + ancients[ancientNumber].thirdStage.brownCards);
    if (minusBrown < 0) {
        for (let i = 0; i < Math.abs(minusBrown); i++) {
            let rndNum = Math.floor(Math.random() * secondDeck[1].length); //случайное значение из дополнительного массива
            priorDeck[1].push(secondDeck[1][rndNum]); //добавляет елемент в главный массив
            secondDeck[1].splice(rndNum, 1); //удаляет елемент из дополнительного массива
        }
    }
    let minusBlue = priorDeck[2].length - (ancients[ancientNumber].firstStage.blueCards + ancients[ancientNumber].secondStage.blueCards + ancients[ancientNumber].thirdStage.blueCards);
    if (minusBlue < 0) {
        for (let i = 0; i < Math.abs(minusBlue); i++) {
            let rndNum = Math.floor(Math.random() * secondDeck[2].length); //случайное значение из дополнительного массива
            priorDeck[2].push(secondDeck[2][rndNum]); //добавляет елемент в главный массив
            secondDeck[2].splice(rndNum, 1); //удаляет елемент из дополнительного массива
        }
    }
}
//----------------------------------------------------------------------------

// Замешивает колоду----------------------------------------------------------
const mixBtn = document.querySelector('.right__btnMix');
mixBtn.addEventListener('click', () => {
    if (gameDifficult === undefined || ancientNumber === undefined) { //срабатывает если не выбрана сложность или древний
        //очистка всех переменных
        priorDeck = [[], [], []];
        secondDeck = [[], [], []];
        gameDifficult = undefined;
        ancientNumber = undefined;
        cardDeck = [[], [], []]; //очистка колоды с предыдущего замеса
        tracker(); //обновляет текущее состояние колоды
        removeActivDif(); //убирает активный класс с кнопок
        removeActivAncients(); //убирает класс актив с карт
        deck.style.background = `none`; //добавляет картинку полной калоды карт
        document.querySelector('.right__card').style.background = `none`; //убирает картинку карты с предыдущей игры
    } else {
        cardDeck = [[], [], []]; //очистка колоды с предыдущего замеса
        mixDeck(); //замешывает колоду
        tracker(); //обновляет текущее состояние колоды
        removeActivDif(); //убирает активный класс с кнопок
        removeActivAncients(); //убирает класс актив с карт
        deck.style.background = `url(${cardBack})`; //добавляет картинку полной калоды карт
        document.querySelector('.right__card').style.background = `none`; //убирает картинку карты с предыдущей игры
        //очистка переменных
        priorDeck = [[], [], []];
        secondDeck = [[], [], []];
        gameDifficult = undefined;
        ancientNumber = undefined;
    }
})

const mixDeck = () => {
    commonDeck(); //создает промежуточный массив карт подходящие по уровню сложности

    //перемешывает карты в промежуточном массиве
    priorDeck[0].sort(() => Math.random() - 0.5);
    priorDeck[1].sort(() => Math.random() - 0.5);
    priorDeck[2].sort(() => Math.random() - 0.5);

    //заполняет основной массив картами из промежуточного массива
    //первая стадия
    for (let i = 0; i < ancients[ancientNumber].firstStage.greenCards; i++) {
        cardDeck[0].push(priorDeck[0].pop()); //забирает карту из промежуточного массива в итоговый
    }
    for (let i = 0; i < ancients[ancientNumber].firstStage.brownCards; i++) {
        cardDeck[0].push(priorDeck[1].pop()); //забирает карту из промежуточного массива в итоговый
    }
    for (let i = 0; i < ancients[ancientNumber].firstStage.blueCards; i++) {
        cardDeck[0].push(priorDeck[2].pop()); //забирает карту из промежуточного массива в итоговый
    }
    //вторая стадия
    for (let i = 0; i < ancients[ancientNumber].secondStage.greenCards; i++) {
        cardDeck[1].push(priorDeck[0].pop()); //забирает карту из промежуточного массива в итоговый
    }
    for (let i = 0; i < ancients[ancientNumber].secondStage.brownCards; i++) {
        cardDeck[1].push(priorDeck[1].pop()); //забирает карту из промежуточного массива в итоговый
    }
    for (let i = 0; i < ancients[ancientNumber].secondStage.blueCards; i++) {
        cardDeck[1].push(priorDeck[2].pop()); //забирает карту из промежуточного массива в итоговый
    }
    //третья стадия
    for (let i = 0; i < ancients[ancientNumber].thirdStage.greenCards; i++) {
        cardDeck[2].push(priorDeck[0].pop()); //забирает карту из промежуточного массива в итоговый
    }
    for (let i = 0; i < ancients[ancientNumber].thirdStage.brownCards; i++) {
        cardDeck[2].push(priorDeck[1].pop()); //забирает карту из промежуточного массива в итоговый
    }
    for (let i = 0; i < ancients[ancientNumber].thirdStage.blueCards; i++) {
        cardDeck[2].push(priorDeck[2].pop()); //забирает карту из промежуточного массива в итоговый
    }
    //перемешывает карты в основном массиве
    cardDeck[0].sort(() => Math.random() - 0.5);
    cardDeck[1].sort(() => Math.random() - 0.5);
    cardDeck[2].sort(() => Math.random() - 0.5);
}
//-----------------------------------------------------------------------------

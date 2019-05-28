const cardTypes = [
    {name: 'red', isWhiteColor: true, founded: false},
    {name: 'blue', isWhiteColor: true, founded: false},
    {name: 'green', isWhiteColor: true, founded: false},
    {name: 'yellow', isWhiteColor: true, founded: false},
    {name: 'orange', isWhiteColor: true, founded: false},
    {name: 'gray', isWhiteColor: true, founded: false},
    {name: 'turquoise', isWhiteColor: true, founded: false},
    {name: 'violet', isWhiteColor: true, founded: false},
];

const allCards = [].concat(_.cloneDeep(cardTypes), _.cloneDeep(cardTypes)); // создание пары для каждого типа карт

// перемешивание карт
const shuffleCards = () => {
    return _.shuffle(allCards);
}

new Vue({
    el: "#app",

    data: {
        cards: shuffleCards(),//массив карточек
        started: false,//началась ли игра
        lockBoard: false,//блокировка поля
        showModal: false,//видимость всплывающего окна
        firstCard: null,
        secondCard: null,
        timer: null,
        foundedCardsPairs: 0,//количество найденых пар
        startTime: 0,
        time: "--:--:---",
    },

    methods:
        {
            //изменение цвета карточки
            flip(card) {
                if (this.started && !card.founded && !this.lockBoard) {//Карточка реагирует только если игра началась, поле не заблокировано и карточка ещё не найдена

                    if (card === this.firstCard) //проверка повторноого нажатия на ту же карточку
                        return;

                    card.isWhiteColor = false;//смена цвета

                    if (this.firstCard===null) {//проверка, выбрана ли первая карта
                          this.firstCard = card;// выбор данной карты первой
                          return;
                    }

                    this.secondCard = card;//выбор карты второй

                    this.checkForMatch();
                }
            },

            checkForMatch() {// сравнение выбраных карточек
                if (this.firstCard.name === this.secondCard.name) {
                    this.disableCards();
                    return;
                }

                this.unflipCards();
            },

            disableCards() {//отметить карты найденными
                this.firstCard.founded = true;
                this.secondCard.founded = true;
                this.foundedCardsPairs++;//счетчик найденых пар
                if (this.foundedCardsPairs === cardTypes.length) {
                    this.endGame();
                    return;
                }
                this.resetBoard();
            },

            unflipCards() {//закрасить белым
                this.lockBoard = true;//блокировка доски
                setTimeout(() => {
                    this.firstCard.isWhiteColor = true;
                    this.secondCard.isWhiteColor = true;
                    this.resetBoard();
                }, 500);
            },

            endGame() {//завершение игры
                clearInterval(this.timer);//остановить таймер
                this.started = false;//остановить игру
                this.showModal = true;//вывод всплывающего окна
            },

            resetBoard() {//сброс доски
              this.lockBoard = false;
              this.firstCard = this.secondCard = null;
            },

            resetGame() {//сброс игры при нажатии на кнопку Старт
                //сброс
                this.resetBoard();
                this.started = true;
                this.foundedCardsPairs = 0;
                //запуск таймера
                this.startTime = moment();
                this.timer = setInterval(() => {
                    this.time = moment(moment().diff(this.startTime)).format("mm:ss:SSS");
                }, 1);
                //перемешать карточки
                this.cards = shuffleCards();
                //сброс
                this.cards.forEach((card) => {
                    card.isWhiteColor = true;
                    card.founded = false;
                });
            },


        }

});

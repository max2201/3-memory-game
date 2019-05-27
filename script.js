const cardTypes = [
    { name: 'red',       isWhiteColor:false, founded:false },
    { name: 'blue',      isWhiteColor:false, founded:false },
    { name: 'green',     isWhiteColor:false, founded:false},
    { name: 'yellow',    isWhiteColor:false, founded:false },
    { name: 'orange',    isWhiteColor:false, founded:false },
    { name: 'gray',      isWhiteColor:false, founded:false},
    { name: 'turquoise', isWhiteColor:false, founded:false },
    { name: 'violet',    isWhiteColor:false, founded:false },
];

const allCards = [].concat(_.cloneDeep(cardTypes),_.cloneDeep(cardTypes)); // создание пары для каждого типа карт

// перемешивание карт
const shuffleCards = () => {
     return _.shuffle(allCards);
}

new Vue({
    el: "#app",

    data: {
        cards: shuffleCards(),
        started: false,
        hasFlippedCard:false,
        lockBoard:false,
        showModal: false,
        firstCard: null,
        secondCard:null,
        timer: null,
foundedCardsPairs:0,
        startTime: 0,
        time: "--:--:---",
         },

    methods:
        {

            flip(card){
                if (this.started&&!card.founded&&!this.lockBoard) {
                    if (card === this.firstCard) return;
                    card.isWhiteColor=false;
                    if(!this.hasFlippedCard){
                        this.hasFlippedCard=true;
                        this.firstCard=card;
                        return
                    }
                    this.secondCard=card;
                    this.hasFlippedCard=false;
                    this.checkForMatch();
                }

            },

            checkForMatch(){
                if (this.firstCard.name === this.secondCard.name) {
                    this.disableCards();
                    return;
                }

                this.unflipCards();
            },

            disableCards(){
                this.firstCard.founded=true;
                this.secondCard.founded=true;
                this.foundedCardsPairs++;
                if(this.foundedCardsPairs===8){
                 this.endGame();
                }
                this.resetBoard();
            },

            unflipCards(){
                this.lockBoard = true;
                setTimeout(() => {
                    this.firstCard.isWhiteColor=true;
                    this.secondCard.isWhiteColor=true;
                    this.lockBoard = false;
                    this.resetBoard();
                }, 500);
            },

            endGame(){
                clearInterval(this.timer);
                this.started = false;
                this.showModal = true;
            },


            resetBoard(){
                this.hasFlippedCard = this.lockBoard = false;
                this.firstCard = this.secondCard = null;
            },
            //TODO:пересмотреть resetgame и resetboard
        resetGame(){
                this.hasFlippedCard = this.lockBoard = false;
                   this.firstCard = this.secondCard = null;

                   this.started = true;
                   this.foundedCardsPairs=0;


                 this.startTime = moment();
            this.timer = setInterval(() => {
                this.time = moment(moment().diff(this.startTime)).format("mm:ss:SSS");
            }, 1);


                   this.cards = shuffleCards();

this.cards.forEach((card) => {
    card.isWhiteColor = true;
    card.founded = false;
});


              },


    }

});

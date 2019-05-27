const cardTypes = [
    { name: 'red',       isWhiteColor:true, founded:false },
    { name: 'blue',      isWhiteColor:true, founded:false },
    { name: 'green',     isWhiteColor:true, founded:false},
    { name: 'yellow',    isWhiteColor:true, founded:false },
    { name: 'orange',    isWhiteColor:true, founded:false },
    { name: 'gray',      isWhiteColor:true, founded:false},
    { name: 'turquoise', isWhiteColor:true, founded:false },
    { name: 'violet',    isWhiteColor:true, founded:false },
];


const cards = [].concat(_.cloneDeep(cardTypes),_.cloneDeep(cardTypes));

let shuffleCards = () => {
     return _.shuffle(cards);
}



new Vue({
    el: "#app",

    data: {
        cards: shuffleCards(),
        started: false,
        lockBoard:false,
        hasFlippedCard:false,
        firstCard: null,
        secondCard:null,
foundedCardsPairs:0,
        showSplash: false,



        startTime: 0,
        timer: null,
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
                this.showSplash = true;
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
            //TODO:заменить each на стандартное
                   _.each(this.cards, (card) => {
                           card.isWhiteColor = true;
                           card.founded = false;
                       }
                   );



              },


    }

});

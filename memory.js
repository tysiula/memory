for (let i=0; i<18; i++){
    let div = document.createElement('div');
    document.body.appendChild(div).setAttribute('class', 'div');}   //add divs

const cardsColor = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];
let cards = document.getElementsByClassName('div');
cards= [...cards];

const init = function () {
    cards.forEach(x => {
        const position = Math.floor(Math.random() * cardsColor.length);
        x.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);                                 // add div colorCards classes
    })
    setTimeout(function (){
        cards.forEach(x => {
            x.classList.add("hidden");
            x.addEventListener("click", cardClick);
        })
    },2000)
}
init()                                                              // event click

let activeCard = "";
const active_cards= [];
const pairsGame = cards.length / 2;
let resultsGame = 0;

const cardClick = function (){
    activeCard = this;
    activeCard.classList.remove("hidden");

    if (active_cards.length === 0 ){
        active_cards[0] = activeCard;
        //return;
    }
    else {
        cards.forEach(x => x.removeEventListener("click", cardClick))
        active_cards[1] = activeCard;

        setTimeout(function (){
            if (active_cards[0].className === active_cards[1].className) {
                active_cards.forEach(x => x.classList.add("off"))
                resultsGame++;

                if (resultsGame === pairsGame) {
                    alert('wygrana');
                    //location.reload();
                }
                } else {
                    active_cards.forEach(x => x.classList.add("hidden"))
                }
                activeCard = "";
                active_cards.length = 0;
                cards.forEach(x => x.addEventListener("click", cardClick))

        }, 1000)
    }
};
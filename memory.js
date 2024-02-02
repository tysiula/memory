$(document).ready(function () {
    let cards, pairsGame;
    let activeCard = '';
    const active_cards = [];
    let resultsGame = 0;
    const startTime = new Date().getTime();

    addCardDivs();
    init();

    function addCardDivs() {
        for (let i = 0; i < 18; i++) {
            let div = document.createElement('div');
            $(document.body).append($(div).attr('class', 'div'));
        }
        cards = $('.div');
        cards = [...cards];
        pairsGame = cards.length / 2;
    }

    function init() {
        const cardsColor = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];
        addColorCardsToDiv();
        setTimeout(function () {
            cards.forEach(x => {
                $(x).addClass("hidden")
                x.addEventListener("click", cardClick);
            })
        }, 2000)

        function addColorCardsToDiv() {
            cards.forEach(x => {
                const position = Math.floor(Math.random() * cardsColor.length);
                $(x).addClass(cardsColor[position]);
                cardsColor.splice(position, 1);
            })
        }
    }

    const cardClick = function () {
        activeCard = this;
        $(this).removeClass("hidden");


        if (active_cards.length === 0) {
            active_cards[0] = activeCard;
        } else {
            cards.forEach(x => x.removeEventListener("click", cardClick))
            active_cards[1] = activeCard;

            setTimeout(function () {
                if (active_cards[0].className === active_cards[1].className) {
                    active_cards.forEach(card => $(card).addClass("off"))
                    resultsGame++;
                    cards = cards.filter(card => !card.classList.contains("off"));
                    if (resultsGame === pairsGame) {
                       const endTime = new Date().getTime();
                       let gameTime = (endTime - startTime) / 1000;
                       $('#message').html(
                       'TWÓJ CZAS = ' +gameTime+ ' sekund' + '<br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>');
                    }
                } else {
                    active_cards.forEach(card => $(card).addClass("hidden"))
                }
                activeCard = "";
                active_cards.length = 0;
                cards.forEach(x => x.addEventListener("click", cardClick))
            }, 1000)
        }
    };

});
(() =>{
    'use strict'
    // Deinition Area
    let deck = [];
    const types = ["C", "D", "H", "S"];
    const specialCards = ["A", "J", "Q", "K"];
    let playerPoints = 0,
        computerPoints = 0;

    // References.
    const btnTake = document.querySelector("#btnTake");
    const btnNew = document.querySelector("#btnNew");
    const btnStop = document.querySelector("#btnStop");

    const playersCard = document.querySelector("#player-cards");
    const computersCard = document.querySelector("#computer-cards")
    const gamePoints = document.querySelectorAll('small');

    // Create New Deck
    const createDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }

        for (let type of types) {
            for (let special of specialCards) {
                deck.push(special + type);
            }
        }

        deck = _.shuffle(deck);
        // console.log(deck);
        return deck;
    };

    createDeck();

    // Take a card of the deck.
    const takeCard = () => {
        if (deck.length === 0) {
            throw "There are no cards in the deck";
        }

        const card = deck.pop();
        // console.log(card);
        return card;
    };

    // takeCard();
    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);

    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
    };

    // Computer Turn.
    const computerTurn = (minPoints) => {
        do {
            const card = takeCard();

            // Player points in the web page.
            computerPoints += cardValue(card);
            gamePoints[1].innerHTML = '<b>' + computerPoints + '</b>';

            // Put card in the screen.
            const cardImg = document.createElement("img");
            cardImg.src = `assets/cartas/${card}.png`;
            cardImg.classList.add('cards');
            computersCard.append(cardImg);

            if(minPoints > 21){
                break;
            }

        } while (computerPoints < minPoints && (minPoints <= 21));

        setTimeout(() => {
            if(computerPoints === minPoints){
                alert('Tie');
            }else if(minPoints > 21){
                alert('Computer Won')
            }else if(computerPoints > 21){
                alert('Player 1 Won');
            }else if(computerPoints > minPoints && computerPoints <= 21){
                alert('Computer Won');
            }else if(computerPoints > 21 && minPoints > 21){
                alert('Tie');
            }else if(minPoints > computerPoints && minPoints <= 21){
                alert('Player 1 Won');
            }
        }, 10);
    }

    // Events
    btnTake.addEventListener("click", () => {
        const card = takeCard();

        // Player points in the web page.
        playerPoints += cardValue(card);
        gamePoints[0].innerHTML = '<b>' + playerPoints + '</b>';

        // Put card in the screen.
        const cardImg = document.createElement("img");
        cardImg.src = `assets/cartas/${card}.png`;
        cardImg.classList.add('cards');
        playersCard.append(cardImg);

        // Extra funtions
        if (playerPoints > 21) {
            btnTake.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        }else if(playerPoints === 21){
            btnTake.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        }
    });

    // Stop Players turn
    btnStop.addEventListener('click', () =>{
        btnTake.disabled = true;
        btnStop.disabled = true;

        computerTurn(playerPoints);
    });

    // New Game
    btnNew.addEventListener('click', () => {
        console.clear();
        // Reset Deck
        deck = [];
        deck = createDeck();

        // Reset Points
        playerPoints = 0;
        computerPoints = 0;

        // Reset screen points and cards
        playersCard.innerHTML = '';
        computersCard.innerHTML = '';
        gamePoints[0].innerText = 0;
        gamePoints[1].innerText = 0;

        // Enable buttons
        btnTake.disabled = false;
        btnStop.disabled = false;

    });
})();


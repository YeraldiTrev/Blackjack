const Game = (() => {
  "use strict";
  // Deinition Area
  let deck = [];
  const types = ["C", "D", "H", "S"],
    specialCards = ["A", "J", "Q", "K"];
  let playersPoints = [];

  // References.
  const btnTake = document.querySelector("#btnTake"),
    btnNew = document.querySelector("#btnNew"),
    btnStop = document.querySelector("#btnStop");

  const divPlayersCards = document.querySelectorAll(".divCards"),
    gamePoints = document.querySelectorAll("small");

  const startGame = (playersNum = 2) => {
    deck = createDeck();
    playersPoints = [];
    for (let i = 0; i < playersNum; i++) {
      playersPoints.push(0)
    }

    gamePoints.forEach(elem => elem.innerText = 0)

    // Reset screen points and cards
    divPlayersCards.forEach(elem => elem.innerText = '')

    // Enable buttons
    btnTake.disabled = false;
    btnStop.disabled = false;
  }

  const createDeck = () => {
    // Empty deck
    deck = [];

    // Create Deck
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

    return _.shuffle(deck);;
  };

  // Take a card of the deck.
  const takeCard = () => {
    if (deck.length === 0) {
      throw "There are no cards in the deck";
    }
    return deck.pop();
  };

  // Card Value
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  // Turn: 0 = first player and last = computer.
  const acumPoints = (card, turn) => {
    playersPoints[turn] += cardValue(card);
    gamePoints[turn].innerHTML = "<b>" + playersPoints[turn] + "</b>";
    return playersPoints[turn];
  }

  const createCard = (card, turn) => {
    const cardImg = document.createElement("img");
    cardImg.src = `assets/cartas/${card}.png`;
    cardImg.classList.add('cards');
    divPlayersCards[turn].append(cardImg);
  }

  const winner = () => {
    const [minPoints, computerPoints] = playersPoints;
    setTimeout(() => {
      if (computerPoints === minPoints) {
        alert("Tie");
      } else if (minPoints > 21) {
        alert("Computer Won");
      } else if (computerPoints > 21) {
        alert("Player 1 Won");
      } else {
        alert('Computer Won')
      }
    }, 100);
  }

  // Computer Turn.
  const computerTurn = (minPoints) => {
    let computerPoints = 0;
    do {
      const card = takeCard();
      computerPoints = acumPoints(card, playersPoints.length - 1);
      createCard(card, playersPoints.length - 1);

    } while (computerPoints < minPoints && minPoints <= 21);

    winner();
  };

  // Events
  btnTake.addEventListener("click", () => {
    const card = takeCard();
    // Player points in the web page.
    const playerPoints = acumPoints(card, 0);
    createCard(card, 0);

    // Extra funtions
    if (playerPoints > 21) {
      btnTake.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    } else if (playerPoints === 21) {
      btnTake.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    }
  });

  // Stop Players turn
  btnStop.addEventListener("click", () => {
    btnTake.disabled = true;
    btnStop.disabled = true;

    computerTurn(playersPoints[0]);
  });

  // New Game
  btnNew.addEventListener("click", () => {
    startGame()
  });

  return {
    newGame: startGame
  };
})();
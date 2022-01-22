var drawCards = [];
var tableCard = [];
var cPUHand = [];
var playerHand = [];
window.onload = function () {
    document.getElementById("DrawCards").addEventListener("click", DrawCard, false);
    Play();
};
//
function DrawCard() {
    if (CardCheck(playerHand) == false) {
        playerHand.push(drawCards[drawCards.length - 1]);
        drawCards.splice(drawCards.length - 1, 1);
        updateHTML("PlayerHand");
        updateHTML("DrawCards");
    }
    if (CardCheck(playerHand) == false) {
        EnemyTurn();
    }
}
function CardCheck(array) {
    var suitableCard = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i].CardColor == tableCard[tableCard.length - 1].CardColor || array[i].CardValue == tableCard[tableCard.length - 1].CardValue) {
            suitableCard = true;
            break;
        }
    }
    return suitableCard;
}
function updateHTML(Target) {
    ClearHTML(Target);
    if (Target == "PlayerHand") {
        for (var i = 0; i < playerHand.length; i++) {
            CardHTML(playerHand[i], "PlayerHand", i);
        }
    }
    if (Target == "CPUHand") {
        for (var i = 0; i < cPUHand.length; i++) {
            HiddenCard(cPUHand[i], "CPUHand", i);
        }
    }
    if (Target == "TableCard") {
        CardHTML(tableCard[tableCard.length - 1], "TableCard", tableCard.length - 1);
    }
    if (Target == "DrawCards") {
        HiddenCard(drawCards[drawCards.length - 1], "DrawCards", drawCards.length - 1);
    }
}
function ClearHTML(Target) {
    var Element = document.getElementById(Target);
    while (Element.firstChild) {
        Element.removeChild(Element.firstChild);
    }
}
function CardHTML(Card, Target, index) {
    var holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", "Card" + " " + Card.CardColor);
    document.getElementById(Target).appendChild(holdingDiv);
    var Number = document.createElement("p");
    Number.setAttribute("class", "CardValue");
    Number.innerHTML = "" + Card.CardValue;
    holdingDiv.appendChild(Number);
    if (Target == "PlayerHand") {
        holdingDiv.addEventListener("click", function () { CardPut(Card, index); }, false);
    }
}
function HiddenCard(card, Target, index) {
    var holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", "card" + " " + "Hidden");
    document.getElementById(Target).appendChild(holdingDiv);
}
function CardPut(card, index) {
    if (card.CardValue == tableCard[tableCard.length - 1].CardValue || card.CardColor == tableCard[tableCard.length - 1].CardColor) {
        tableCard.push(card);
        playerHand.splice(index, 1);
        if (playerHand.length < 1) {
            GameOver(true);
        }
        updateHTML("PlayerHand");
        updateHTML("TableCard");
        EnemyTurn();
    }
}
function EnemyTurn() {
    var i = 0;
    for (i; i < cPUHand.length; i++) {
        if (cPUHand[i].CardColor == tableCard[tableCard.length - 1].CardColor || cPUHand[i].CardValue == tableCard[tableCard.length - 1].CardValue) {
            tableCard.push(cPUHand[i]);
            cPUHand.splice(i, 1);
            if (cPUHand.length < 1) {
                GameOver(false);
            }
            updateHTML("TableCard");
            updateHTML("CPUHand");
            break;
        }
    }
    if (i >= cPUHand.length) {
        cPUHand.push(drawCards[drawCards.length - 1]);
        drawCards.splice(drawCards.length - 1, 1);
        updateHTML("DrawCards");
        updateHTML("CPUHand");
        if (cPUHand[cPUHand.length - 1].CardColor == tableCard[tableCard.length - 1].CardColor || cPUHand[cPUHand.length - 1].CardValue == tableCard[tableCard.length - 1].CardValue) {
            tableCard.push(cPUHand[cPUHand.length - 1]);
            cPUHand.splice(cPUHand.length - 1, 1);
            updateHTML("TableCard");
            updateHTML("CPUHand");
        }
    }
}
function GenerateCards() {
    var Color;
    for (var i = 1; i <= 8; i++) {
        for (var c = 1; c <= 4; c++) {
            if (c == 1) {
                Color = "Blue";
            }
            if (c == 2) {
                Color = "Red";
            }
            if (c == 3) {
                Color = "Yellow";
            }
            if (c == 4) {
                Color = "Green";
            }
            var NewCard = {
                CardColor: Color, CardValue: i
            };
            drawCards.push(NewCard);
        }
    }
    console.log(drawCards);
}
function shuffle(array) {
    var currentIndex = array.length;
    var TempValue;
    var randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        TempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = TempValue;
    }
    return array;
}
function Play() {
    GenerateCards();
    drawCards = shuffle(drawCards);
    for (var i = 0; i < 5; i++) {
        playerHand.push(drawCards[i]);
        cPUHand.push(drawCards[i + 5]);
    }
    tableCard.push(drawCards[10]);
    drawCards.splice(0, 11);
    console.log(playerHand);
    console.log(cPUHand);
    console.log(drawCards);
    for (var i = 0; i < playerHand.length; i++) {
        CardHTML(playerHand[i], "PlayerHand", i);
    }
    for (var i = 0; i < cPUHand.length; i++) {
        HiddenCard(cPUHand[i], "CPUHand", i);
    }
    CardHTML(tableCard[tableCard.length - 1], "TableCard", tableCard.length - 1);
    HiddenCard(drawCards[drawCards.length - 1], "DrawCards", drawCards.length - 1);
}
//zeigt an ob man gewonnen hat oder nicht. Bei klicken auf ok wird das Spiel neu gestartet
function GameOver(win) {
    if (win) {
        alert("You won. Feel free to play again!");
        location.reload();
    }
    else {
        alert("You lost. Try playing again!");
        location.reload();
    }
}
//# sourceMappingURL=uno.js.map
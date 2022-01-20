const btn = document.querySelector('#formBtn');
const btnDraw = document.querySelector('#changeBtn');
const btnCard1 = document.querySelector('#btn1');
const btnCard2 = document.querySelector('#btn2');
const btnCard3 = document.querySelector('#btn3');
const cardArea = document.querySelector('#cardsArea');
const scoring = document.querySelector('#points');
const player1Area = document.querySelector('#player1');
const player2Area = document.querySelector('#player2');
const player3Area = document.querySelector('#player3');
const player4Area = document.querySelector('#player4');
let player1Points = 10;
let player2Points = 10;
let player3Points = 10;
let player4Points = 10;
let cardsInPlay;
let lastClick = 0;








function getApi(player) {
    /*Skriv din kod här*/
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
        .then(res => res.json())
        .then(data => {
            var src = data['cards'][0]['image'];
            img = document.createElement('img');
            img.className = 'img-fluid';
            img.src = src;
            var elmnt = document.createElement("li");
            elmnt.appendChild(img);
            player.appendChild(elmnt);
        })
        .catch(err => console.log('meh' + err))
}
function replacePlayersCards(player) {
    for (let i = 0; i < 3; i++) {
        getApi(player);

    }
}
function playCard(card) {

}
function disableButton(player) {

    if (player.childElementCount === 2) {
        btnCard3.disabled = true;
    }
    else if (player.childElementCount === 1) {
        btnCard2.disabled = true;
    }
    else if (player.childElementCount === 0) {
        btnCard1.disabled = true;
    }
}
function removeCard(player, position) {

    player.removeChild(player.children[position]);

}
function aiPlay(player){
    removeCard(player, 0);
}

function removeAllCards(player) {
    while (player.childElementCount > 0)
        player.removeChild(player.children[0]);

}
btnDraw.addEventListener('click', function (event) {
    const thisClick = Date.now();
    if (thisClick - lastClick < 1000) {
        return;
    }
    lastClick = thisClick;
    event.preventDefault();
    btnCard1.disabled = false;
    btnCard2.disabled = false;
    btnCard3.disabled = false;
    player3Points -= 1;
    scoring.innerHTML = `Player1: ${player1Points} Player2: ${player2Points} You: ${player3Points} Player4: ${player4Points} `;
    removeAllCards(player3Area);
    replacePlayersCards(player3Area);
});


btn.addEventListener('click', function (event) {
    const thisClick = Date.now();
    if (thisClick - lastClick < 5000) {
        return;
    }
    lastClick = thisClick;

    event.preventDefault();

    btnCard1.disabled = false;
    btnCard2.disabled = false;
    btnCard3.disabled = false;
    removeAllCards(player1Area);
    removeAllCards(player2Area);
    removeAllCards(player3Area);
    removeAllCards(player4Area);
    replacePlayersCards(player1Area);
    replacePlayersCards(player2Area);
    replacePlayersCards(player3Area);
    replacePlayersCards(player4Area);
    let player1Points = 10;
    let player2Points = 10;
    let player3Points = 10;
    let player4Points = 10;
    scoring.innerHTML = `Player1: ${player1Points} Player2: ${player2Points} You: ${player3Points} Player4: ${player4Points} `;
});

btnCard1.addEventListener('click', function (event) {
    const thisClick = Date.now();
    if (thisClick - lastClick < 1000) {
        return;
    }
    lastClick = thisClick;

    event.preventDefault();
    
    removeCard(player3Area, 0);
    disableButton(player3Area);
});
btnCard2.addEventListener('click', function (event) {
    const thisClick = Date.now();
    if (thisClick - lastClick < 1000) {
        return;
    }
    lastClick = thisClick;
    event.preventDefault();
    removeCard(player3Area, 1);
    disableButton(player3Area);
});
btnCard3.addEventListener('click', function (event) {
    const thisClick = Date.now();
    if (thisClick - lastClick < 1000) {
        return;
    }
    lastClick = thisClick;
    event.preventDefault();
    removeCard(player3Area, 2);
    disableButton(player3Area);
});


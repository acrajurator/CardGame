const btn = document.querySelector('#formBtn');
const btnDraw = document.querySelector('#changeBtn');
const btnCard1 = document.querySelector('#btn1');
const btnCard2 = document.querySelector('#btn2');
const btnCard3 = document.querySelector('#btn3');
const aiBtn = document.querySelector('#aiBtn');

const cardArea = document.querySelector('#cardsArea');
const board = document.querySelector('#board');
const scoring = document.querySelector('#points');
const player1Area = document.querySelector('#player1');
const player2Area = document.querySelector('#player2');
const player3Area = document.querySelector('#player3');
const player4Area = document.querySelector('#player4');
const player1Cards = [1, 2, 3];
const player2Cards = [1, 2, 3];
const player3Cards = [1, 2, 3];
const player4Cards = [1, 2, 3];
let player1Points = 10;
let player2Points = 10;
let player3Points = 10;
let player4Points = 10;
let player1LastValue = 0;
let player2LastValue = 0;
let player3LastValue = 0;
let player4LastValue = 0;
let lastClick = 0;









async function getApi(player, number, i) {
    /*Skriv din kod här*/
    let response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    var src = data['cards'][0]['image'];
    img = document.createElement('img');
    img.className = 'img-fluid';
    img.src = src;
    var elmnt = document.createElement("li");
    elmnt.appendChild(img);
    player.appendChild(elmnt);


    if (number == 1) {
        player1Cards[i] = (data['cards'][0]['value']);
    }
    else if (number == 2) {
        player2Cards[i] = (data['cards'][0]['value']);

    }
    else if (number == 3) {
        player3Cards[i] = (data['cards'][0]['value']);

    }
    else if (number == 4) {
        player4Cards[i] = (data['cards'][0]['value']);

    }



}
async function replacePlayersCards(player, number) {
    btn.disabled = true;
    btnDraw.disabled = true;
    for (let i = 0; i < 3; i++) {
       await getApi(player, number, i);
    }
    btn.disabled = false;
    btnDraw.disabled = false;
    
   
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
function aiPlay(player, number) {
    board.appendChild(player.children[0]);
    if (number == 1) {
        player1LastValue = player1Cards.shift();
    }
    if (number == 2) {
        player2LastValue = player2Cards.shift();
    }
    if (number == 4) {
        player4LastValue = player4Cards.shift();
    }
}

function removeAllCards(player) {
    while (player.childElementCount > 0)
        player.removeChild(player.children[0]);

}
function updateScore() {

    player1LastValue = 0;
    player2LastValue = 0;
    player3LastValue = 0;
    player4LastValue = 0;
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
    replacePlayersCards(player3Area, 3);
});


btn.addEventListener('click', function (event) {

    const thisClick = Date.now();
    if (thisClick - lastClick < 1000) {
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
    removeAllCards(board);
    replacePlayersCards(player1Area, 1);
    replacePlayersCards(player2Area, 2);
    replacePlayersCards(player3Area, 3);
    replacePlayersCards(player4Area, 4);
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

    board.appendChild(player3Area.children[0]);
    player3LastValue = player3Cards.shift();
    disableButton(player3Area);
});
btnCard2.addEventListener('click', function (event) {
    const thisClick = Date.now();
    if (thisClick - lastClick < 1000) {
        return;
    }
    lastClick = thisClick;
    event.preventDefault();
    board.appendChild(player3Area.children[1]);
    player3LastValue = player3Cards.shift();
    disableButton(player3Area);
});
btnCard3.addEventListener('click', function (event) {
    const thisClick = Date.now();
    if (thisClick - lastClick < 1000) {
        return;
    }
    lastClick = thisClick;
    event.preventDefault();
    board.appendChild(player3Area.children[2]);
    player3LastValue = player3Cards.shift();
    disableButton(player3Area);
});
aiBtn.addEventListener('click', function (event) {
    const thisClick = Date.now();
    if (thisClick - lastClick < 1000) {
        return;
    }
    lastClick = thisClick;
    event.preventDefault();

    aiPlay(player4Area, 4);
    aiPlay(player1Area, 1);
    aiPlay(player2Area, 2);

});

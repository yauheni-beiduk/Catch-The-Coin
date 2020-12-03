const piggyBank = document.querySelectorAll('.piggyBank'),
    coins = document.querySelectorAll('.coin'),
    scoreTable = document.querySelector('.score');
let lastBank;
let timeUp = false;
let score = 0;
let fail = 0;


// random time
function randomTime (min, max) {
    return Math.round(Math.random()*(max-min) + min);
}

// random kopilka
function randomBank (piggyBank) {
    const number = Math.floor(Math.random() * piggyBank.length);
    const bank = piggyBank[number];
    if (bank === lastBank) {
        return randomBank (piggyBank);
    }
    lastBank = bank;
    return bank;
}

//  up coin
function up () {
    let minTime,
        maxTime;
    if (score <= 10) {
        minTime = 1500;
        maxTime =2500;
    }
    if (score > 10) {
        minTime =1400
        maxTime = 1000;
    }
    if (score > 20) {
        minTime =  200;
        maxTime = 500;
    }
    const time = randomTime (minTime, maxTime);
    const bank = randomBank(piggyBank);
    bank.classList.add('up');
    setTimeout(() => {
        if ( bank.classList.contains('up')) {
        bank.classList.remove('up');
        fail++;
    }
        if (fail == 5) {
        timeUp = true;
        alert('GAME OVER');
        location.reload(); 
    }
        if(!timeUp) up();
    }, time)
}

function catchUp(e) {
    if(!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreTable.textContent = score;
}

coins.forEach(coin => coin.addEventListener('click', catchUp ));


function startGame() {
    setTimeout(() => timeUp = true, 60000)
    up();
};



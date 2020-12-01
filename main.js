const piggyBank = document.querySelectorAll('.piggyBank'),
    coins = document.querySelectorAll('.coin'),
    scoreTable = document.querySelector('.score');
let lastBank;
let timeUp = false;
let score = 0;
let currentScore = 0;
let minTime = 10,
  maxTime = 2000;
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

//  podnimaem coin
function up () {
    const time = randomTime (minTime, maxTime);
    const bank = randomBank(piggyBank);
    bank.classList.add('up');
    setTimeout(() => {
        bank.classList.remove('up');
        if(!timeUp) up();
    }, time)

}



function catchUp(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreTable.textContent = score;
    currentScore = score;
}

coins.forEach(coin => coin.addEventListener('click', catchUp ));


function startGame() {
    // if (score <= 3) {
    //     startLevelEasy();
    //   }
    // if (score > 3) {
    //     startLevelMiddle();
    //   }
    // if (score > 10) {
    //     startLevelHard();
    //   }
    scoreTable.textContent = currentScore;  // remember score in local(esli ne nado = 0 i dobavljaem score = 0)
    timeUp = false;
    up();
    setTimeout(() => timeUp = true, 60000)
}

// function startLevelEasy() {
//     minTime = maxTime + 1400;
//     maxTime = maxTime + 0;
//     timeUp = false;
//     up(minTime, maxTime);
//     setTimeout(() => timeUp = true, 60000)
// };

// function startLevelMiddle() {
//     minTime =minTime + 500;
//     maxTime = maxTime - 500;
//     timeUp = false;
//     up(minTime, maxTime);
//     setTimeout(() => timeUp = true, 60000)
// };

// function startLevelHard() {
//     minTime =  minTime;
//     maxTime = 500;
//     timeUp = false;
//     up(minTime, maxTime);
//     setTimeout(() => timeUp = true, 60000)
// }


// function stopGame() {
//   timeUp = true;
//     if (currentScore == 2 ) {
//        return stopGame();
//     };
// }


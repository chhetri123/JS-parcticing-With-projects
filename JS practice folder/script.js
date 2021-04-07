// 'use strict';
// // document.querySelector('.message')
// let score = 20;
// const secretNumber = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = secretNumber;
// document.querySelector('.check').addEventListener('click', function () {
//     const guess = Number(document.querySelector(".guess").value)

//     if (!guess) {
//         document.querySelector('.message').textContent = "No number"
//     } else if (guess === secretNumber) {
//         document.querySelector('.message').textContent = "Correct Number"
//     } else if (guess > secretNumber) {
//         if (score > 1) {
//             document.querySelector('.message').textContent = "To High"
//             score--;
//             document.querySelector(".score").textContent = score;
//         } else {
//             document.querySelector(".message").textContent = "You lost a game";
//         }

//     } else if (guess < secretNumber) {

//         if (score > 1) {
//             document.querySelector('.message').textContent = "To Low"
//             score--;
//             document.querySelector(".score").textContent = score;
//         } else {
//             document.querySelector(".message").textContent = "You lost a game";
//         }

//     }

// })

// Challange 1;
// const checkDogs = function (dogsjulia, dogsKate) {
//     const dogsJuliaCorrected = dogsjulia.slice();
//     dogsJuliaCorrected.splice(0, 1);
//     dogsJuliaCorrected.splice(-2);
//     // console.log(dogsJuliaCorrected)
//     const dogs = dogsJuliaCorrected.concat(dogsKate)
//     console.log(dogs)
//     dogs.forEach((dog, i) => {
//         if (dog >= 3) {
//             console.log(`Dog no. ${i + 1} is an adult ,and is ${dog} years old`)
//         } else {
//             console.log(`Dog no. ${i + 1} is still a puppy`)

//         }
//     })

// }
// checkDogs([3, 5, 12, 2, 7], [4, 1, 15, 8, 3])

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach((mov, i) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
            } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
displayMovements(account1.movements);
const user = 'manish Chhetri';
const username = user
    .toUpperCase()
    .split(' ')
    .map((n) => {
        return n[0];
    })
    .join(' ');



console.log(username);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// const usd = movements.map((el, i) => {
//     return Math.floor(el * eurToUsd)
// })
// console.log(usd)

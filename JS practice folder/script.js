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

// Challange -2
// const dogAge1 = (dogAges) => {
//   const humanAgeDog = dogAges.map((age) => {
//     if (age <= 2) return 2 * age;
//     return 16 + age * 4;
//   });

//   const above18dog = humanAgeDog.filter((age) => {
//     if (age >= 18) return age;
//   });

//   const avg = above18dog.reduce((acc, curr) => {
//     return acc + curr;
//   });
//   console.log(Math.floor(avg / above18dog.length));
// };
// dogAge1([5, 2, 4, 1, 15, 8, 3]);
// dogAge1([16, 6, 10, 5, 6, 1, 4]);

// // challange #3

// const dogAge = (dogAges) => {
//   return dogAges
//     .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter((age) => age >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
// };
// const testData1 = dogAge([5, 2, 4, 1, 15, 8, 3]);
// const testData2 = dogAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(testData1);
// console.log(testData2);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
('use strict');
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

const account5 = {
  owner: 'Manish Chhetri',
  movements: [10000, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 5555,
};
const accounts = [account1, account2, account3, account4, account5];

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

const eurToUsd = 1.1;

const displayMovements = function (movements, sorts = false) {
  containerMovements.innerHTML = '';

  //   sorting the balance of
  const movs = sorts
    ? movements.slice().sort((a, b) => {
        return a - b;
      })
    : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = (accounts) => {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map((n) => n[0])
      .join('');
  });
};
createUsernames(accounts);

const calcPrintBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = (movement) => {
  const { movements, interestRate: rate } = movement;

  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcome = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * rate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// update UI
const updateUi = (Account) => {
  // Display Movements
  displayMovements(Account.movements);

  // Display balance
  calcPrintBalance(Account);

  // Display summary
  calcDisplaySummary(Account);
};
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value,
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('LOGIN');
    // Display UI and message
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    // clear the input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    updateUi(currentAccount);
  }
});

// Transfer Amount
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value,
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUi(currentAccount);
  }
});
// Loan amount
//

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= 0.1 * amount)
  ) {
    currentAccount.movements.push(amount);
    inputLoanAmount.value = '';
    updateUi(currentAccount);
  }
});
// sort buttons
let sorted = false; //
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
//close account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(currentAccount);

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex((acc) => {
      return acc.username === currentAccount.username;
    });
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
  }
});

//

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Maximum Value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  return mov;
}, movements[0]);

// pipeLine

const totalDepositesUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositesUSD);

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
const account = accounts.find((acc) => acc.owner === 'Manish Chhetri');

// console.log(account);
//
// const usd = movements.map((el, i) => {
//     return Math.floor(el * eurToUsd)
// })
// console.log(usd)

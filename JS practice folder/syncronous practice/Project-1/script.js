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

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2];

//

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

const signUpUI = document.querySelector('section');
const signupLoginUsername = document.querySelector('.signup__input--user');
const inputSignupPin = document.querySelector('.signup__input--pin');
const inputCurrency = document.querySelector('#Currency');
const inputInterest = document.querySelector('#Interest');
const btnSignup = document.querySelector('.signup__btn');
const errorMess = document.querySelector('.signUp h2');

const logOut = document.querySelector('.logOut');
const eurToUsd = 1.1;

const formatDate = (movementsDates, locale) => {
  const date = new Date(movementsDates);

  const calDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPassed = calDaysPassed(new Date(), date);

  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return ` ${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};
const displayMovements = function (
  { movements, movementsDates, currency, locale },
  sorts = false,
) {
  containerMovements.innerHTML = '';

  //   sorting the balance of
  const movs = sorts
    ? movements.slice().sort((a, b) => {
        return a - b;
      })
    : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // For Date
    console.log(movementsDates[i], locale);
    const displayDate = formatDate(movementsDates[i], locale);
    // for Balance
    const formattedMov = formatCur(mov, locale, currency);

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const splitName = (account) => {
  return account
    .toLowerCase()
    .split(' ')
    .map((n) => n[0])
    .join('');
};
const createUsernames = (accounts) => {
  accounts.forEach((account) => {
    account.username = splitName(account.owner);
  });
};
createUsernames(accounts);

const calcPrintBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = (movement) => {
  const { movements, interestRate: rate, locale, currency } = movement;

  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, locale, currency);

  const outcome = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(outcome), locale, currency);

  const interest = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * rate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCur(interest, locale, currency);
};

// update UI
const updateUi = (Account) => {
  // Display Movements
  console.log(Account);
  displayMovements(Account);

  // Display balance
  calcPrintBalance(Account);

  // Display summary
  calcDisplaySummary(Account);
};
// Event handlers
let currentAccount, timer;

// fake login in
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 1;

// LogOut timer

const startLogOut = function () {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.display = 'none';
      labelWelcome.textContent = 'Log in to get started';
    }
    time--;
  };
  // Set time in 5 minute
  let time = 600;
  tick();
  // call the timer every second
  timer = setInterval(tick, 1000);
  return timer;
  // In each call ,print the remaining time to UI

  //when 0 sec , logOut
};

const currTime = () => {
  const timer = () => {
    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option,
    ).format(now);
  };
  timer();
  setInterval(timer, 1000);

  // console.log(navigator.language);
  // const locale = navigtor.language;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value,
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // console.log('LOGIN');
    // Display UI and message
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.display = 'grid';
    signUpUI.style.display = 'none';
    // Inialize date
    // labelDate.textContent = date();
    // clear the input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    // timer

    currTime();
    if (timer) clearInterval(timer);
    timer = startLogOut();

    // Update UI
    updateUi(currentAccount);
  }
});

// Transfer Amount
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputTransferAmount.value);
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

    // Date of transfer and receiverAccount
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    // update Ui
    updateUi(currentAccount);
    // Reset timer
    clearInterval(timer);
    timer = startLogOut();
  }
});
// Loan amount
//

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= 0.1 * amount)
  ) {
    inputLoanAmount.value = '';
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUi(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogOut();
    }, 2500);
  }
});
// sort buttons
let sorted = false; //
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
//close account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex((acc) => {
      return acc.username === currentAccount.username;
    });

    accounts.splice(index, 1);
    containerApp.style.display = 'none';
    signUpUI.style.display = 'block';
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
  }
});
logOut.addEventListener('click', function (e) {
  e.preventDefault();
  containerApp.style.display = 'none';
  signUpUI.style.display = 'block';
});

// const signUpName = 'Manish Chhetri';
// const intrest = 1.5;
// const pin = 5555;
// const curr = 'INR';
// const Local = 'en-US';
// let newAccount;

// Create NEw Account
// console.log(currentAccount);

const createAccount = (newAccount) => {
  const { owner } = newAccount;
  const BankName = splitName(owner);
  const Username = accounts
    .map((account) => account)
    .find((account) => {
      return account.username === BankName;
    });
  if (Username === undefined) {
    // Create New Object

    // Add aboject to the array
    newAccount.username = BankName;

    accounts.push(newAccount);
    currentAccount = newAccount;
    currTime();
    if (timer) clearInterval(timer);
    timer = startLogOut();

    updateUi(newAccount);
    containerApp.style.display = 'grid';
    signUpUI.style.display = 'none';
    labelWelcome.textContent = `Welcome back,${newAccount.owner.split(' ')[0]}`;

    // update UI

    // updateUi(accounts);
  } else {
    errorMess.textContent = 'User already here';
    errorMess.style.color = 'red';
  }
};

btnSignup.addEventListener('click', function (e) {
  e.preventDefault();
  if (signupLoginUsername.value === '') {
    signupLoginUsername.style.border = '1px solid red';
  } else if (inputSignupPin.value === '' || isNaN(inputSignupPin.value)) {
    inputSignupPin.style.border = '1px solid red';
  } else {
    newAccount = {
      owner: signupLoginUsername.value,
      movementsDates: [new Date().toISOString()],
      interestRate: +inputInterest.value,
      pin: +inputSignupPin.value,
      currency: inputCurrency.value,
      locale: 'en-US',
      movements: [1000],
    };
    signupLoginUsername.value = inputSignupPin.value = '';
    createAccount(newAccount);
  }
});

// Setting date and Time
function date() {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const min = `${now.getMinutes()}`.padStart(2, 0);
  return ` ${day}/${month}/${year}, ${hour}:${min}`;
}

date /month /years

///////////////////////////////////////////////
///////////////////////////////////////////////
LECTURES
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

console.log(account);

const usd = movements.map((el, i) => {
    return Math.floor(el * eurToUsd)
})
console.log(usd)

// Creating dates
const now = new Date();
console.log(now);
// console.log(new Date(' Apr Thu  08 2021 14:14:31'));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 18, 19, 15, 23, 5));

const future = new Date(2037, 18, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

Timer in js
setTimeout(() => console.log('chhetri'), 200);

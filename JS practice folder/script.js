'use strict';
// document.querySelector('.message')
let score = 20;
const secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = secretNumber;
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = 'No number';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'Correct Number';
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'To High';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You lost a game';
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'To Low';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You lost a game';
    }
  }
});

// Challange 1;
const checkDogs = function (dogsjulia, dogsKate) {
  const dogsJuliaCorrected = dogsjulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJuliaCorrected)
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);
  dogs.forEach((dog, i) => {
    if (dog >= 3) {
      console.log(`Dog no. ${i + 1} is an adult ,and is ${dog} years old`);
    } else {
      console.log(`Dog no. ${i + 1} is still a puppy`);
    }
  });
};
checkDogs([3, 5, 12, 2, 7], [4, 1, 15, 8, 3]);

Challange - 2;
const dogAge1 = (dogAges) => {
  const humanAgeDog = dogAges.map((age) => {
    if (age <= 2) return 2 * age;
    return 16 + age * 4;
  });

  const above18dog = humanAgeDog.filter((age) => {
    if (age >= 18) return age;
  });

  const avg = above18dog.reduce((acc, curr) => {
    return acc + curr;
  });
  console.log(Math.floor(avg / above18dog.length));
};
dogAge1([5, 2, 4, 1, 15, 8, 3]);
dogAge1([16, 6, 10, 5, 6, 1, 4]);

// challange #3

const dogAge = (dogAges) => {
  return dogAges
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
};
const testData1 = dogAge([5, 2, 4, 1, 15, 8, 3]);
const testData2 = dogAge([16, 6, 10, 5, 6, 1, 4]);
console.log(testData1);
console.log(testData2);

// Challange #4

const dogs = [
  {
    weight: 21,
    curFood: 250,
    owners: ['Alice', 'Bob'],
  },
  {
    weight: 8,
    curFood: 200,
    owners: ['Matilda'],
  },
  {
    weight: 13,
    curFood: 275,
    owners: ['Sarah', 'john'],
  },
  {
    weight: 32,
    curFood: 340,
    owners: ['Michael'],
  },
];

const recFoodPortion = (dogs) => {
  dogs.forEach((dog) => {
    dog.recommendedPortion = dog.weight * 0.75 * 28;
    let range1 = 0.9 * dog.recommendedPortion;
    let range2 = 1.1 * dog.recommendedPortion;

    if (dog.curFood > range1 && dog.curFood < range2) {
      dog.review = 'Dog Eating Amount is okay';
    } else if (dog.curFood > dog.recommendedPortion) {
      dog.review = 'Dog is Eating too Much';
    } else {
      dog.review = 'Dog Eating Too little';
    }
  });
};

recFoodPortion(dogs);

const sarahDog = dogs.find((dogName) => {
  return dogName.owners.find((name) => name === 'Sarah');
});

const whoseOwners = (str) => {
  return dogs
    .filter((dog) => {
      return dog.review === str;
    })
    .map((el) => el.owners)
    .flat();
};
const ownersEatTooMuch = whoseOwners('Dog is Eating too Much');
const ownersEatTooLess = whoseOwners('Dog Eating Too little');
console.log(ownersEatTooLess);
console.log(ownersEatTooMuch);
const consoleOwners = (owners) => {
  return owners.join(' and  ');
};
console.log(`${consoleOwners(ownersEatTooLess)}'s dog eat Too less food`);
console.log(`${consoleOwners(ownersEatTooMuch)}'s dog eats Too Much food`);
const reccomendFood = dogs.some(
  (el) => el.review === 'Dog Eating Amount is okay',
);
console.log(reccomendFood);

////////////////////
dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight * 28 ** 0.75)));

const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'Little'
  }`,
);

const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners);
const ownersEatTooLess = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLess);

console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat Too Much food`);

console.log(`${ownersEatTooLess.join(' and ')}'s dog eat Too Less food`);

console.log(dogs.some((dog) => dog.curFood === dog.recFood));

const checkEatingAmount = (dog) =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingAmount));
console.log(dogs.filter(checkEatingAmount));
/////////////////////////////////////////////////
const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy);

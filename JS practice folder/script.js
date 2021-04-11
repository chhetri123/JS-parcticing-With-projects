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

// Challange #4

// const dogs = [
//   {
//     weight: 21,
//     curFood: 250,
//     owners: ['Alice', 'Bob'],
//   },
//   {
//     weight: 8,
//     curFood: 200,
//     owners: ['Matilda'],
//   },
//   {
//     weight: 13,
//     curFood: 275,
//     owners: ['Sarah', 'john'],
//   },
//   {
//     weight: 32,
//     curFood: 340,
//     owners: ['Michael'],
//   },
// ];

// const recFoodPortion = (dogs) => {
//   dogs.forEach((dog) => {
//     dog.recommendedPortion = dog.weight * 0.75 * 28;
//     let range1 = 0.9 * dog.recommendedPortion;
//     let range2 = 1.1 * dog.recommendedPortion;

//     if (dog.curFood > range1 && dog.curFood < range2) {
//       dog.review = 'Dog Eating Amount is okay';
//     } else if (dog.curFood > dog.recommendedPortion) {
//       dog.review = 'Dog is Eating too Much';
//     } else {
//       dog.review = 'Dog Eating Too little';
//     }
//   });
// };

// recFoodPortion(dogs);

// const sarahDog = dogs.find((dogName) => {
//   return dogName.owners.find((name) => name === 'Sarah');
// });

// const whoseOwners = (str) => {
//   return dogs
//     .filter((dog) => {
//       return dog.review === str;
//     })
//     .map((el) => el.owners)
//     .flat();
// };
// const ownersEatTooMuch = whoseOwners('Dog is Eating too Much');
// const ownersEatTooLess = whoseOwners('Dog Eating Too little');
// console.log(ownersEatTooLess);
// console.log(ownersEatTooMuch);
// const consoleOwners = (owners) => {
//   return owners.join(' and  ');
// };
// console.log(`${consoleOwners(ownersEatTooLess)}'s dog eat Too less food`);
// console.log(`${consoleOwners(ownersEatTooMuch)}'s dog eats Too Much food`);
// const reccomendFood = dogs.some(
//   (el) => el.review === 'Dog Eating Amount is okay',
// );
// console.log(reccomendFood);

//

//////////////////////
// dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight * 28 ** 0.75)));

// const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
// console.log(dogSarah);
// console.log(
//   `Sarah's dog is eating too ${
//     dogSarah.curFood > dogSarah.recFood ? 'much' : 'Little'
//   }`,
// );

// const ownersEatTooMuch = dogs
//   .filter((dog) => dog.curFood > dog.recFood)
//   .flatMap((dog) => dog.owners);
// const ownersEatTooLess = dogs
//   .filter((dog) => dog.curFood < dog.recFood)
//   .flatMap((dog) => dog.owners);
// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLess);

// console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat Too Much food`);

// console.log(`${ownersEatTooLess.join(' and ')}'s dog eat Too Less food`);

// console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// const checkEatingAmount = (dog) =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// console.log(dogs.some(checkEatingAmount));
// console.log(dogs.filter(checkEatingAmount));
// /////////////////////////////////////////////////
// const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log(dogsCopy);
/////////////////////////////////////////////////

// ************************************************//

// Advance DOM for Websites

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookie for improved functionality and analytics.<button class="btn btn--close--cookie">Got it</button>';

// header.append(message);

// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });
// console.log(s1coords);
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset,
// );
// console.log(window.pageYOffset);
// console.log(
//   s1coords.left + window.pageYOffset,
//   s1coords.top + window.pageYOffset,
// );
// old way
// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });
// const random = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
// const randomcolor = () => {
//   return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
// };

// console.log(randomcolor());
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
// });

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));

// ***********************************************//

// Banklist website
('use strict');

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');
const allSection = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach((btn) => {
  btn.addEventListener('click', openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scrolling button

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();

  // mordern weekday
  section1.scrollIntoView({ behavior: 'smooth' });
});

// page NAvigation

// document.querySelectorAll('.nav__link').forEach((el) => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// 1. Add event list to common parent element
// 2. dterminr what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // MAtching strategy
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TAbbed component

// tabs.forEach(t=>t.addEventListener('click',()=>{

// }))
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
// passing and argument into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// sticy navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   //  console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// const obsCallBack = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0,0.2],
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);
// //////////////////////
// reveal sections
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading images

const imgTarget = document.querySelectorAll('img[data-src]');
const loading = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replace src with data-src if
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach((img) => imgObserver.observe(img));

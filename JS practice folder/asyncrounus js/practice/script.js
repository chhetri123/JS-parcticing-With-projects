'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// //
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = '1';
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // Render country 1
//     renderCountry(data);

//     // get neighbors country data
//     const [neighbor] = data.borders;
//     if (!neighbor) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('usa');

// const request = new XMLHttpRequest();
// request.open('GET', 'https://restcountries.eu/rest/v2/name/nepal');

// request.send();
// request.addEventListener('load', function () {
//   console.log(this.responseText);
// });

// using promises
// const request = fetch(`https://restcountries.eu/rest/v2/name/nepal`);
// request.then((data) => {
//   console.log(data);
// });

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (res) {
//       console.log(res);
//       renderCountry(res[0]);
//     });
// };
const getJSON = (url, errorMsg = 'Something Went wrong') => {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

    return res.json();
  });
};
const renderError = (msg) => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};
// const getCountryData = (country) => {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then((res) => res.json())
//     .then((res) => {
//       renderCountry(res[0]);
//       const neighbour = res[0].borders[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then((res) => res.json())
//     .then((res) => renderCountry(res, 'neighbour'))
//     .catch((err) =>
//       renderError(`Something went wrong ${err.message}.Try again`)
//     )
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// // };
const getCountryData = (country) => {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then((res) => {
      renderCountry(res[0]);
      const neighbour = res[0].borders[0];
      //   const neighbour = ';
      if (!neighbour) throw new Error('No neighbour Found');
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then((res) => renderCountry(res, 'neighbour'))
    .catch((err) => renderError(err.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('nepal');
});

// challange -1
// const getCountry = (url, errorMsg = 'Something went wrong') => {
//   return fetch(url).then((res) => {
//     if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

//     return res.json();
//   });
// };
// const whereAmI = (lat, lng) => {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem With GEoCoding (${res.status})`);
//       return res.json();
//     })
//     .then((res) => {
//       console.log(`You are in ${res.country},${res.city}`);
//       return getCountry(`https://restcountries.eu/rest/v2/name/${res.country}`);
//     })
//     .then((res) => renderCountry(res[0]))
//     .catch((err) => console.log(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// const lottery = new Promise((resolve, reject) => {
//   console.log('Lottery draw');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('YOu win Money');
//     } else {
//       reject(new Error('You loss money'));
//     }
//   }, 2000);
// });
// lottery.then((res) => console.log(res)).catch((res) => console.log(res));

// // promisifying settimeout
// const wait = function (sec) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, sec * 1000);
//   });
// };
// wait(2)
//   .then(() => {
//     console.log('I waited');
//     return wait(2);
//   })
//   .then(() => console.log('again i waited'));

// //

// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// const whereAmI = () => {
//   getPosition()
//     .then((res) => {
//       const { latitute: lat, longitude: lng } = res.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem With GEoCoding (${res.status})`);
//       return res.json();
//     })
//     .then((res) => {
//       console.log(`You are in ${res.country},${res.city}`);
//       return getCountry(`https://restcountries.eu/rest/v2/name/${res.country}`);
//     })
//     .then((res) => renderCountry(res[0]))
//     .catch((err) => console.log(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', whereAmI);

// challange 2

// const wait = function (sec) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, sec * 1000);
//   });
// };
// const imgContainer = document.querySelector('.images');
// const createImage = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image Not Found'));
//     });
//   });
// };
// let currImg;
// createImage('img/img-1.jpg')
//   .then((img) => {
//     console.log('1st img');
//     currImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then((img) => {
//     console.log('2st img');
//     currImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(() => {
//     console.log('3st img');
//     return wait(2);
//   })
//   .catch((err) => console.log(err.message));

// Async await function
//

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGo = await resGeo.json();
  console.log(dataGo);
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${'nepal'}`);

  const data = await res.json();
  renderCountry(data[0]);
  countriesContainer.style.opacity = 1;
};
console.log('chhetr');
// whereAmI();
Promise.any([
  Promise.resolve('sucess6'),
  Promise.reject('Error'),
  Promise.resolve('sucesssss'),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

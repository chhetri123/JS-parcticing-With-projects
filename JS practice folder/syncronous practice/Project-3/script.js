'use strict';

const form = document.querySelector('.form');
const error = document.querySelector('.error');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const clearSort = document.querySelector('.clearSort');

const DeleteAll = document.querySelector('.deleteAll');
const sortByDistance = document.querySelector('.sort');

class App {
  #map;

  #mapZoomLevel = 13;
  #markers = [];
  #mapEvent;

  #workout = [];
  constructor() {
    // get user position
    this._getPosition();

    // get data from localStorage
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkOut.bind(this));

    inputType.addEventListener('change', this._toggleElevaionField);

    containerWorkouts.addEventListener('click', this._moveToPopUp.bind(this));
    sortByDistance.addEventListener('click', this._sortByDistance.bind(this));

    DeleteAll.addEventListener('click', this._deleteAll.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        this._error('Could not find a location');
      });
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    this.#workout.forEach(work => {
      this._renderWorkOutMarker(work);
    });
  }
  _error(msg) {
    setTimeout(() => {
      error.classList.add('errorAnimation');
    }, 3000);
    error.classList.remove('errorAnimation');
    error.firstElementChild.innerHTML = `<p>${msg}</p>`;
    error.style.display = 'block';
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value =
      '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }

  _toggleElevaionField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();
    // get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let workout, lat, lng;
    if (this.#mapEvent === null) {
      [lat, lng] = this._coord;
    } else {
      lat = this.#mapEvent.latlng.lat;
      lng = this.#mapEvent.latlng.lng;
    }

    // if activity running ,create running Object

    if (type === 'running') {
      const cadence = +inputCadence.value;
      // check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return this._error('input have to be positive number');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // if workout cycling, create cycling Object

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return this._error('input have to be positive number');
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // Add new object to workout array and
    this.#workout.push(workout);

    // render workout on map as marker
    this._renderWorkOutMarker(workout);
    //  render workout on list
    this._renderWorkOut(workout);

    //hide form and clear fields
    this._hideForm();

    // set local storage toall work out
    this._setLocalStorage();
  }

  _renderWorkOutMarker(workout) {
    let myMarker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 50,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
    myMarker._id = workout.id;
    this.#markers.push(myMarker);
  }

  _renderWorkOut(workout) {
    clearSort.style.display = 'inline-flex';
    let html = `<li class="workout workout--${workout.type} " id=${
      workout.id
    } data-id="${workout.id}">
          <div class="workout__title">${workout.description}
          <div class="editOption">
                <div class="edit" title="Edit">🖊</div>
                <div class="delete" title="Delete">🗑</div>
              </div></div>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
    if (workout.type === 'running') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }
    if (workout.type === 'cycling') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopUp(e) {
    const workoutEl = e.target.closest('.workout');
    const Delete = e.target.closest('.delete');
    const Edit = e.target.closest('.edit');

    if (!workoutEl) return;
    const workout = this.#workout.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    if (Edit) this._editData(workoutEl);
    if (Delete) this._delete(workoutEl);
  }
  _getLocalStorage() {
    const data =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('workouts'))
        : null;
    if (!data) return;
    this.#workout = data;
    this.#workout.forEach(work => {
      this._renderWorkOut(work);
    });
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workout));
  }

  // find id
  _findId(id) {
    return this.#workout.find(work => work.id === id);
  }
  // Edit Data

  _editData(data) {
    form.classList.remove('hidden');
    const workout = document.getElementById(data.id);
    workout.style.display = 'none';

    // fins id and get data
    const {
      distance,
      duration,
      cadence,
      elevationGain,
      coords,
      type,
    } = this._findId();

    // re initial previous data foem editing
    inputDistance.value = distance;
    inputDuration.value = duration;
    if (type === 'running') inputCadence.value = cadence;
    if (type === 'cycling') inputElevation.value = elevationGain;

    const itemNo = this.#workout.indexOf(item);
    this._coord = coords;
    this.#workout.splice(itemNo);
    this._removeMarker(data.dataset.id);
  }
  // sorted
  _sortByDistance() {
    const work = this.#workout.sort((a, b) =>
      a.distance < b.distance
        ? a.distance - b.distance
        : b.distance - a.distance
    );

    const workout = document.querySelectorAll('.workout');
    workout.forEach(node => node.parentNode.removeChild(node));
    setTimeout(() => {
      work.forEach(work => this._renderWorkOut(work));
    }, 200);
  }

  // Delete Item
  _delete(workOutEl) {
    const item = this._findId(workOutEl.dataset.id);
    const itemNo = this.#workout.indexOf(item);
    this.#workout.splice(itemNo);
    this._removeMarker(workOutEl.dataset.id);
    workOutEl.remove();
    if (this.#workout.length === 0) {
      clearSort.style.display = 'none';
    }
    this._reset();
    this._setLocalStorage();
  }
  _removeMarker(id) {
    this.#markers.forEach(marker => {
      if (marker._id === id) this.#map.removeLayer(marker);
    });
  }
  _removeMarkerAll() {
    this.#markers.forEach(marker => {
      this.#map.removeLayer(marker);
    });
  }
  _deleteAll() {
    const workout = document.querySelectorAll('.workout');
    clearSort.style.display = 'none';
    workout.forEach(node => node.parentNode.removeChild(node));
    this._removeMarkerAll();
    this.#markers = [];
    this.#mapEvent = null;
    this.#workout = [];
    this._reset();
  }
  _reset() {
    localStorage.removeItem('workouts');
  }
}

const app = new App();

class WorkOut {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; //im km
    this.duration = duration; //im min
  }

  _setDescripion() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends WorkOut {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescripion();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends WorkOut {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescripion();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

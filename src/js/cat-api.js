'use strict';

import Notiflix from 'notiflix';
import { loaderTextRef, errorRef } from '../index.js';

const urlAllBreeds = `https://api.thecatapi.com/v1/breeds`;
const urlSearchBreed = 'https://api.thecatapi.com/v1/images/search';

const api_key =
  'live_W3nwnHJma12xf8OHg6oOeQYjsPPfsezFVzLC6qKQvjOg9rY5S0PlzLqJ2z3k2jiB';

const fetchBreeds = breedsCats =>
  fetch(urlAllBreeds, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    if (!response.ok) {
      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Okay'
      );
      loaderTextRef.classList.add('visually-hidden');
      errorRef.classList.remove('visually-hidden');
      throw new Error(response.status);
    }
    return response.json();
  });

const fetchCatByBreed = breedId =>
  fetch(urlSearchBreed + `?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    if (!response.ok) {
      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Okay'
      );
      loaderTextRef.classList.add('visually-hidden');
      errorRef.classList.remove('visually-hidden');
      throw new Error(response.status);
    }
    return response.json();
  });

export { fetchBreeds, fetchCatByBreed };

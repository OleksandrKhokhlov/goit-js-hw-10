'use strict';

import Notiflix from 'notiflix';
import { selectBreedCat, cardRef } from '../index.js';

const urlAllBreeds = `https://api.thecatapi.com/v1/breeds`;
const urlSearchBreed = 'https://api.thecatapi.com/v1/images/search';
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

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
      errorRef.classList.remove('visually-hidden');
      throw new Error(response.status);
    }
    loaderRef.classList.add('visually-hidden');
    selectBreedCat.classList.remove('visually-hidden');
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
      errorRef.classList.remove('visually-hidden');
      throw new Error(response.status);
    }
    cardRef.classList.remove('visually-hidden');
    loaderRef.classList.add('visually-hidden'); 
    return response.json();
  });

export { fetchBreeds, fetchCatByBreed, loaderRef };

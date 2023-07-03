import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

export { loaderTextRef, errorRef };

const selectBreedCat = document.querySelector('.breed-select');
const cardRef = document.querySelector('.cat-info');
const loaderTextRef = document.querySelector('.loader-text');
const cssloaderRef = document.querySelector('span.loader');
const errorRef = document.querySelector('.error');

fetchBreeds().then(breeds => {
  let markupOptions = breeds
    .map(breed => `<option value=${breed.id}>${breed.name}</option>`)
    .join('');

  selectBreedCat.insertAdjacentHTML('afterbegin', markupOptions);
  selectBreedCat.classList.remove('visually-hidden');
  cssloaderRef.classList.add('visually-hidden');
  loaderTextRef.classList.add('visually-hidden');
});

selectBreedCat.addEventListener('change', onChengeBreed);

function onChengeBreed() {
  let breedId = selectBreedCat.value;
  errorRef.classList.add('visually-hidden');
  loaderTextRef.classList.remove('visually-hidden');
  cssloaderRef.classList.remove('visually-hidden');
  cardRef.classList.add('visually-hidden');
  cardRef.innerHTML = '';
  fetchCatByBreed(breedId).then(foundCat => {
    if (foundCat[0] === undefined) {
      Notiflix.Report.failure(
        'Oops!',
        'Сat with this breed is not found! Choose another breed!',
        'Okay'
      );
      loaderTextRef.classList.add('visually-hidden');
      errorRef.classList.remove('visually-hidden');
      return;
    }
    const imgUrl = foundCat[0].url;
    const aboutCat = foundCat[0].breeds[0];
    const description = aboutCat.description;
    const name = aboutCat.name;
    const temperament = aboutCat.temperament;
    cardRef.innerHTML = ` <img
        src="${imgUrl}"
        alt="${name}"
        width="360"
      />
      <div class="description">
        <h2 class="title">${name}</h2>
        <p>
          ${description}
        </p>
        <p><b>Temperament:</b> ${temperament}</p>
      </div>`;

    cardRef.classList.remove('visually-hidden');
    cssloaderRef.classList.add('visually-hidden');
    loaderTextRef.classList.add('visually-hidden');
  });
}

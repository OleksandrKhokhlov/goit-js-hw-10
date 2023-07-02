import { fetchBreeds, fetchCatByBreed, loaderRef } from './js/cat-api';

export { selectBreedCat, cardRef };

const selectBreedCat = document.querySelector('.breed-select');
const cardRef = document.querySelector('.cat-info');

fetchBreeds().then(breeds => {
  
  let markupOptions = breeds
    .map(breed => `<option value=${breed.id}>${breed.name}</option>`)
    .join('');
  
  selectBreedCat.insertAdjacentHTML('afterbegin', markupOptions);
});

selectBreedCat.addEventListener('change', onChengeBreed);

function onChengeBreed() {
  let breedId = selectBreedCat.value;
  loaderRef.classList.remove('visually-hidden');
  cardRef.classList.add('visually-hidden');
  fetchCatByBreed(breedId).then(foundCat => {
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
  });
}

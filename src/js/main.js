'use strict';

const input = document.querySelector('.js_input');
const list = document.querySelector('.js_list');
const favList = document.querySelector('.js_favs_list');
const button = document.querySelector('.js_submit_button');
let resetButton;
let deleteButton;

let url;
function urlMaker(){
  url='//api.tvmaze.com/search/shows?q=';
  url += input.value;
  return url;
}

let shows = [];
function requestToAPI(){
  shows = [];
  url=urlMaker();
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        shows[i]=data[i].show;
      }
      displayNoResults();
    });
}

let listItem;
function displayResults(){
  let html = '';
  for (let i = 0; i < shows.length; i++) {
    const isInFaves = isFavorite(shows[i]);
    if(isInFaves){
      html += `<li class="list_item js_list_item fav" id="${shows[i].id}">`;
    }
    else{
      html += `<li class="list_item js_list_item" id="${shows[i].id}">`;
    }
    html += `<div class="container">`;
    if(shows[i].image === null){
      html += `<img class="img" src="https://via.placeholder.com/210x295/b5a899/736762/?text=TV" alt="movie cover">`;
    }
    else{
      html += `<img class="img" src=${shows[i].image.medium} alt="movie cover">`;
    }
    html += `  <h2 class="movie_title">${shows[i].name}</h2>`;
    html += `</div>`;
    html += `</li>`;
  }
  list.innerHTML = html;

  listenFavs();
}

function listenFavs(){
  listItem = document.querySelectorAll('.js_list_item');
  for (const item of listItem) {
    item.addEventListener('click',handleListItems);
  }
}

function displayNoResults(){
  if(shows.length < 1){
    let html = '';
    html += `<p class="message">`;
    html += `No se encontraron resultados para "${input.value}"`;
    html += `</p>`;
    list.innerHTML = html;
  }
  else{
    displayResults();
  }
}

let favorites = [];
function isFavorite(show) {
  const favoriteFound = favorites.find((fav) => {
    return fav.id === show.id;
  });

  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}

function handleListItems(ev){
  const favorited = ev.currentTarget.id;
  const currentCard = ev.currentTarget;
  currentCard.classList.toggle('fav');
  const objetClicked = shows.find((show) => {
    return show.id === parseInt(favorited);
  });
  // favoritesFoundIndex finds the element with the same id as they one clicked and returns its position in the array. If its not in the list of favorites it will be included but if it was already there the list will not vary.
  const favoritesFoundIndex = favorites.findIndex((fav) => {
    return fav.id === parseInt(favorited);
  });
  if(favoritesFoundIndex === -1){
    favorites.push(objetClicked);
  }
  else{
    favorites.splice(favoritesFoundIndex,1);
  }
  displayFavsList();
  saveToLocalStorage();
}

function saveToLocalStorage(){
  localStorage.setItem('favorites',JSON.stringify(favorites));
}

function getFromLocalStorage(){
  let dataRetrieved = JSON.parse(localStorage.getItem('favorites'));
  if(dataRetrieved === null){
    const newLiElement = document.createElement('li');
    newLiElement.classList.add('fav_item');
    const newLiContent = document.createTextNode('Aun no tienes favoritos.');
    newLiElement.appendChild(newLiContent);
    favList.appendChild(newLiElement);
  }
  else{
    favorites = dataRetrieved;
    displayFavsList();
  }
}

getFromLocalStorage();

function displayFavsList(){
  let html = '';
  if(favorites.length === 0 || favorites === null){
    html += `Aun no tienes favoritos.`;
  }
  else {
    for (const favorite of favorites) {
      html += `<li class="fav_item js_fav_item" id="${favorite.id}">`;
      if(favorite.image === null){
        html += `<div class="fav_item_info">`;
        html += `<img class="img" src="https://via.placeholder.com/210x295/b5a899/736762/?text=TV"  alt="movie cover">`;
      }
      else{
        html += `<div class="fav_item_info">`;
        html += `<img class="img" src="${favorite.image.medium}" alt="movie cover">`;
      }
      html += `<h2 class="movie_title">${favorite.name}</h2>`;
      html += `</div>`;
      html += `<button class="reset_button js_reset_button" id="${favorite.id}">X</button>`;
      html += `</li>`;
    }

    html += `<button class="delete_button js_delete_button">Borrar todos</button>`;
  }

  favList.innerHTML = html;
  listenResetButtons();
  listenDeleteButton();
}

function listenResetButtons(){
  resetButton = document.querySelectorAll('.js_reset_button');
  for (const reset of resetButton) {
    reset.addEventListener('click',handleResetButton);
  }
}

function handleResetButton(ev){
  ev.preventDefault();
  const toDelete = ev.currentTarget.id;
  const objetClickedIndex = favorites.findIndex((show) => {
    return show.id === parseInt(toDelete);
  });
  favorites.splice(objetClickedIndex,1);
  displayFavsList();
  saveToLocalStorage();
}

function listenDeleteButton(){
  deleteButton = document.querySelector('.js_delete_button');
  deleteButton.addEventListener('click', handleDeleteButton);
}

function handleDeleteButton(ev){
  ev.preventDefault();
  favorites = [];
  removeFromLocalStorage();
  displayFavsList();
}

function removeFromLocalStorage(){
  localStorage.removeItem('favorites');
}

function handleButton(ev){
  ev.preventDefault();
  // urlMaker();
  requestToAPI();
}

button.addEventListener('click',handleButton);
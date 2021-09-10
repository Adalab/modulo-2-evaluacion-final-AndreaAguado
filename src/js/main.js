'use strict';

const input = document.querySelector('.js_input');
const list = document.querySelector('.js_list');
const favList = document.querySelector('.js_favs_list');
const button = document.querySelector('.js_submit_button');
let resetButton;

let url;
function urlMaker(){
  url='//api.tvmaze.com/search/shows?q=';
  url += input.value;
  return url;
}

let shows = [];
function requestToAPI(){
  url=urlMaker();
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        shows[i]=data[i].show;
      }
      console.log(shows);
      displayResults();
    });
}

let listItem;
function displayResults(){
  let html = '';
  for (let i = 0; i < shows.length; i++) {
    html += `<li class="list_item js_list_item" id="${shows[i].id}">`;
    if(shows[i].image === null){
      html += `<img class="img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="movie cover">`;
    }
    else{
      html += `<img class="img" src=${shows[i].image.medium} alt="movie cover">`;
    }
    html += `  <h2 class="movie_title">${shows[i].name}</h2>`;
    html += `</li>`;
    list.innerHTML = html;
  }

  listenFavs();
}

function listenFavs(){
  listItem = document.querySelectorAll('.js_list_item');
  console.log(listItem);
  for (const item of listItem) {
    item.addEventListener('click',handleListItems);
  }
}

let favorites = [];

function handleListItems(ev){
  const favorited = ev.currentTarget.id;
  const currentCard = ev.currentTarget;
  console.log(currentCard);
  currentCard.classList.add('fav');
  console.log(favorited);
  const objetClicked = shows.find((show) => {
    return show.id === parseInt(favorited);
  });
  console.log(objetClicked);
  // favoritesFoundIndex finds the element with the same id as they one clicked and returns its position in the array. If its not in the list of favorites it will be included but if it was already there the list will not vary.
  const favoritesFoundIndex = favorites.findIndex((fav) => {
    return fav.id === parseInt(favorited);
  });
  if(favoritesFoundIndex === -1){
    favorites.push(objetClicked);
  }
  console.log(favorites);
  displayFavsList();
  saveToLocalStorage();
}

function saveToLocalStorage(){
  localStorage.setItem('favorites',JSON.stringify(favorites));
}

function getFromLocalStorage(){
  let dataRetrieved = JSON.parse(localStorage.getItem('favorites'));
  if(dataRetrieved === null){
    let html = '';
    html += `<li class="fav_item js_fav_item">`;
    html += `Aun no tienes favoritos`;
    html += `</li>`;
    favList.innerHTML = html;
  }
  else{
    favorites = dataRetrieved;
    displayFavsList();
  }
}

getFromLocalStorage();

function displayFavsList(){
  let html = '';
  for (const favorite of favorites) {
    html += `<li class="fav_item js_fav_item" id="${favorite.id}">`;
    if(favorite.image === null){
      html += `<img class="img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"  alt="movie cover">`;
    }
    else{
      html += `<img class="img" src="${favorite.image.medium}" alt="movie cover">`;
    }
    html += `<h2 class="movie_title">${favorite.name}</h2>`;
    html += `<button class="reset_button js_reset_button" id="${favorite.id}">X</button>`;
    html += `</li>`;
    favList.innerHTML = html;
  }
  listenResetButtons();
}

function listenResetButtons(){
  resetButton = document.querySelectorAll('.js_reset_button');
  for (const reset of resetButton) {
    reset.addEventListener('click',handleResetButton);
  }
}

function handleResetButton(ev){
  const toDelete = ev.currentTarget.id;
  console.log(toDelete);
  const objetClickedIndex = favorites.findIndex((show) => {
    return show.id === parseInt(toDelete);
  });
  favorites.splice(objetClickedIndex,1);
  console.log(favorites);
  console.log(favorites.length);
  displayFavsList();
  saveToLocalStorage();
}


function handleButton(ev){
  ev.preventDefault();
  urlMaker();
  requestToAPI();
}

button.addEventListener('click',handleButton);
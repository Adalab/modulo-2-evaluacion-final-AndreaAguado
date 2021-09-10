'use strict';

const input = document.querySelector('.js_input');

const list = document.querySelector('.js_list');
const favList = document.querySelector('.js_favs_list');

const button = document.querySelector('.js_submit_button');

let url;
function urlMaker(){
  url='//api.tvmaze.com/search/shows?q=';
  url += input.value;
  return url;
}

let shows = [];
// let images = [];
// let showTitles = [];
// let showsId = [];
// showTitles = {};
// let showsInfo = [];
function requestToAPI(){
  url=urlMaker();
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        shows[i]=data[i].show;
        // images[i]=shows[i].image;
        // showTitles[i]=shows[i].name;
        // showsId[i]=shows[i].id;
        // showTitles['id']=shows[i].id;
        // showTitles['name']=shows[i].name;
        // showsInfo.push(showTitles);
      }
      console.log(shows);
      // console.log(images);
      // console.log(showTitles);
      // console.log(showsId);
      // console.log(showsInfo);
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
      // html += `<img class="img" src=${images[i].medium} alt="movie cover">`;
      html += `<img class="img" src=${shows[i].image.medium} alt="movie cover">`;
    }
    // html += `  <h2 class="movie_title">${showTitles[i]}</h2>`;
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
}

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
    html += `</li>`;
  }

  favList.innerHTML = html;
}


function handleButton(ev){
  ev.preventDefault();
  urlMaker();
  requestToAPI();
}


button.addEventListener('click',handleButton);
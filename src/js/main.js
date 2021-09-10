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
    if(images[i] === null){
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
  console.log(favorited);
  favorites.push(favorited);
  console.log(favorites);
}

function displayFavsList(){
  let html = '';
  html += `<li class="fav_item js_fav_item" id="">`;
  html += `<img class="img" src="" alt="movie cover">`;
  html += `<h2 class="movie_title">Movie Title</h2>`;
  html += `</li>`;
  favList.innerHTML = html;
}


function handleButton(ev){
  ev.preventDefault();
  urlMaker();
  requestToAPI();
}


button.addEventListener('click',handleButton);
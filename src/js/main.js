'use strict';

const input = document.querySelector('.js_input');

const list = document.querySelector('.js_list');

const button = document.querySelector('.js_submit_button');

let url;
function urlMaker(){
  url='//api.tvmaze.com/search/shows?q=';
  url += input.value;
  return url;
}

let shows = [];
let images = [];
let showTitles = [];
function requestToAPI(){
  url=urlMaker();
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        shows[i]=data[i].show;
        images[i]=shows[i].image;
        showTitles[i]=shows[i].name;
      }
      console.log(shows);
      console.log(images);
      console.log(showTitles);
      displayResults();
    });
}

let listItem;
function displayResults(){
  let html = '';
  for (let i = 0; i < shows.length; i++) {
    html += `<li class="list_item js_list_item">`;
    if(images[i] === null){
      html += `<img class="img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="movie cover">`;
    }
    else{
      html += `<img class="img" src=${images[i].medium} alt="movie cover">`;
    }
    html += `  <h2 class="movie_title">${showTitles[i]}</h2>`;
    html += `</li>`;
    list.innerHTML = html;
  }
  listItem = document.querySelectorAll('.js_list_item');
  console.log(listItem);
}



function handleButton(ev){
  ev.preventDefault();
  urlMaker();
  requestToAPI();
}


button.addEventListener('click',handleButton);
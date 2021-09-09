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
 
//   console.log(shows[0].show);
}


let html = '';
function displayResults(){
   for (let i = 0; i < shows.length; i++) {
    html += `<li class="list_item js_list_item">`;
    html += `<img class="img" src=${images[i].medium} alt="movie cover">`;
    html += `  <h2 class="movie_title">${showTitles[i]}</h2>`;
    html += `<h2 class="movie_title">Movie Title</h2>`;
    html += `</li>`;
    list.innerHTML = html;
   }

    

}

let showInfo = [];
function extractShowInfo(){
//   for (let i = 0; i < shows.length; i++) {
//     showInfo.push(shows[i].show);
//     // showInfo[i]=shows[i].show;
//   }

//   showInfo = shows[0].show;
// for (const show of shows) {
//     showInfo.push(show.show);
// }
  console.log(showInfo);

  return showInfo;
}


function handleButton(ev){
  ev.preventDefault();
  urlMaker();
  requestToAPI();
//   let info = extractShowInfo();
//   displayResults(info);

}


button.addEventListener('click',handleButton);
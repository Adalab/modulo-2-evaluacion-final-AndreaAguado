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
 
//   console.log(shows[0].show);
}


let html = '';
function displayResults(){
    for (const show of shows) {
        html += `<li class="list_item js_list_item">`;
        html += `<img class="img" src="${show.name}" alt="movie cover">`;
        // html += `  <h2 class="movie_title">${}</h2>`;
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
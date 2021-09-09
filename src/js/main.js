'use strict';

console.log('>> Ready :)');

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
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        shows[i]=data[i];
      }
    });
  console.log(shows);
}

// let html = '';
// function displayResults(){
//   html += `<li class="list_item js_list_item">`;
// }


function handleButton(ev){
  ev.preventDefault();
  urlMaker();
  requestToAPI();
}


button.addEventListener('click',handleButton);
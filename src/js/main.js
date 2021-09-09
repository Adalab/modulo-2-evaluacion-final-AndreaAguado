'use strict';

console.log('>> Ready :)');

const input = document.querySelector('.js_input');

const list = document.querySelector('.js_list');

const button = document.querySelector('.js_submit_button');

let url;
function urlMaker(){
  url='//api.tvmaze.com/search/shows?q=';
  url += input.value;
  console.log(input.value);
  console.log(url);
  return url;
}

// function requestToAPI(){
//     url=urlMaker();
//   fetch()
// }

function handleInput(){
  console.log(input.value);
  urlMaker();
}

input.addEventListener('change',handleInput);
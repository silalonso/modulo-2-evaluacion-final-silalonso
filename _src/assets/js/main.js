"use strict";

console.log(">> Ready :)");
let listSeries = [];
let favoriteSeries = [];
// los pongo vacíos porque luego se pintarán

let inputSearch = document.querySelector("js-input-search");
const buttonSearch = document.querySelector("js-button-search");
let resultSearch = document.querySelector("js-results-search");
let favorites = document.querySelector("js-fav-series");

function getApiData(ev) {
  ev.preventDefault();
  let text = inputSearch.nodeValue;
  fetch(`//api.tvmaze.com/search/shows?q=${text}`)
    .then(response => response.json())
    .then(data => {
      listSeries = data;
      console.log(listSeries);
      paintlistSeries();
    });
}
// buttonSearch.addEventListener('click', getApiData);

"use strict";

console.log(">> Ready :)");
let listSeries = [];
let favoriteSeries = [];
// los pongo vacíos porque luego se pintarán

let inputSearch = document.querySelector(".js-input-search");
const buttonSearch = document.querySelector(".js-button-search");
// let resultSearch = document.querySelector(".js-results-search");
// let favorites = document.querySelector(".js-fav-series");
function getApiData(ev) {
  ev.preventDefault();
  let text = inputSearch.value;
  fetch(`//api.tvmaze.com/search/shows?q=${text}`)
    .then(response => response.json())
    .then(data => {
      for (const serie of data) {
        console.log(serie.show.name);
        let serieResult = {
          id: serie.show.id,
          name: serie.show.name,
          image: serie.show.image
        };
        listSeries.push(serieResult);
      }

      console.log(listSeries);
      // paintlistSeries();
    });
}

// vamos a generar el html para pintarlo luego

const listSeriesElement = document.querySelector(".js-listSeries");

const getListSeriesHtmlCode = listSeries => {
  let htmlCode = "";
  htmlCode += `<article class="serie">`;
  htmlCode += `<img src="${listSeries.image}" class= "serie_img" alt="Serie: ${listSeries.name}">`;
  htmlCode += `<h3 class="serie_name">${listSeries.name}</h3>`;
  htmlCode += `</article>`;
  return htmlCode;
};

const paintListSeries = serie => {
  let seriesCode = "";
  for (const serie of listSeries) {
    seriesCode += getListSeriesHtmlCode(serie);
  }
  listSeriesElement.innerHTML = seriesCode;
};

paintListSeries();

buttonSearch.addEventListener("click", getApiData);

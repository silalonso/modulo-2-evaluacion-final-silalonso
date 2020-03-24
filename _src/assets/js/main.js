"use strict";

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
        let serieResult = {
          id: serie.show.id,
          name: serie.show.name,
          image: serie.show.image.medium,
          status: serie.show.status
        };
        listSeries.push(serieResult);
      }
      paintListSeries();
    });
}

// vamos a generar el html para pintarlo luego

const listSeriesElement = document.querySelector(".js-listSeries");

const getListSeriesHtmlCode = listSeries => {
  let htmlCode = "";
  htmlCode += `<article class="serie">`;
  htmlCode += `<img src="${listSeries.image}" class= "js-addSerie serie_img" data-id="${listSeries.id}" alt="Serie: ${listSeries.name}">`;
  htmlCode += `<h3 class="serie_name">${listSeries.name}</h3>`;
  htmlCode += `<h3 class="serie_status">${listSeries.status}</h3>`;
  htmlCode += `</article>`;
  return htmlCode;
};

const paintListSeries = serie => {
  let seriesCode = "";
  for (const serie of listSeries) {
    seriesCode += getListSeriesHtmlCode(serie);
  }
  listSeriesElement.innerHTML = seriesCode;
  listenClickSeries();
};

const logbtn = document.querySelector(".js-btn-nombreSerie");
logbtn.addEventListener("click", function(ev) {
  ev.preventDefault();

  for (const serie of listSeries) {
    console.log(serie.name);
  }
});

// escuchar click en las series

const listenClickSeries = () => {
  const listSeries = document.querySelectorAll(".js-addSerie");
  for (const listSerie of listSeries) {
    listSerie.addEventListener("click", addToFavs);
  }
};

const addToFavs = ev => {
  console.log(ev.target.dataset.id);
  const clickedSerie = ev.target.dataset.id;
  let chosenSerie;
  for (const serie of listSeries) {
    if (serie.id === clickedSerie) {
      chosenSerie = serie;
    }
  }

  favoriteSeries.push({
    id: chosenSerie.id,
    name: chosenSerie.name,
    image: chosenSerie.image
  });

  console.log(favoriteSeries);
};

buttonSearch.addEventListener("click", getApiData);

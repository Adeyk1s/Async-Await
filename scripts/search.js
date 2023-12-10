const searchBtnQuery = document.querySelector("#byQueryBtn");
const searchBtnId = document.querySelector("#byIdBtn");
const spinner = document.querySelector(".spinner");
const container = document.querySelector("#result-container");
const inputQuery = document.querySelector("#query-search");
const inputId = document.querySelector("#id-search");
const messageHeader = document.querySelector(".message-header");
const messageBody = document.querySelector(".message-body");
const species = document.querySelector(".section-list");

searchBtnQuery.addEventListener("click", function () {
  spinner.style.visibility = "visible";
  if (container.style.visibility == "visible") {
    container.style.visibility = "hidden";
  }
  switch (species.value) {
    case "people":
        listSearchQuery(starWars.searchCharacters, species.value, inputQuery.value);
      break;
    case "planet":
        listSearchQuery(starWars.searchPlanets, species.value, inputQuery.value);
      break;
    case "species":
        listSearchQuery(starWars.searchSpecies, species.value, inputQuery.value);
      break;
  }
});

searchBtnId.addEventListener("click", function () {
  spinner.style.visibility = "visible";
  if (container.style.visibility == "visible") {
    container.style.visibility = "hidden";
  }
  switch (species.value) {
    case "people":
        listSearchQuery(starWars.getCharactersById,species.value, inputId.value)
      break;
    case "planet":
        listSearchQuery(starWars.getPlanetsById,species.value, inputId.value)
      break;
    case "species":
        listSearchQuery(starWars.getSpeciesById,species.value, inputId.value)
      break;
  }
});

function cleanSerch() {
  spinner.style.visibility = "hidden";
  container.style.visibility = "visible";
  messageBody.innerHTML = "";
}

async function listSearchQuery(serchFunction, species, input) {
  let result = await serchFunction(input);
  if(input == inputQuery.value){
  result = result.results[0];
  }
  if (result !== undefined && result) {
    messageHeader.innerHTML = result.name;
    if (species == "people") {
      cleanSerch();
      let planet = await starWars.getPlanetsById(result.homeworld.split("/").at(-2));
      for (let key in result) {
        if (key == "homeworld") {
          messageBody.innerHTML += `${key}: ${planet.name}<br>`;
        } else {
          messageBody.innerHTML += `${key}: ${result[key]}<br>`;
        }
      }
    } else {
      cleanSerch();
      for (let key in result) {
        messageBody.innerHTML += `${key}: ${result[key]}<br>`;
      }
    }
  } else {
    cleanSerch();
    messageHeader.innerHTML = "Ошибка запроса";
  }
}

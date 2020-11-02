import autos from "./db.js";
import cars from "./db.js";
const result = document.querySelector("#resultado");

const brand = document.querySelector("#marca");
const year = document.querySelector("#year");
const minPrice = document.querySelector("#minimo");
const maxPrice = document.querySelector("#maximo");
const carDoors = document.querySelector("#puertas");
const trasmition = document.querySelector("#transmision");
const color = document.querySelector("#color");

const searchKeys = {
  brand: "",
  year: "",
  minPrice: "",
  maxPrice: "",
  carDoors: "",
  trasmition: "",
  color: "",
};

const maxDate = new Date().getFullYear();
const minDate = maxDate - 10;

addEvenListeners();

function addEvenListeners() {
  document.addEventListener("DOMContentLoaded", loadData);
  brand.addEventListener("change", (e) => {
    searchKeys.brand = e.target.value;
    carsFilter();
  });
  year.addEventListener("change", (e) => {
    searchKeys.year = parseInt(e.target.value);
    carsFilter();
  });
  minPrice.addEventListener("change", (e) => {
    searchKeys.minPrice = parseInt(e.target.value);
    carsFilter();
  });
  maxPrice.addEventListener("change", (e) => {
    searchKeys.maxPrice = parseInt(e.target.value);
    carsFilter();
  });
  carDoors.addEventListener("change", (e) => {
    searchKeys.carDoors = parseInt(e.target.value);
    carsFilter();
  });
  trasmition.addEventListener("change", (e) => {
    searchKeys.trasmition = e.target.value;
    carsFilter();
  });
  color.addEventListener("change", (e) => {
    searchKeys.color = e.target.value;
    carsFilter();
  });
}

function loadData() {
  showCars(cars);
  buildingYearSelect();
}

function showCars(carsToShow) {
  clearCarHTML();
  carsToShow.forEach((car) => {
    const {
      marca: brand,
      modelo: model,
      year,
      transmision: transmition,
      precio: price,
      color,
      puertas: carDoors,
    } = car;
    const HTMLcar = document.createElement("p");
    HTMLcar.innerHTML = `
            ${brand} ${model} - ${year} - ${carDoors} - Transmisión:${transmition} - Precio:$${price} - Color:${color}
        `;
    result.appendChild(HTMLcar);
  });
}

function clearCarHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

function buildingYearSelect() {
  for (let date = maxDate; date >= minDate; date--) {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    year.appendChild(option);
  }
}

function carsFilter() {
  const results = cars
    .filter(brandFilter)
    .filter(yearFilter)
    .filter(minPriceFilter)
    .filter(maxPriceFilter)
    .filter(carDoorsFilter)
    .filter(transmitionFilter)
    .filter(colorFilter);
  if (results.length) {
    showCars(results);
    console.log(results);
  } else {
    noResults();
  }
}

function noResults() {
  clearCarHTML();
  const noResults = document.createElement("p");
  noResults.classList.add("alerta", "error");
  noResults.textContent = "No hay resultados, intenta con otros filtros.";
  result.appendChild(noResults);
}

function brandFilter(car) {
  const { marca: brand } = car;
  if (searchKeys.brand) {
    return brand === searchKeys.brand;
  }
  return car;
}

function yearFilter(car) {
  const { year } = car;
  if (searchKeys.year) {
    return year === searchKeys.year;
  }
  return car;
}

function minPriceFilter(car) {
  const { precio: Price } = car;
  if (searchKeys.minPrice) {
    return Price >= searchKeys.minPrice;
  }
  return car;
}

function maxPriceFilter(car) {
  const { precio: Price } = car;
  if (searchKeys.maxPrice) {
    return Price <= searchKeys.maxPrice;
  }
  return car;
}

function carDoorsFilter(car) {
  const { puertas: carDoors } = car;
  if (searchKeys.carDoors) {
    return carDoors === searchKeys.carDoors;
  }
  return car;
}

function transmitionFilter(car) {
  const { transmision: transmition } = car;
  if (searchKeys.trasmition) {
    return transmition === searchKeys.trasmition;
  }
  return car;
}

function colorFilter(car) {
  const { color } = car;
  if (searchKeys.color) {
    return color === searchKeys.color;
  }
  return car;
}

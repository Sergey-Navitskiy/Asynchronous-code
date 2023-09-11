"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
function getCountryDAta(country) {
  const requst = new XMLHttpRequest();
  requst.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  requst.send();

  requst.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `<article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${data.population}</p>
          <p class="country__row"><span>🗣️</span>${
            Object.entries(data.languages)[0][1]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.entries(Object.entries(data.currencies)[0][1])[0][1]
          } </p>
        </div>
      </article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
}
getCountryDAta("usa");
console.log("hello world");

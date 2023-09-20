"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
// function getCountryDAta(country) {
//   const requst = new XMLHttpRequest();
//   requst.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   requst.send();

//   function renderCards(data, className = ''){
//     const html = `<article class="country ${className}">
//         <img class="country__img" src="${data.flags.svg}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name.common}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${data.population}</p>
//           <p class="country__row"><span>🗣️</span>${
//             Object.entries(data.languages)[0][1]
//           }</p>
//           <p class="country__row"><span>💰</span>${
//             Object.entries(Object.entries(data.currencies)[0][1])[0][1]
//           } </p>
//         </div>
//       </article>`;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   }

//   requst.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const neibhour = data.borders[0]
//     renderCards(data)

//     const request2 = new XMLHttpRequest()
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neibhour}`)
//     request2.send()
//     request2.addEventListener('load', function(){
//       const [data2] = JSON.parse(this.responseText);
//       renderCards(data2,'neighbour')
//     })
//   });
// }
// getCountryDAta("usa");
// console.log("hello world");

// fetch
// создание карточки

function renderCards(data, className = "") {
  const html = `<article class="country ${className}">
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
}

function renderError(message) {
  countriesContainer.insertAdjacentText("beforeend", message);
  countriesContainer.style.opacity = 1;
}

// получение информации из API при помощи fetch
function getCountryDAta(country) {
  function getJSON(url, errorMsg = "Что то пошло не так.") {
    return fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error(`${errorMsg}(${response.status})`);
      }
      return response.json();
    });
  }

  const request = fetch(`https://restcountries.com/v3.1/name/${country}`);

  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Cтрана не найдена")
    .then(function (data) {
      renderCards(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbour = "dsgfsdgsdg";
      console.log(neighbour);
      if (!neighbour) {
        throw new Error("Не найдено соседей");
      }

      //Страна сосед
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        "Cтрана не найдена"
      ).then(function (data) {
        const [res] = data;
        renderCards(res, "neighbour");
      });
    })
    .catch(function (err) {
      console.log(err);
      renderError(`Что то пошло не так из за ошибки: ${err.message}`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener("click", function () {
  getCountryDAta("france");
});

navigator.geolocation.getCurrentPosition(
  function (pos) {
    const [latitude, longitude] = pos.coords;

    fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=442426570626257657862x66288`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        const country = result.country;
        return fetch(`https://restcountries.com/v3.1/name/${country}`);
      })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`Что-то не так(${response.status})`);
        }
        response.json();
      })
      .then(function (data) {
        renderCards(data);
      })
      .finally(function () {
        countriesContainer.style.opacity = 1;
      });
  },
  function () {
    alert("Вы не предоставили свою гео-локацию");
  }
);




//обработка ошибок

//   const req = fetch(`https://restcountries.com/v3.1/name/${country}`)

//     req.then()
//     .then(function (data) {
//       renderCards(data[0]);
//       const neibhour = data[0].borders[0];

//       // страна сосед
//       return fetch(`https://restcountries.com/v3.1/alpha/${neibhour}`)

//         .then(function (response) {
//           if(!response.ok){
//             throw new Error(`страна не найдена (${response.status})`)
//           }
//           return response.json();
//         })

//         .then(function (data) {
//           const [res] = data;
//           renderCards(res, "neighbour");
//         });

//     }).catch(function(err){
//       renderError(`что-то пошло не так из-за ошибки ${err.message}. попробуйте позже`)
//     }).finally(function(){
//       countriesContainer.style.opacity = 1
//     });
// }

// btn.addEventListener("click", function () {
//   getCountryDAta("usa");
// });

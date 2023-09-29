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

navigator.geolocation.getCurrentPosition(
  function (pos) {
    console.log(pos);
    const { latitude, longitude } = pos.coords;

    fetch(
      `https://script.google.com/macros/s/AKfycbyzDYhjzdytjxFrMVwLjNYRY7WxjgRhShVI9_JunYRru25HHmN5tcJ7caRrO2m812P4dw/exec?cor1=${latitude}&cor2=${longitude}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        const country = result.country;
        console.log(result);
        return fetch(`https://restcountries.com/v3.1/name/${country}`);
      })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`Что то пошло не так(${response.status})`);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        renderCards(data[0]);
      })
      .catch(function (err) {
        console.log(err);
        renderError(`Что то пошло не так из за ошибки: ${err.message}`);
      })
      .finally(function () {
        countriesContainer.style.opacity = 1;
      });
  },
  function () {
    alert("Вы не передали свою гео-позицию");
  }
);

btn.addEventListener("click", function () {
  getCountryDAta("france");
});

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

const lotteryTicket = new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("Win");
    } else {
      reject("Lose");
    }
  }, 2000);
});

lotteryTicket
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.error(err);
  });

function wait(sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
}

wait(2)
  .then(function () {
    console.log("ВЫ ждали 2сек");
    return wait(1);
  })
  .then(function () {
    console.log("Вы ждали ещё 1 секунду");
    return wait(1);
  })
  .then(function () {
    console.log("ur waitong 1 sec");
    return wait(1);
  });

// очереди выполнения кода

// console.log('test stert')
// setTimeout(function(){
//   console.log('0sec timer')
// },0)
// Promise.resolve('resolved promise 1').then(function(res){
//   console.log(res)
// })

// Promise.resolve('resolved promise 2').then(function(res){
//   for(let i; i < 1000000; i++){
//     console.log(res)
//   }
// })
// console.log('test end')

// промисификация геолокации из практики

// new Promise(function(result,reject){
//   navigator.geolocation.getCurrentPosition(result,reject)
// }).then(function(data){
//   console.log(data)
// })

// async/ await

// async function getCountry(country){
//   try{
//   const res = await fetch(`https://restcountries.com/v3.1/name/${country}`
// )
// if(!res.ok){
//   throw new Error('у вас нет инета')
// }
// const data = await res.json()
// return `Ваша страна ${data[0].name.common}`

//   } catch(err){
//     console.log(err)
//     throw new Error('Что-то пошло не так')
//   }
// }

// getCountry('usa').then(function(response){
//   console.log(response)
// }).catch(function(err){
//   console.log(err)
// })

// (async function(){
//   try{
//     const cuckold =  await getCountry('usa')
//   } catch(err){
//     console.log(err)
//   }
// })

async function getCapital(s1, s2, s3) {
  try{
    // const res1 = await fetch(`https://restcountries.com/v3.1/name/${s1}`)
    // const [data1] = await res1.json()

    // const res2 = await fetch(`https://restcountries.com/v3.1/name/${s2}`)
    // const [data2] = await res2.json()

    // const res3 = await fetch(`https://restcountries.com/v3.1/name/${s3}`)
    // const [data3] = await res3.json()

    const data = await Promise.all([
      fetch(`https://restcountries.com/v3.1/name/${s1}`).then(function(resp){
        return resp.json()
      }),
      fetch(`https://restcountries.com/v3.1/name/${s2}`).then(function(resp){
        return resp.json()
      }),
      fetch(`https://restcountries.com/v3.1/name/${s3}`).then(function(resp){
        return resp.json()
      })
    ])
    console.log(data.map(function(val){
      return val[0].capital
    }))
  } catch(err){

  }
}


(async function(){
  const result = await Promise.race([
    fetch(`https://restcountries.com/v3.1/name/${s1}`).then(function(resp){
      return resp.json()
    }),
    fetch(`https://restcountries.com/v3.1/name/${s2}`).then(function(resp){
      return resp.json()
    }),
    fetch(`https://restcountries.com/v3.1/name/${s3}`).then(function(resp){
      return resp.json()
    })
  ])
})


function timeout(sec){
  return Promise(function(_,reject){
    setTimeout(function(){
      reject(new Error(`Ожиданние превысилося${sec}`))
    }, sec * 1000 )
  })
}

Promise.race([
  fetch(`https://restcountries.com/v3.1/name/${s1}`).then(function(resp){
      return resp.json()
    }),
    timeout(1)
]).then(function(result){
  console.log(result)
}).catch(function(err){
  console.log(err)
})
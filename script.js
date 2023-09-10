"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////



const requst = new XMLHttpRequest()
requst.open('GET', "https://meowfacts.herokuapp.com/?count=3")
requst.send()

requst.addEventListener('load', function(){
    const data = JSON.parse(requst.responseText)
    console.log(data)
    const [text] = data.data
    console.log(text)
})

console.log('hello world')
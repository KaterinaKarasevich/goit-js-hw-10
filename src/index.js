
import CountriesAPI from './fetchCountries.js';
import Notiflix from 'notiflix';

import './css/styles.css';
import debounce from 'lodash.debounce';
//API.fetchCountries("cuba").then(console.log())
const countriesAPI = new CountriesAPI();
console.log(countriesAPI)

const DEBOUNCE_DELAY = 300;

const textInput = document.querySelector("#search-box")
const countryInfo = document.querySelector(".country-info")
const countryList = document.querySelector(".country-list")
console.log(countryList)


textInput.addEventListener("input", debounce(getCountryName, DEBOUNCE_DELAY));
function clearCountries() {
  countryInfo.innerHTML="";
  countryList.innerHTML = "";
 
}

function getCountryName(e) {
  const inputValue = e.target.value.trim();
  
  if (!inputValue) {
    clearCountries()
    return
  }

  countriesAPI.searchQuery = inputValue;
  
  countriesAPI
    .fetchCountries()
    .then( countries  => {
      console.log(countries);
      return countries
    })
    .then(getCountryNumber)
    .catch(error => {
     Notiflix.Notify.failure('Oops, there is no country with that name');
    })
    .finally(() => (countriesAPI.searchQuery = ""));
}
  
  
function createMarkUpCountryInfo(countries) {
    clearCountries()
   return countries
     .map(
    ({ flags, name, capital,population, languages}) => 
    `<li class = "country-list"><img src = "${flags.svg}"  alt="flag" width = "100" height = "50">
     <h2 class = "country-name">Name official: ${name.official}</h2>
    <p class = "country-capital">Capital: ${capital}</p>
    <p class = "country-population">Population: ${population}</p>
    <p class = "country-languages">Country languages: ${Object.values(languages).join(", ")}</p></li>
  `)
   .join(" ");
 
}


function renderMarkUpCountryInfo(countries) {

 const markUpCountryInfo = createMarkUpCountryInfo(countries)
  countryInfo.innerHTML = markUpCountryInfo

}


function createMarkUpCountryList(countries) {
 clearCountries()
  return countries
    .map(
      ({flags, name}) =>
        `<li>
      <img src = "${flags.svg}" alt = "flag" width = "100" height = "50">
      <h2 class = "country-name">Name official: ${name.official}</h2>
  </li>
  `
  )
   .join("");
  
}
function renderMarkUpCountryList(countries) {
 
   const markUpCountryList = createMarkUpCountryList(countries)
  countryList.innerHTML = markUpCountryList
}

function getCountryNumber(countries) {
  if (countries.length === 1) {
    return  renderMarkUpCountryInfo(countries)

    } else if (countries.length >= 2 && countries.length <= 10) {
     return renderMarkUpCountryList(countries) 
    
    } else if (countries.length > 10){
       Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
  } 
}
  
  

  
  
//Notiflix.Notify.success('Sol lucet omnibus');

//Notiflix.Notify.warning('Memento te hominem esse');

//Notiflix.Notify.info('Cogito ergo sum');
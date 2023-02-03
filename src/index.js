
import CountriesAPI from './fetchCountries.js';
import Notiflix from 'notiflix';
import './css/styles.css';
import debounce from 'lodash.debounce';
//API.fetchCountries("cuba").then(console.log())
const countriesAPI = new CountriesAPI();
console.log(countriesAPI)

const DEBOUNCE_DELAY = 3000;

const textInput = document.querySelector("#search-box")
const countryInfo = document.querySelector(".country-0info")
const countryList = document.querySelector(".country-list")
console.log(countryList)


textInput.addEventListener("input", debounce(getCountryName, DEBOUNCE_DELAY));

function getCountryName(e) {
  countriesAPI.searchQuery = e.target.value.trim()
  if (countriesAPI.searchQuery = "") {
      countryInfo.innerHTML = ""
      countryList.innerHTML = ""
    return
  }

  countriesAPI
    .fetchCountries(countriesAPI.searchQuery)
    
    //.then(({ countries }) => console.log (countries))
    .then(getCountryNumber)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    })
   .finally(() => (countriesAPI.searchQuery = ""));
}

function createMarkUpCountryInfo({
    flags,
    name,
    capital,
    population,
    languages})
{
  countryInfo.innerHTML = ""
  const countryLanguages = Object.values(languages).join(", ");
  const markUpCountryInfo =
  `<img src = "${flags.svg}" class = "country-flag" alt = "Flag of ${name.official} width = "50" height = "50">
  <h2><class = "country-name" Name official${name.official}></h2>
  <h3><class = "country-capital" Capital${capital}></h3>
  <h3><class = "country-population" Population${population}></h3>
  <h3><class = "country-languages" CountryLanguages${countryLanguages}></h3>
  `
  countryInfo.insertAdjacentHTML("beforeend", markUpCountryInfo)
}
function createMarkUpCountryList(countries) {
countryList.innerHTML = ""
 const markUpCountryList = countries
  .map(
    ({ flags, name }) =>
    `<li class = country-item>
      <img src = "${flags.svg}"> class = "country-flag-list" alt = "Flag of ${name.official} width = "50" height = "50">
      <h2><class = "country-name-list" Name official${name.official}></h2>
  </li>
  `
  )
   .join("");
  countryList.insertAdjacentHTML("beforeend", markUpCountryList)
}
function getCountryNumber(countries) {
    const numberСountriesEntered = countries.length;
    if (numberСountriesEntered === 1) {
      createMarkUpCountryInfo(countries)
    } else if (numberСountriesEntered >= 2 && numberСountriesEntered <= 10) {
      createMarkUpCountryList(countries)
    } else if (numberСountriesEntered > 10){
       Notify.warning('Too many matches found. Please enter a more specific name');
    } 
}
  
  
  
  
  
//Notiflix.Notify.success('Sol lucet omnibus');

//Notiflix.Notify.warning('Memento te hominem esse');

//Notiflix.Notify.info('Cogito ergo sum');
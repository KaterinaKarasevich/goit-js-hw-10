
export default class CountriesAPI {
    constructor(searchQuery) {
        this.searchQuery = searchQuery;
    }
    
    fetchCountries() {
        const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`
        return fetch(url)
            .then(response =>{
        if (!response.ok){
            throw new Error(response.status);
        }
         response.json();
            })
        //.then(response => response.json())
      .then(countries => {
        return countries;
      });
  }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
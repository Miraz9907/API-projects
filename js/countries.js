const loadCountries = () =>{
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => displayCountries(data))
}
const displayCountries =(countries) =>{
    const countriesContainer = document.getElementById('all-countries');
    countries.forEach(country =>{
        // console.log(country);
        const countryDiv =  document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
        <h3>Name:${country.name.common} </h3>
        <p>Capital: ${country.capital ? country.capital[0] : "no capital"}</p>
        <button onclick = "loadCountryDetails('${country.cca2}')">Details</button>
        `;
        countriesContainer.appendChild(countryDiv);
    })
}

const loadCountryDetails = code =>{
    const url = `https://restcountries.com/v3.1/alpha/${code}`
    
    fetch(url)
    .then(res=> res.json())
    .then(data => displayCountryDetails(data[0]))
}

const displayCountryDetails = details =>{
    const countryDetails = document.getElementById('country-details');
    countryDetails.innerHTML = `
    <h3>Name:${details.name.common} </h3>
    <img src= "${details.flags.svg}">

    `
    console.log(details);
}

loadCountries();

"use strict"


const btnSearch = document.querySelector('.btn-search');
const inputCountry = document.querySelector('.input-search');
const resultContainer = document.querySelector('.result-container');


btnSearch.addEventListener('click', async function () {

    try {

        const input = inputCountry.value;

        const country = await getCountry(input);

        const [data] = country;

        console.log(data);

        renderCountry(data, input);



    }

    catch (err) {

        const html = `
         <div class="error-result">
                <p>${err.message}</p>
            </div>
`

        resultContainer.insertAdjacentHTML('beforeend', html);
    }

});


const getCountry = async function (country) {

    try {

        inputCountry.value = resultContainer.innerHTML = '';

        const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);


        if (!res.ok) throw new Error('Please enter a valid country name!');

        const data = await res.json();

        return data;

    }

    catch (err) {

        throw err;
    }
};



const renderCountry = function (country) {

    resultContainer.classList.remove('reveal');

    setTimeout(function () {
        const html = `
    <div class="flag-container">
        <img src="${country.flags.png ? country.flags.png : country.coatOfArms.png}" alt="Country flag">
        <p>${country.name.common.toUpperCase()}</p>
    </div>

    <div class="description-container">
        <p><span>Capital:</span> ${country.capital[0]}</p>
        <p><span>Language:</span> ${Object.values(country.languages)}</p>
        <p><span>Region:</span> ${country.continents[0]}</p>
        <p><span>Population:</span> ${Math.round(country.population / 1000000)} M</p>
        <p><span>Currency:</span> ${Object.values(country.currencies)[0].name}</p>
        <p><span>Driving side:</span> ${country.car.side.charAt(0).toUpperCase()}${country.car.side.slice(1)}</p>

        <p><span>Google Maps:</span> <a href="${country.maps.googleMaps}" target="blank">${country.name.common}</a></p>
    </div>

    `
        resultContainer.insertAdjacentHTML('beforeend', html);
        resultContainer.classList.add('reveal');
    }, 1000);



};
const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer'); // Corrected selector

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `Please write the name before search`; // Corrected message
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=5c24ccf6593d07ad516c75b854ffbea7`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            // Check weather: sunny, cloudy, rainy
            const tempMod = arrData[0].weather[0].main;
            if (tempMod === 'Clear') {
                temp_status.innerHTML = "<i class='fa-solid fa-sun' style='color:#F8F22A'></i>";
            } else if (tempMod === 'Clouds') {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud' style='color:#6B6B5E'></i>";
            } else if (tempMod === 'Rain') {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud-rain' style='color:#97CFC6'></i>";
            } else {
                temp_status.innerHTML = "<i class='fa-solid fa-sun' style='color:#F8F22A'></i>";
            }
            datahide.classList.remove('data_hide');
        } catch (error) {
            console.error(error); // Log the error for debugging
            city_name.innerText = `Please write the city name properly`; // Corrected message
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);

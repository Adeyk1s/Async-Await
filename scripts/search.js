const searchBtn = document.querySelector('#byQueryBtn');
const spinner = document.querySelector('.spinner');
const container = document.querySelector('#result-container')
const inputValue = document.querySelector('.is-large.input')
const messageHeader = document.querySelector('.message-header')
const messageBody = document.querySelector('.message-body')
searchBtn.addEventListener('click', async function(){
    spinner.style.visibility = "visible";
    if(container.style.visibility == "visible"){
        container.style.visibility = 'hidden';
    }
    if(inputValue.value){
        let result = await starWars.searchCharacters(inputValue.value);
        result = result.results[0];
        let planet = await starWars.getPlanetsById(result.homeworld.split("/").at(-2))
        if(result){
            cleanSerch();
            messageHeader.innerHTML = result.name;
            for (let key in result) {
                if(key == 'homeworld'){
                    messageBody.innerHTML += `${key}: ${planet.name}<br>`;
                } else {
                    messageBody.innerHTML += `${key}: ${result[key]}<br>`
                }
            }
        } else {
            cleanSerch();
            messageHeader.innerHTML = "Ошибка запроса";
        }
    }
})

function cleanSerch(){
    spinner.style.visibility = "hidden";
    container.style.visibility = 'visible';
    messageBody.innerHTML = "";
}
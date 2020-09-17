const ingredients = document.querySelector('.ingredients-box')
const preparation = document.querySelector('.preparation-box')
const information = document.querySelector('.information-box')
const ingredientsButton = document.querySelector('.ingredients-box span')
const preparationButton = document.querySelector('.preparation-box span')
const informationButton = document.querySelector('.information-box span')

ingredientsButton.addEventListener('click', () => {
    ingredients.classList.toggle('invisible')
    ingredientsButton.innerHTML = 'ESCONDER'
    
    if(ingredients.classList.contains('invisible')) {
        ingredientsButton.innerHTML = 'MOSTRAR'
    }
})

preparationButton.addEventListener('click', () => {
    preparation.classList.toggle('invisible')
    preparationButton.innerHTML = 'ESCONDER'
    
    if(preparation.classList.contains('invisible')) {
        preparationButton.innerHTML = 'MOSTRAR'
    }
})

informationButton.addEventListener('click', () => {
    information.classList.toggle('invisible')
    informationButton.innerHTML = 'ESCONDER'
    
    if(information.classList.contains('invisible')) {
        informationButton.innerHTML = 'MOSTRAR'
    }
})

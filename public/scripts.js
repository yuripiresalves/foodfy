const cards = document.querySelectorAll('.card')

// for (let card of cards) {
//     card.addEventListener('click', () => {
//     console.log('oi')

//     window.location.href = '/recipes/0'

//     })   
// }

for (let i=0; i < cards.length; i++) {
    const recipe = cards[i]
    recipe.addEventListener('click', () => {
        window.location.href = `/recipes/${i}`
        console.log('oi')
    })
}

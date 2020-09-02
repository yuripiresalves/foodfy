const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
const modalImage = document.querySelector('.modal-image img')
const modalTitle = document.querySelector('.modal-contents h1')
const modalAuthor = document.querySelector('.modal-contents p')


for (let card of cards) {
    card.addEventListener('click', () => {

        const imagemId = card.getAttribute('id')
        const title = card.querySelector('.card-info h2').innerHTML
        const author = card.querySelector('.card-info p').innerHTML

        modalOverlay.classList.add('active')
        modalImage.src = `assets/${imagemId}.png`
        modalImage.alt = `Imagem de ${imagemId}`
        modalTitle.innerHTML = title 
        modalAuthor.innerHTML = author
    })
}

document.querySelector('.modal-close').addEventListener('click', () => { modalOverlay.classList.remove('active') })
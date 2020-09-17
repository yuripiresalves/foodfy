const botoes = document.querySelectorAll('h1 span')

for (const botao of botoes) {
    botao.addEventListener('click', () => {
        console.log('cliquei')
        botao.classList.add('invisible')
    })
}


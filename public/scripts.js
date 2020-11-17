const cards = document.querySelectorAll('.card')

for (const card of cards) {
  card.addEventListener('click', () => {
    let id = card.getAttribute('id')
    window.location.href = `/recipes/${id}`
  })
}

const currentPage = location.pathname
const menuItems = document.querySelectorAll('.menu-links a')

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}
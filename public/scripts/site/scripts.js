// OPEN RECIPE
const cards = document.querySelectorAll('.card')

for (const card of cards) {
  card.addEventListener('click', () => {
    let id = card.getAttribute('id')
    window.location.href = `/recipes/${id}`
  })
}

// MENU ACTIVE
const currentPage = location.pathname
const menuItems = document.querySelectorAll('.menu-links a')

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

// HIDE RECIPE CONTENT
const ingredients = document.querySelector('.ingredients-box')
const preparation = document.querySelector('.preparation-box')
const information = document.querySelector('.information-box')
const ingredientsButton = document.querySelector('.ingredients-box span')
const preparationButton = document.querySelector('.preparation-box span')
const informationButton = document.querySelector('.information-box span')

ingredientsButton.addEventListener('click', () => {
  ingredients.classList.toggle('invisible')
  ingredientsButton.innerHTML = 'ESCONDER'

  if (ingredients.classList.contains('invisible')) {
    ingredientsButton.innerHTML = 'MOSTRAR'
  }
})

preparationButton.addEventListener('click', () => {
  preparation.classList.toggle('invisible')
  preparationButton.innerHTML = 'ESCONDER'

  if (preparation.classList.contains('invisible')) {
    preparationButton.innerHTML = 'MOSTRAR'
  }
})

informationButton.addEventListener('click', () => {
  information.classList.toggle('invisible')
  informationButton.innerHTML = 'ESCONDER'

  if (information.classList.contains('invisible')) {
    informationButton.innerHTML = 'MOSTRAR'
  }
})

// PAGINATION
function paginate(totalPages, selectedPage) {
  let pages = [],
    oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPages = currentPage == 1 || currentPage == 2 || currentPage == totalPages || currentPage == totalPages - 1
    const pagesAfterSelectedPage = currentPage <= selectedPage + 1
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 1

    if (firstAndLastPages || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...")
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1)
      }

      pages.push(currentPage)

      oldPage = currentPage
    }
  }
  return pages
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter
  const page = +pagination.dataset.page
  const total = +pagination.dataset.total
  const pages = paginate(total, page)

  let elements = ""

  for (let page of pages) {
    if (String(page).includes("...")) {
      elements += `<span>${page}</span>`
    } else
      if (filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
      } else {
        elements += `<a href="?page=${page}">${page}</a>`
      }
  }

  pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
  createPagination(pagination)
}

const elements = document.querySelectorAll('.pagination a')

for (element of elements) {
  if (location.search == "" || location.search.includes("?filter")) {
    elements[0].classList.add('active')
  } else if (location.search.includes(element.getAttribute('href'))) {
    element.classList.add('active')
  }
}
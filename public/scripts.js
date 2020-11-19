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
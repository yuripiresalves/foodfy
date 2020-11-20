// MENU ACTIVE
const currentPage = location.pathname
const menuItems = document.querySelectorAll('.menu-links a')

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active')
  }
}

// ADD AND REMOVE INGREDIENTS AND PREPARATION
function addIngredient() {
  const ingredients = document.querySelector('#ingredients__container');
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "")
    return false;

  // Deixa o valor do input vazio
  newField
    .children[0]
    .value = "";
  newField
    .children[0]
    .required = false;
  ingredients.appendChild(newField);
}

function removeIngredient() {
  const ingredients = document.querySelector('#ingredients__container');
  const fieldContainer = document.querySelectorAll(".ingredient");
  const button = document.querySelector('.remove-ingredient')

  const lastField = fieldContainer[fieldContainer.length - 1];

  if (lastField == fieldContainer[0]) {
    return false;
  }

  ingredients.removeChild(lastField);
}

function addPreparation() {
  const preparation = document.querySelector('#preparation__container')
  const fieldContainer = document.querySelectorAll(".preparation");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "")
    return false;

  // Deixa o valor do input vazio
  newField
    .children[0]
    .value = "";
  newField
    .children[0]
    .required = false;
  preparation.appendChild(newField);
}

function removePreparation() {
  const preparation = document.querySelector('#preparation__container');
  const fieldContainer = document.querySelectorAll(".preparation");
  const button = document.querySelector('.remove-preparation')

  const lastField = fieldContainer[fieldContainer.length - 1];

  if (lastField == fieldContainer[0]) {
    return false;
  }

  preparation.removeChild(lastField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);

document
  .querySelector(".remove-ingredient")
  .addEventListener("click", removeIngredient);

document
  .querySelector(".add-preparation")
  .addEventListener("click", addPreparation);

document
  .querySelector(".remove-preparation")
  .addEventListener("click", removePreparation);

// CONFIRM DELETE RECIPE AND CHEF
// const formDelete = document.querySelector('.form-delete')
// formDelete.addEventListener('submit', (event) => {
//   const confirmation = confirm('Gostaria mesmo de deletar?')
//   if (!confirmation) {
//     event.preventDefault()
//   }
// })
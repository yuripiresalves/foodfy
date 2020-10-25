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
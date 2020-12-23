const ImageGallery = {
  highlight: document.querySelector('.gallery .highlight > img'),
  previews: document.querySelectorAll('.gallery-preview img'),
  setImage(e) {
    const { target } = e

    ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
    target.classList.add('active')

    ImageGallery.highlight.src = target.src
  }
}

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

const PhotosUpload = {
  input: "",
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 5,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target
    PhotosUpload.input = event.target

    if (PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {

      PhotosUpload.files.push(file)

      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = PhotosUpload.getContainer(image)
        PhotosUpload.preview.appendChild(div)
      }

      reader.readAsDataURL(file)
    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload
    const { files: fileList } = input

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos!`)
      event.preventDefault()
      return true
    }

    const photosDiv = []
    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == "photo") {
        photosDiv.push(item)
      }
    })

    const totalPhotos = fileList.length + photosDiv.length
    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos!")
      event.preventDefault()
      return true
    }

    return false
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer() 

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  getContainer(image) {
    const div = document.createElement('div')
    div.classList.add('photo')

    div.onclick = PhotosUpload.removePhoto

    div.appendChild(image)

    div.appendChild(PhotosUpload.getRemoveButton())

    return div
  },
  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = "close"
    return button
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoDiv.remove()
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode

    if (photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"]')

      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`
      }
    }

    photoDiv.remove()
  }
}
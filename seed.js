const faker = require('faker')
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')
const File = require('./src/app/models/File')
const Chef = require('./src/app/models/Chef')
const Recipe = require('./src/app/models/Recipe')
const RecipeFile = require('./src/app/models/RecipeFile')

let totalUsers = 5,
  totalChefs = 8,
  totalRecipes = 6,
  usersId,
  chefsId,
  filesId

async function createAdminUser() {
  const password = await hash('123', 8)
  const adminValues = {
    name: 'Administrador',
    email: 'admin@foodfy.com.br',
    password,
    is_admin: true
  }

  const adminUser = await User.create(adminValues)
  return adminUser
}

async function createUsers() {
  const users = []
  const password = await hash('123', 8)

  users.push({
    name: 'Usuário',
    email: 'usuario@foodfy.com.br',
    password,
    is_admin: false
  })

  while (users.length < totalUsers) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email().toLowerCase(),
      password,
      is_admin: false
    })
  }

  const usersPromise = users.map(user => User.create(user))
  usersId = await Promise.all(usersPromise)
}

async function createFiles({ name, path }, qtd) {
  const files = []
  while (files.length < qtd) {
    files.push({
      name,
      path
    })
  }
  return files
}

async function createChefs() {
  const chefs = []

  const files = await createFiles({
    name: 'chef',
    path: `public/images/chef${Math.ceil(Math.random() * 3)}_placeholder.png`
  }, totalChefs)

  const filesPromise = files.map(file => File.create({ 
    ...file,  
    path: `public/images/chef${Math.ceil(Math.random() * 3)}_placeholder.png`
  }))
  filesId = await Promise.all(filesPromise)

  for (let fileIndex = 0; chefs.length < totalChefs; fileIndex++) {
    chefs.push({
      name: faker.name.firstName(),
      file_id: filesId[fileIndex]
    })
  }

  const chefsPromise = chefs.map(chef => Chef.create(chef))
  chefsId = await Promise.all(chefsPromise)
}

async function createRecipes({ user_id, chef_id }) {
  const recipesValues = [
    {
      title: 'Triplo bacon burger',
      ingredients: `{${[
        '3 kg de carne moída (escolha uma carne magra e macia)',
        '300 g de bacon moído',
        '1 ovo',
        '3 colheres (sopa) de farinha de trigo',
        '3 colheres (sopa) de tempero caseiro: feito com alho, sal, cebola, pimenta e cheiro verde processados no liquidificador',
        '30 ml de água gelada',
      ]}}`,
      preparation: `{${[
        'Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.',
        'Faça porções de 90 g a 100 g.',
        'Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.',
        'Faça um de cada vez e retire o aro logo em seguida.',
        'Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).',
        'Faça no máximo 4 camadas por forma e leve para congelar.',
        'Retire do congelador, frite ou asse e está pronto.',
      ]}}`,
      information:
        'Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres.',
      user_id: usersId[Math.floor(Math.random() * totalUsers)],
      chef_id: chefsId[Math.floor(Math.random() * totalChefs)]
    },
    {
      title: 'Pizza 4 estações',
      ingredients: `{${[
        '1 xícara (chá) de leite',
        '1 ovo',
        '1 colher (chá) de sal',
        '1 colher (chá) de açúcar',
        '1 colher (sopa) de margarina',
        '1 e 1/2 xícara (chá) de farinha de trigo',
        '1 colher (sobremesa) de fermento em pó',
        '1/2 lata de molho de tomate',
        '250 g de mussarela ralada grossa',
        '2 tomates fatiados',
        'azeitona picada',
        'orégano a gosto',
      ]}}`,
      preparation: `{${[
        'No liquidificador bata o leite, o ovo, o sal, o açúcar, a margarina, a farinha de trigo e o fermento em pó até que tudo esteja encorporado.',
        'Despeje a massa em uma assadeira para pizza untada com margarina e leve ao forno preaquecido por 20 minutos.',
        'Retire do forno e despeje o molho de tomate.',
        'Cubra a massa com mussarela ralada, tomate e orégano a gosto.',
        'Leve novamente ao forno até derreter a mussarela.',
      ]}}`,
      information:
        'Pizza de liquidificador é uma receita deliciosa e supersimples de preparar.',
      user_id: usersId[Math.floor(Math.random() * totalUsers)],
      chef_id: chefsId[Math.floor(Math.random() * totalChefs)]
    },
    {
      title: 'Asinhas de frango ao barbecue',
      ingredients: `{${[
        '12 encontros de asinha de galinha, temperados a gosto',
        '2 colheres de sopa de farinha de trigo',
        '1/2 xícara (chá) de óleo',
        '1 xícara de molho barbecue',
      ]}}`,
      preparation: `{${[
        'Em uma tigela coloque o encontro de asinha de galinha e polvilhe a farinha de trigo e misture com as mãos.',
        'Em uma frigideira ou assador coloque o óleo quando estiver quente frite até ficarem douradas.',
        'Para servir fica bonito com salada, ou abuse da criatividade.',
      ]}}`,
      information: '',
      user_id: usersId[Math.floor(Math.random() * totalUsers)],
      chef_id: chefsId[Math.floor(Math.random() * totalChefs)]
    },
    {
      title: 'Lasanha mac n cheese',
      ingredients: `{${[
        'massa pronta de lasanha',
        '400 g de presunto',
        '400 g de mussarela ralada',
        '2 copos de requeijão',
        '150 g de mussarela para gratinar',
      ]}}`,
      preparation: `{${[
        'Em uma panela, coloque a manteiga para derreter.',
        'Acrescente a farinha de trigo e misture bem com auxílio de um fouet.',
        'Adicione o leite e misture até formar um creme homogêneo.',
        'Tempere com sal, pimenta e noz-moscada a gosto.',
        'Desligue o fogo e acrescente o creme de leite; misture bem e reserve.',
      ]}}`,
      information: 'Recheie a lasanha com o que preferir.',
      user_id: usersId[Math.floor(Math.random() * totalUsers)],
      chef_id: chefsId[Math.floor(Math.random() * totalChefs)]
    },
    {
      title: 'Espaguete ao alho',
      ingredients: `{${[
        '1 pacote de macarrão 500 g (tipo do macarrão a gosto)',
        '1 saquinho de alho granulado',
        '1/2 tablete de manteiga (não use margarina)',
        '1 colher (sopa) de azeite extra virgem',
        'ervas (manjericão, orégano, salsa, cebolinha, tomilho, a gosto)',
        'sal',
        '1 dente de alho',
        'gengibre em pó a gosto',
        '1 folha de louro'
      ]}}`,
      preparation: `{${[
        'Quando faltar mais ou menos 5 minutos para ficar no ponto de escorrer o macarrão, comece o preparo da receita.',
        'Na frigideira quente coloque a manteiga, o azeite, a folha de louro, e o alho granulado.',
        'Nesta hora um pouco de agilidade, pois o macarrão escorrido vai para a frigideira, sendo mexido e dosado com sal a gosto, as ervas, o gengibre em pó a gosto também.',
        'O dente de alho, serve para você untar os pratos onde serão servidos o macarrão.',
        'Coloque as porções nos pratos já com o cheiro do alho, e enfeite com algumas ervas.'
      ]}}`,
      information: 'Não lave o macarrão nem passe óleo ou gordura nele depois de escorrê-lo. Coloque direto na frigideira.',
      user_id: usersId[Math.floor(Math.random() * totalUsers)],
      chef_id: chefsId[Math.floor(Math.random() * totalChefs)]
    },
    {
      title: 'Docinhos pão-do-céu',
      ingredients: `{${[
        '1 kg de batata - doce',
        '100 g de manteiga',
        '3 ovos',
        '1 pacote de coco seco ralado (100 g)',
        '3 colheres (sopa) de açúcar 1 lata de Leite Moça',
        '1 colher (sopa) de fermento em pó',
        'manteiga para untar',
        'açúcar de confeiteiro'
      ]}}`,
      preparation: `{${[
        'Cozinhe a batata-doce numa panela de pressão, com meio litro de água, por cerca de 20 minutos. Descasque e passe pelo espremedor, ainda quente.',
        'Junte a manteiga,os ovos, o coco ralado,o açúcar, o Leite Moça e o fermento em pó, mexendo bem após cada adição.',
        'Despeje em assadeira retangular média, untada e leve ao forno médio (180°C), por aproximadamente 45 minutos.',
        'Depois de frio, polvilhe, com o açúcar de confeiteiro e corte em quadrados.'
      ]}}`,
      information: '',
      user_id: usersId[Math.floor(Math.random() * totalUsers)],
      chef_id: chefsId[Math.floor(Math.random() * totalChefs)]
    },
  ]
  const recipesPromises = recipesValues.map(recipe => Recipe.create(recipe))
  const recipesId = await Promise.all(recipesPromises)

  const files = await createFiles({
    name: 'recipe',
    path: `public/images/recipe_placeholder.png`
  }, totalRecipes)

  let filesPromise = files.map(file => File.create(file))
  filesId = await Promise.all(filesPromise)

  const recipeFiles = []

  while (recipeFiles.length < (totalRecipes * 2)) {
    recipeFiles.push({
      name: 'recipe',
      path: `public/images/recipe${Math.ceil(Math.random() * 3)}_placeholder.png`,
      recipe_id: recipesId[Math.floor(Math.random() * totalRecipes)],
      file_id: filesId[Math.floor(Math.random() * filesId.length)]
    })
  }
  filesPromise = recipeFiles.map(file => RecipeFile.createRecipeFile(file))

  await Promise.all(filesPromise)
}

async function init() {
  try {
    await createAdminUser()
    await createUsers()
    await createChefs()
    await createRecipes({
      user_id: Math.random(),
      chef_id: Math.random()
    })
    console.log('Success ✅🚀')
  } catch (error) {
    console.log('ERROR ❌')
    console.error(error)
  }
}

init()
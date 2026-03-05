const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const createFragment = ([tag, attrs, ...content]) => {
  const element = document.createElement(tag);
  for (const attr of Object.entries(attrs)) {
    element.setAttribute(...attr)
  }

  if (content.length === 1 && typeof content[0] === 'string') {
    element.textContent = content
    return element;
  }

  const children = content.map(createFragment);
  element.append(...children);
  return element
}

const formatStats = (stats) => {
  const requiredStats = [
    { label: 'Weight', value: stats.weight },
    { label: 'Base XP', value: stats.baseXP },
    { label: 'HP', value: stats.hp },
    { label: 'Attack', value: stats.attack },
    { label: 'Defense', value: stats.defense },
    { label: 'Speed', value: stats.speed },
  ];

  return requiredStats.map(({ label, value }) => [
    'tr', {},
    ['td', { class: 'bold' }, label],
    ['td', { class: 'align-right' }, value.toString()],
  ]
  )
}

const createPokemonCard = ({ name, types, stats, image }) => {
  const typesElements = types.map(type => ['div', { class: `white-font pokemon-type ${type}` }, type]);
  const statsRows = formatStats(stats);
  const imageElement = ['img', { src: image, alt: name, class: 'image' }, '']

  const card = ['div', { class: 'card' },
    ['div', { class: 'image-container' }, imageElement],
    ['div', { class: 'details' },
      ['div', { class: 'flex pokemon-header' },
        ['h2', { class: 'grey-font bold' }, capitalize(name)],
        ['div', { class: 'flex pokemon-types' }, ...typesElements]],
      ['table', { class: 'table grey-font' }, ...statsRows]]
  ];

  return createFragment(card);
}

const createPokedex = (pokemons) => {
  const pokedex = createFragment(['div', { class: 'pokedex-container flex main' }, '']);
  pokedex.append(...pokemons.map(createPokemonCard));
  return pokedex
}

const addListenersToLinks = (links) => {
  links.forEach(link => {
    link.addEventListener('click', () =>
      fetch(`/pokemons/${link.innerText.toLowerCase()}`)
        .then(res => res.json())
        .then(page)
    );
  })
}

const createSideBar = (links) => {
  const linkElements = links.map(link => ['li', { class: 'link' }, link]);
  const list = ['ul', {},
    ...linkElements
  ];
  const sideBar = ['div', { class: 'side-bar' }, list]
  return createFragment(sideBar)
}

const addEventListeners = () => {
  const navigations = document.querySelectorAll('ul li');
  addListenersToLinks(navigations);
  const search = document.querySelector('.search');
  const type = 'bug';
  search.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchString = document.querySelector('.search-string');
    fetch(`/pokemons/${type}?pokemon=${searchString.value}`)
      .then(res => res.json())
      .then(page)
  });
}

const links = [
  "all",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const page = (pokemons) => {
  const pokedex = createPokedex(pokemons)
  const sideBar = createSideBar(links)
  const main = document.querySelector('main');
  const sideBarElement = document.querySelector('.side-bar');
  const pokedexElement = document.querySelector('.pokedex-container');

  sideBarElement.remove()
  main.removeChild(pokedexElement)
  main.append(sideBar, pokedex)
  addEventListeners()
}
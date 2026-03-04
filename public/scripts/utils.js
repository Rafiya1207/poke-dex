export const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

export const createFragment = ([tag, attrs, ...content]) => {
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

export const createPokemonCard = ({ name, types, stats, image }) => {
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

export const createPokedex = (pokemons) => {
  const pokedexContainer = document.querySelector('.pokedex-container');
  const pokedex = pokemons.map(createPokemonCard)
  pokedexContainer.append(...pokedex);
}
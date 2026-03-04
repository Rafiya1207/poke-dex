const fetchPokemons = () =>
  fetch('/pokemons').then(res => res.json())

window.onload = async () => {
  const pokemons = await fetchPokemons();
}
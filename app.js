document.querySelector("#visualizar").addEventListener("click", function () {
  fetchData();
});

// document.addEventListener("DOMContentLoaded", () => {
// fetchData();
// });

const fetchData = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await res.json();

    // console.log(data);

    for (let i = 0; i < data.results.length; i++) {
      //   console.log(data.results[i]);

      try {
        let res = await fetch(data.results[i].url);
        const dataPokemon = await res.json();
        const pokemon = {
          img: dataPokemon.sprites.other.dream_world.front_default,
          nombre: dataPokemon.name,
          hp: dataPokemon.stats[0].base_stat,
          experiencia: dataPokemon.base_experience,
          ataque: dataPokemon.stats[1].base_stat,
          defensa: dataPokemon.stats[2].base_stat,
          especial: dataPokemon.stats[3].base_stat,
        };
        console.log(dataPokemon);
        pintarCards(pokemon);
      } catch (error) {}

      //   console.log(pokemon);
    }
  } catch (error) {
    console.log(error);
  }
};

const pintarCards = (pokemon) => {
  console.log(pokemon);

  const items = document.getElementById("items");
  const templateCard = document.getElementById("template-card").content;
  const fragment = document.createDocumentFragment();
  const clone = templateCard.cloneNode(true);

  clone.querySelector(".card-img-top").setAttribute("src", pokemon.img);
  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${pokemon.nombre} <span>${pokemon.hp}</span>`;
  clone.querySelector(".card-body-text").textContent =
    pokemon.experiencia + " Exp ";

  clone.querySelectorAll(".card-footer-social h3")[0].textContent =
    pokemon.ataque + "K";
  clone.querySelectorAll(".card-footer-social h3")[1].textContent =
    pokemon.especial + "K";
  clone.querySelectorAll(".card-footer-social h3")[2].textContent =
    pokemon.defensa + "K";

  fragment.appendChild(clone);
  items.appendChild(fragment);
};

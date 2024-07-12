
const search_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");

const pokemon_name = document.getElementById("pokemon-name");
const pokemon_id = document.getElementById("pokemon-id");
const pokemon_weight = document.getElementById("weight");
const pokemon_height = document.getElementById("height");

const pokemon_types = document.getElementById("types");


const pokemon_hp = document.getElementById("hp");
const pokemon_attack = document.getElementById("attack");
const pokemon_defense = document.getElementById("defense");
const pokemon_special_attack = document.getElementById("special-attack");
const pokemon_special_defense = document.getElementById("special-defense");
const pokemon_speed = document.getElementById("speed");


const preview_div = document.querySelector(".img_div");
const sprite = document.createElement("img");
preview_div.appendChild(sprite);


const queryApi = async(pokemon_input) => {
    try {
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon_input.toLowerCase()}`);
        const data = await res.json();
        clearAll();
        pok_managment(data);
      } catch (err) {
        console.log(err);
        alert("Pokémon not found");
      }
}


const pok_managment = (data) => {
  //Al data
  /*
  const {
    base_experience, 
    height,
    id,
    name,
    order,
    sprites,
    stats,
    types,
    weight,
  } = data;
  */
  //Images
  const pokemon_image = data.sprites.front_default;
  console.log(pokemon_image);
  //Stats
  /*
  const {
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed
  } = stats;
  */


  //Types
  const typeNames = data.types.map(typeInfo => typeInfo.type.name);

  pokemon_name.innerHTML = `<td>${data.name.toUpperCase()}</td>`;
  pokemon_id.innerHTML = `<td>#${data.id}</td>`;
  pokemon_weight.innerHTML = `<td>Weight: ${data.weight}</td>`;
  pokemon_height.innerHTML = `<td>Height: ${data.height}</td>`;

  sprite.src = data.sprites.front_default;
  sprite.id = "sprite";
  sprite.alt = `${data.name} sprite`;

  pokemon_hp.innerHTML = `<td>${data.stats[0].base_stat}</td>`;
  pokemon_attack.innerHTML = `<td>${data.stats[1].base_stat}</td>`;
  pokemon_defense.innerHTML = `<td>${data.stats[2].base_stat}</td>`;
  pokemon_special_attack.innerHTML = `<td>${data.stats[3].base_stat}</td>`;
  pokemon_special_defense.innerHTML = `<td>${data.stats[4].base_stat}</td>`;
  pokemon_speed.innerHTML = `<td>${data.stats[5].base_stat}</td>`;

  typeNames.map((type) => {
    pokemon_types.innerHTML += `<p class="${type.toLowerCase()}">${type.toUpperCase()}</p>`;
  });

  
}

const clearAll = () =>{
  pokemon_name.innerHTML = "";
  pokemon_id.innerHTML = "";
  pokemon_weight.innerHTML = "";
  pokemon_height.innerHTML = "";

  pokemon_hp.innerHTML = "";
  pokemon_attack.innerHTML = "";
  pokemon_defense.innerHTML = "";
  pokemon_special_attack.innerHTML = "";
  pokemon_special_defense.innerHTML = "";
  pokemon_speed.innerHTML = "";

  
  pokemon_types.innerHTML = "";
}

search_button.addEventListener('click', e => {
            e.preventDefault();
            queryApi(search_input.value);
});
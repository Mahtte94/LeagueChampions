const fetchData = async () => {
  try {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json"
    );
    championsData = await res.json();

    displayAllClasses();
  } catch (error) {
    console.error("Error fetching champion data:", error);
  }
};

/* Function for creating a champion element */
const createChampionElement = (champion) => {
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image.full}`;
  const championName = champion.name;
  const classes = champion.tags;

  const figure = document.createElement("figure");
  const figcaption = document.createElement("figcaption");
  const img = document.createElement("img");

  img.src = imgUrl;
  img.alt = championName;
  figcaption.innerHTML = `${championName}<br>(${classes})`;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
};


/* Function for displaying a random champion by class if a class is checked */
const displayRandomChampionByClass = () => {
  const container = document.getElementById("champion-container");
  container.innerHTML = "";
  const checkedInputs = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  const championKeys = Object.keys(championsData.data);

  if (checkedInputs.length !== 0) {
    const filteredChampions = championKeys.filter((key) =>
      Array.from(checkedInputs).some((input) =>
        championsData.data[key].tags.includes(input.name)
      )
    );
    const randomKey =
      filteredChampions[Math.floor(Math.random() * filteredChampions.length)];
    const randomChampion = championsData.data[randomKey];
    const champion = createChampionElement(randomChampion);
    container.appendChild(champion);
  } else {
    displayRandomChampion();
  }
};

/* Function for displaying a random champion when pressing the generate button */
const displayRandomChampion = () => {
  const container = document.getElementById("champion-container");
  container.innerHTML = "";

  const championKeys = Object.keys(championsData.data);
  const randomKey =
    championKeys[Math.floor(Math.random() * championKeys.length)];
  const randomChampion = championsData.data[randomKey];
  const champion = createChampionElement(randomChampion);
  container.appendChild(champion);
};

/* Function for displaying all classes when loading the page */
const displayAllClasses = () => {
  const classContainer = document.querySelector(".class-container");
  classContainer.innerHTML = "";
  const champs = Object.values(championsData.data);

  const uniqueTags = new Set();
  champs.forEach((champ) => {
    champ.tags.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });

  /* Creates an array from uniqueTags*/
  const uniqueTagsArrays = Array.from(uniqueTags);

  uniqueTagsArrays.forEach((array) => {
    const singleClasses = document.createElement("div")
    const classes = document.createElement("input");
    const label = document.createElement("label");
    singleClasses.classList.add("singleClasses");
    label.setAttribute("for", array);
    label.textContent = array;
    classes.type = "checkbox";
    classes.name = array;
    classes.id = array;

    
    classContainer.appendChild(singleClasses);
    singleClasses.appendChild(classes);
    singleClasses.appendChild(label);
    
  });
};

const randomButton = document.getElementById("random-champion-btn");
randomButton.addEventListener("click", displayRandomChampionByClass);

fetchData();

let championsData = [];

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

const createChampionElement = (champion) => {
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image.full}`;
  const championName = champion.id;
  const type = champion.tags;

  const figure = document.createElement("figure");
  const figcaption = document.createElement("figcaption");
  const img = document.createElement("img");

  img.src = imgUrl;
  img.alt = championName;
  figcaption.textContent = championName + " " + "(" + type + ")";

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
};

const displayRandomChampion = () => {
  const container = document.getElementById("champion-container");
  container.innerHTML = "";

  const championKeys = Object.keys(championsData.data);
  const randomKey = championKeys[Math.floor(Math.random() * championKeys.length)];
  const randomChampion = championsData.data[randomKey];

  const figure = createChampionElement(randomChampion);
  container.appendChild(figure);
};

const displayAllClasses = () => {
  const section = document.getElementById("class-select");

  const uniqueTags = new Set();

  Object.keys(championsData.data).forEach((key) => {
    const champion = championsData.data[key];

    champion.tags.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });

  uniqueTags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    section.appendChild(option);
  });

  const displayRandomChampionByClass = () => {
    const container = document.getElementById("champion-container");
    const selectedClass = document.getElementById("class-select").value;
    container.innerHTML = "";

    const matchingChampions = Object.keys(championsData.data).filter((key) => {
      const champion = championsData.data[key];
      return champion.tags.includes(selectedClass);
    });

    if (matchingChampions.length > 0) {
      const randomKey = matchingChampions[Math.floor(Math.random() * matchingChampions.length)];
      const randomChampion = championsData.data[randomKey];
      const figure = createChampionElement(randomChampion);
      container.appendChild(figure);
    } else {
      displayRandomChampion();
    }
  };

  const randomButton = document.getElementById("random-champion-btn");
  randomButton.addEventListener("click", displayRandomChampionByClass);
};

fetchData();

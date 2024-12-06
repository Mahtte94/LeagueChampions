let championsData = [];

const fetchData = async () => {
  try {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json"
    );
    championsData = await res.json();
  } catch (error) {
    console.error("Error fetching champion data:", error);
  }
};

const createChampionElement = (champion) => {
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image.full}`;
  const championName = champion.name;
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
  const randomKey =
    championKeys[Math.floor(Math.random() * championKeys.length)];
  const randomChampion = championsData.data[randomKey];

  const figure = createChampionElement(randomChampion);
  container.appendChild(figure);

  
};

const randomButton = document.getElementById('random-champion-btn');
randomButton.addEventListener("click", displayRandomChampion);

fetchData();

let championsData = [];

const fetchData = async () => {
  try {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json"
    );
    championsData = await res.json();
    displayClasses();
  } catch (error) {
    console.error("Error fetching champion data:", error);
  }
};

const createChampionElement = (champion) => {
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image.full}`;
  const championName = champion.name;
  const classes = champion.tags;

  const figure = document.createElement("figure");
  const figcaption = document.createElement("figcaption");
  const img = document.createElement("img");

  img.src = imgUrl;
  img.alt = championName;
  figcaption.textContent = championName + " " + "(" + classes + ")";

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

  const champion = createChampionElement(randomChampion);
  container.appendChild(champion);
  
};


const createClassesElement = (tags) => {
  const classElement = document.createElement("div");

  classElement.textContent = tags;

  return classElement;
}

const displayClasses = () => {
  const classContainer = document.getElementById("class-container");

  const uniqueClasses = new Set();
  Object.values(championsData.data).forEach(champion => {
    champion.tags.forEach(tag => uniqueClasses.add(tag));
    
  });
  
    const classes = createClassesElement(Array.from(uniqueClasses));
    classContainer.appendChild(classes);
  console.log(classContainer);
  };


const randomButton = document.getElementById('random-champion-btn');
randomButton.addEventListener("click", displayRandomChampion);

fetchData();

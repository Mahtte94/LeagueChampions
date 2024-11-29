const fetchData = async () => {
  try {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json"
    );
    const champions = await res.json();
    const container = document.getElementById("champion-container");
    
    Object.keys(champions.data).forEach(key => {
      const champion = champions.data[key];
      const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image.full}`;
      const championName = champion.id;
      const type = champion.tags;

      const figure = document.createElement('figure');
      const figcaption = document.createElement('figcaption');
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = championName;
      figcaption.textContent = championName;


      figure.appendChild(img);
      figure.appendChild(figcaption);
      container.appendChild(figure);

      
    });
  } catch (error) {
    console.error("Error fetching champion data:", error);
  }
};

fetchData();





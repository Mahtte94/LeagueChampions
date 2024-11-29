// const url = "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json";

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     const champions = data.data;
//     const container = document.getElementById("champion-container")
    

//    champions.keys.forEach((key) => {
//       console.log(key);
      
//     });
// }).catch((error) =>
//   console.error("Error fetching champion data:", error)
//   );

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

      console.log(imgUrl, championName, type);
    });
  } catch (error) {
    console.error("Error fetching champion data:", error);
  }
};

fetchData();





const url = "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
  const champions = data.data;
  console.log(champions);
}).catch((error) =>
  console.error("Error fetching champion data:", error)
  );




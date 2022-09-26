// Fetch des données json
async function getPhotographers() {
  if (document.location.host.includes("valentindft")) {
    const response = await fetch(
      "../Front-End-Fisheye/data/photographers.json"
    );
    const data = await response.json();
    return data.photographers;
  } else {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data.photographers;
  }
}

// Affiche les photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();

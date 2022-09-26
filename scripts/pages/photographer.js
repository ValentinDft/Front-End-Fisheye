// Fetch des données json
async function getPhotographer() {
  if (document.location.host.includes("valentindft")) {
    const response = await fetch(
      "../Front-End-Fisheye/data/photographers.json"
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data;
  }
}

// Affiche les différents média du photographe
async function displayImg(mediaData) {
  // Sort list img
  const itemsDropdownSelector = [...document.querySelectorAll(".items")];

  // Fonction de tri filtre
  let sortChoice = (input) => {
    let dropdownValue = input.target.id;

    // Les différents cas suivant la valeur du filtre
    if (dropdownValue === "popularity") {
      // Trie du tableau des médias
      mediaData.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
      // Affichage des nouveaux médias
      mediaData.map((img) => {
        const imgModel = imgFactory(img, mediaData);
        listImg.removeChild(listImg.lastChild);
        setTimeout(() => {
          listImg.appendChild(imgModel);
        }, 500);
      });

      // Modification du dropdown suivant ça valeur
      const firstItem = document.querySelector(".dropdown > p");
      firstItem.innerHTML = "Popularité <i class='fa-solid fa-angle-down'></i>";
      const dropdownContent = [
        ...document.querySelectorAll(".dropdown-content > p"),
      ];
      dropdownContent[0].textContent = "Date";
      dropdownContent[0].id = "date";
      dropdownContent[1].textContent = "Titre";
      dropdownContent[1].id = "title";
    } else if (dropdownValue === "date") {
      mediaData.sort((a, b) => new Date(b.date) - new Date(a.date));
      mediaData.map((img) => {
        const imgModel = imgFactory(img, mediaData);
        listImg.removeChild(listImg.lastChild);
        setTimeout(() => {
          listImg.appendChild(imgModel);
        }, 500);
      });
      const firstItem = document.querySelector(".dropdown > p");
      firstItem.innerHTML = "Date <i class='fa-solid fa-angle-down'></i>";
      const dropdownContent = [
        ...document.querySelectorAll(".dropdown-content > p"),
      ];
      dropdownContent[0].textContent = "Popularité";
      dropdownContent[0].id = "popularity";
      dropdownContent[1].textContent = "Titre";
      dropdownContent[1].id = "title";
    } else if (dropdownValue === "title") {
      mediaData.sort((a, b) => a.title.localeCompare(b.title));
      mediaData.map((img) => {
        const imgModel = imgFactory(img, mediaData);
        listImg.removeChild(listImg.lastChild);
        setTimeout(() => {
          listImg.appendChild(imgModel);
        }, 500);
      });
      const firstItem = document.querySelector(".dropdown > p");
      firstItem.innerHTML = "Titre <i class='fa-solid fa-angle-down'></i>";
      const dropdownContent = [
        ...document.querySelectorAll(".dropdown-content > p"),
      ];
      dropdownContent[0].textContent = "Popularité";
      dropdownContent[0].id = "popularity";
      dropdownContent[1].textContent = "Date";
      dropdownContent[1].id = "date";
    }
  };

  // Ecoute sur tous les filtres
  itemsDropdownSelector.map((input) => {
    input.addEventListener("click", sortChoice);
  });

  // Affichage des médias par défault en popularité
  mediaData.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));

  // Create list of media
  const listImg = document.querySelector(".list-img");
  mediaData.map((img) => {
    const imgModel = imgFactory(img, mediaData);
    listImg.appendChild(imgModel);
  });
}

async function init() {
  // Récupération des données
  const photographer = await getPhotographer();

  // Récupération de l'id dans l'url
  const url = new URL(document.location).searchParams;
  const id = url.get("id");

  // Recherche des médias suivant l'id du photographe
  if (id) {
    const mediaData = photographer.media.filter((value) => {
      return value.photographerId === Number(id);
    });
    let photographerData;
    photographer.photographers.map((value) => {
      if (value.id === Number(id)) {
        photographerData = value;
      }
    });
    photographFactory(mediaData, photographerData);
    displayImg(mediaData);
  }
}
init();

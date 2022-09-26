// Page médias du photographe - photographer.html
function photographFactory(media, photographer) {
  const { name, city, tagline, country, price } = photographer;

  const picture = `../assets/photographers/${photographer.portrait}`;
  const photographerHeader = document.querySelector(".photograph-header");
  const main = document.querySelector("#main");

  // Header photographe
  const headerDetails = document.createElement("div");
  headerDetails.setAttribute("class", "photograph-header-details");
  const elementName = document.createElement("h1");
  elementName.textContent = name;
  const elementLocation = document.createElement("h2");
  elementLocation.textContent = `${city}, ${country}`;
  const elementTagline = document.createElement("span");
  elementTagline.textContent = tagline;
  const headerAvatar = document.createElement("div");
  headerAvatar.setAttribute("class", "photograph-header-avatar");
  const img = document.createElement("img");
  img.setAttribute("src", picture);

  // Affichage des éléments du header
  photographerHeader.insertBefore(
    headerDetails,
    photographerHeader.children[0]
  );
  photographerHeader.appendChild(headerAvatar);
  headerDetails.appendChild(elementName);
  headerDetails.appendChild(elementLocation);
  headerDetails.appendChild(elementTagline);
  headerAvatar.appendChild(img);

  // Encart nombre total de likes et tarif
  let countLikes = 0;
  media.map((value) => {
    countLikes = countLikes + value.likes;
  });
  const insertDiv = document.createElement("aside");
  insertDiv.setAttribute("class", "insert-like-price");
  const elementLike = document.createElement("p");
  elementLike.textContent = `${countLikes}`;
  elementLike.setAttribute("class", "total-likes");
  const iconLike = document.createElement("i");
  iconLike.setAttribute("class", "fa-solid fa-heart");
  const elementPrice = document.createElement("p");
  elementPrice.textContent = `${price}€ / jour`;

  // Affichage des éléments
  main.appendChild(insertDiv);
  insertDiv.appendChild(elementLike);
  insertDiv.appendChild(iconLike);
  insertDiv.appendChild(elementPrice);

  // Modal contactForm.js
  modal(name);
  // modal lightbox
  modalLightbox(media);
}

// Card des differents médias
function imgFactory(media) {
  const containerImg = document.createElement("article");
  containerImg.setAttribute("class", "card-img");

  // check si c'est une image ou une video
  if (media.image) {
    const img = document.createElement("img");
    img.setAttribute("src", `assets/images/${media.image}`);
    img.setAttribute("alt", media.image);
    img.setAttribute("tabindex", 0);

    // Affichage de la ligthbox au clique
    img.addEventListener(
      "click",
      function () {
        displayLightbox(media);
      },
      false
    );
    // Affichage de la ligthbox touche enter clavier
    img.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        displayLightbox(media);
      }
    });

    containerImg.appendChild(img);
  } else if (media.video) {
    var video = document.createElement("video");
    video.setAttribute("src", `assets/videos/${media.video}`);
    video.setAttribute("controls", true);
    video.setAttribute("alt", media.video);
    containerImg.appendChild(video);
  }

  // Création et attribution des différents éléments de la card des médias
  const containerDetails = document.createElement("div");
  containerDetails.setAttribute("class", "card-img-details");
  const imgtitle = document.createElement("h2");
  imgtitle.textContent = media.title;
  const containerLike = document.createElement("div");
  containerLike.setAttribute("class", "card-img-details-likes");
  const nbLike = document.createElement("h2");
  nbLike.textContent = `${media.likes}`;
  nbLike.setAttribute("class", "nb-likes");
  const iconLike = document.createElement("i");
  iconLike.setAttribute("class", "fa-regular fa-heart");
  iconLike.setAttribute("tabindex", 0);

  let clickLike = false;

  // Fonction like
  let like = () => {
    clickLike = !clickLike;
    clickLike ? (count = media.likes + 1) : (count = media.likes);
    nbLike.textContent = `${count}`;
    clickLike
      ? iconLike.setAttribute("class", "fa-solid fa-heart")
      : iconLike.setAttribute("class", "fa-regular fa-heart");

    const selectorLikes = [...document.querySelectorAll(".nb-likes")];

    let totalCountLikes = 0;
    selectorLikes.map((value) => {
      totalCountLikes = totalCountLikes + Number(value.textContent);
    });

    const selectorTotalLikes = document.querySelector(".total-likes");
    selectorTotalLikes.textContent = totalCountLikes;
  };

  // Au click sur j'aime
  iconLike.onclick = like;

  // Touche enter clavier
  iconLike.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      like();
    }
  });

  // Affichage des éléments de la card
  containerImg.appendChild(containerDetails);
  containerDetails.appendChild(imgtitle);
  containerDetails.appendChild(containerLike);
  containerLike.appendChild(nbLike);
  containerLike.appendChild(iconLike);

  return containerImg;
}

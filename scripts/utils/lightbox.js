let displayLightbox = (media) => {
  // Open modal
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "block";

  // Change aria value
  const main = document.querySelector("main");
  const modal = document.querySelector(".modal-lightbox");
  main.setAttribute("aria-hidden", true);
  modal.setAttribute("aria-hidden", false);

  // Close modal when press echap
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  // display img
  const containerImg = document.querySelector(".panel-center-lightbox");
  const img = document.createElement("img");
  img.setAttribute("src", `assets/images/${media.image}`);
  img.setAttribute("id", `media`);
  const titleImg = document.querySelector(".panel-center-lightbox .title-img");
  titleImg.textContent = media.title;

  containerImg.insertBefore(img, containerImg.children[0]);
};

let closeLightbox = () => {
  // Close modal
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";

  // Change aria value
  const main = document.querySelector("main");
  const modal = document.querySelector(".modal-lightbox");
  main.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-hidden", true);

  // Remove img on modal
  const img = document.getElementById("media");
  // containerImg.removeChild(containerImg.firstChild);
  img.parentNode.removeChild(img);
};

let nextImage = (arrayMedia) => {
  const imgModal = document.querySelector(".panel-center-lightbox #media");
  const regex = new RegExp("([^/]+$)");
  const image = imgModal.src.match(regex)[0];
  arrayMedia.map((img, index) => {
    let indexImg = index + 1;
    // If actual is image
    if (image === img.image) {
      // If no more img return first img for loop array
      if (indexImg === arrayMedia.length) {
        // If it's the first item is an image
        if (arrayMedia[0].image) {
          imgModal.setAttribute("src", `assets/images/${arrayMedia[0].image}`);
          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[0].title;
          // If it's the first item is an image
        } else if (arrayMedia[0].video) {
          const img = document.getElementById("media");
          img.parentNode.removeChild(img);
          const video = document.createElement("video");
          const containerImg = document.querySelector(".panel-center-lightbox");
          video.setAttribute("src", `assets/videos/${arrayMedia[0].video}`);
          video.setAttribute("id", `media`);
          video.setAttribute("controls", true);
          containerImg.insertBefore(video, containerImg.children[0]);

          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[0].title;
        }
      } else {
        // If the next item is an image
        if (arrayMedia[index + 1].image) {
          imgModal.setAttribute(
            "src",
            `assets/images/${arrayMedia[index + 1].image}`
          );
          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[index + 1].title;
          // If the next item is an video
        } else if (arrayMedia[index + 1].video) {
          const img = document.getElementById("media");
          img.parentNode.removeChild(img);
          const video = document.createElement("video");
          const containerImg = document.querySelector(".panel-center-lightbox");
          video.setAttribute(
            "src",
            `assets/videos/${arrayMedia[index + 1].video}`
          );
          video.setAttribute("id", `media`);
          video.setAttribute("controls", true);
          containerImg.insertBefore(video, containerImg.children[0]);

          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[index + 1].title;
        }
      }
      // If actual is an video
    } else if (image === img.video) {
      // If no more img return first img for loop array
      if (indexImg === arrayMedia.length) {
        imgModal.setAttribute("src", `assets/images/${arrayMedia[0].image}`);
        const titleImg = document.querySelector(
          ".panel-center-lightbox .title-img"
        );
        titleImg.textContent = arrayMedia[0].title;
      } else {
        // Next item is an image
        if (arrayMedia[index + 1].image) {
          const containerImg = document.querySelector(".panel-center-lightbox");
          const video = document.getElementById("media");
          video.parentNode.removeChild(video);
          const image = document.createElement("img");
          image.setAttribute(
            "src",
            `assets/images/${arrayMedia[index + 1].image}`
          );
          image.setAttribute("id", `media`);
          containerImg.insertBefore(image, containerImg.children[0]);

          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[index + 1].title;
        }
      }
    }
  });
};

let previousImage = (arrayMedia) => {
  const imgModal = document.querySelector(".panel-center-lightbox #media");
  const regex = new RegExp("([^/]+$)");
  const image = imgModal.src.match(regex)[0];
  arrayMedia.map((img, index) => {
    let indexImg = index + 1;

    if (image === img.image) {
      // If no more img return first img for loop array
      if (indexImg === 1) {
        // If it's the first item is an image
        if (arrayMedia[arrayMedia.length - 1].image) {
          imgModal.setAttribute(
            "src",
            `assets/images/${arrayMedia[arrayMedia.length - 1].image}`
          );
          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[arrayMedia.length - 1].title;
          // If it's the first item is an image
        } else if (arrayMedia[arrayMedia.length - 1].video) {
          const img = document.getElementById("media");
          img.parentNode.removeChild(img);
          const video = document.createElement("video");
          const containerImg = document.querySelector(".panel-center-lightbox");
          video.setAttribute("src", `assets/videos/${arrayMedia[0].video}`);
          video.setAttribute("id", `media`);
          video.setAttribute("controls", true);
          containerImg.insertBefore(video, containerImg.children[0]);

          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[0].title;
        }
      } else {
        // If the next item is an image
        if (arrayMedia[index - 1].image) {
          imgModal.setAttribute(
            "src",
            `assets/images/${arrayMedia[index - 1].image}`
          );
          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[index - 1].title;
          // If the next item is an video
        } else if (arrayMedia[index - 1].video) {
          const img = document.getElementById("media");
          img.parentNode.removeChild(img);
          const video = document.createElement("video");
          const containerImg = document.querySelector(".panel-center-lightbox");
          video.setAttribute(
            "src",
            `assets/videos/${arrayMedia[index - 1].video}`
          );
          video.setAttribute("id", `media`);
          video.setAttribute("controls", true);
          containerImg.insertBefore(video, containerImg.children[0]);

          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[index - 1].title;
        }
      }
      // If actual is an video
    } else if (image === img.video) {
      // If no more img return first img for loop array
      if (indexImg === 1) {
        const containerImg = document.querySelector(".panel-center-lightbox");
        const video = document.getElementById("media");
        video.parentNode.removeChild(video);
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `assets/images/${arrayMedia[arrayMedia.length - 1].image}`
        );
        image.setAttribute("id", `media`);
        containerImg.insertBefore(image, containerImg.children[0]);
        const titleImg = document.querySelector(
          ".panel-center-lightbox .title-img"
        );
        titleImg.textContent = arrayMedia[arrayMedia.length - 1].title;
      } else {
        // Next item is an image
        if (arrayMedia[index - 1].image) {
          const containerImg = document.querySelector(".panel-center-lightbox");
          const video = document.getElementById("media");
          video.parentNode.removeChild(video);
          const image = document.createElement("img");
          image.setAttribute(
            "src",
            `assets/images/${arrayMedia[index - 1].image}`
          );
          image.setAttribute("id", `media`);
          containerImg.insertBefore(image, containerImg.children[0]);

          const titleImg = document.querySelector(
            ".panel-center-lightbox .title-img"
          );
          titleImg.textContent = arrayMedia[index - 1].title;
        }
      }
    }
  });
};

let modalLightbox = (media) => {
  // Next image
  const iconNext = document.getElementById("next-img");
  iconNext.addEventListener("click", function (event) {
    nextImage(media);
  });
  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      nextImage(media);
    }
  });

  // Previous image
  const iconPrevious = document.getElementById("previous-img");
  iconPrevious.addEventListener("click", function (event) {
    previousImage(media);
  });
  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      previousImage(media);
    }
  });
};

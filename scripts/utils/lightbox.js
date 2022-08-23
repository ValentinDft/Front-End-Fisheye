let displayLightbox = (media) => {
    console.log(media);

    // Open modal
    const lightbox = document.getElementById("lightbox");
	lightbox.style.display = "block";

    // Close modal when press echap
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
      })

    const containerImg = document.querySelector(".panel-center-lightbox");
    const img = document.createElement( 'img' );
    img.setAttribute("src", `assets/images/${media.image}`);
    img.setAttribute("id", `media`);
    containerImg.appendChild(img);
}

let closeLightbox = () => {
    const lightbox = document.getElementById("lightbox");
	lightbox.style.display = "none";

    const containerImg = document.querySelector(".panel-center-lightbox");
    containerImg.removeChild(containerImg.lastChild);
}
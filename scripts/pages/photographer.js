async function getPhotographer() {
  const response = await fetch('../data/photographers.json');
  const data = await response.json();
  return data;
}

async function displayImg(mediaData) {
  // Sort list img
  const itemsDropdownSelector = [...document.querySelectorAll('.items')];

  let sortChoice = (input) => {
    let dropdownValue = input.target.id;

    if (dropdownValue === 'popularity') {
      mediaData.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
      mediaData.map((img) => {
        const imgModel = imgFactory(img);
        listImg.removeChild(listImg.lastChild);
        setTimeout(() => {
          listImg.appendChild(imgModel);
        }, 500);
      });
      const firstItem = document.querySelector('.dropdown > p');
      firstItem.innerHTML = "Popularité <i class='fa-solid fa-angle-down'></i>";
      const dropdownContent = [
        ...document.querySelectorAll('.dropdown-content > p'),
      ];
      dropdownContent[0].textContent = 'Date';
      dropdownContent[0].id = 'date';
      dropdownContent[1].textContent = 'Titre';
      dropdownContent[1].id = 'title';
    } else if (dropdownValue === 'date') {
      mediaData.sort((a, b) => new Date(b.date) - new Date(a.date));
      mediaData.map((img) => {
        const imgModel = imgFactory(img);
        listImg.removeChild(listImg.lastChild);
        setTimeout(() => {
          listImg.appendChild(imgModel);
        }, 500);
      });
      const firstItem = document.querySelector('.dropdown > p');
      firstItem.innerHTML = "Date <i class='fa-solid fa-angle-down'></i>";
      const dropdownContent = [
        ...document.querySelectorAll('.dropdown-content > p'),
      ];
      dropdownContent[0].textContent = 'Popularité';
      dropdownContent[0].id = 'popularity';
      dropdownContent[1].textContent = 'Titre';
      dropdownContent[1].id = 'title';
    } else if (dropdownValue === 'title') {
      mediaData.sort((a, b) => a.title.localeCompare(b.title));
      mediaData.map((img) => {
        const imgModel = imgFactory(img);
        listImg.removeChild(listImg.lastChild);
        setTimeout(() => {
          listImg.appendChild(imgModel);
        }, 500);
      });
      const firstItem = document.querySelector('.dropdown > p');
      firstItem.innerHTML = "Titre <i class='fa-solid fa-angle-down'></i>";
      const dropdownContent = [
        ...document.querySelectorAll('.dropdown-content > p'),
      ];
      dropdownContent[0].textContent = 'Popularité';
      dropdownContent[0].id = 'popularity';
      dropdownContent[1].textContent = 'Date';
      dropdownContent[1].id = 'date';
    }
  };

  itemsDropdownSelector.map((input) => {
    input.addEventListener('click', sortChoice);
  });
  mediaData.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));

  // Create list of media
  const listImg = document.querySelector('.list-img');
  mediaData.map((img) => {
    const imgModel = imgFactory(img);
    listImg.appendChild(imgModel);
  });
}

async function init() {
  // Recovery data
  const photographer = await getPhotographer();

  // Recovery id of photographer on url
  const url = new URL(document.location).searchParams;
  const id = url.get('id');

  // Search photographer & media related to the good id
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

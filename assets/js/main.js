// Barra de navegação

// Objetos
const navItems = document.querySelectorAll(".navbar-button-class");
const pages = {
    page1: document.getElementById("page1"),
    page2: document.getElementById("page2"),
    page3: document.getElementById("page3"),
    page4: document.getElementById("page4"),
};
// Esconde todas as páginas e mostra a página 1
Object.values(pages).forEach((page) => (page.style.display = "none"));
pages["page1"].style.display = "block";
// Define o evento de clique para cada botão da barra de navegação
navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        // Remove a classe "active" de todos os botões da barra de navegação
        navItems.forEach((navItem) => navItem.classList.remove("active"));
        // Adiciona a classe "active" apenas ao botão clicado
        e.currentTarget.classList.add("active");
        // Esconde todas as páginas
        Object.values(pages).forEach((page) => (page.style.display = "none"));
        // Mostra a página correspondente ao botão clicado
        const pageToShow = e.currentTarget.dataset.page;
        pages[pageToShow].style.display = "block";
    });
});

function initMap() {
  const center = { lat: -8.0555435, lng: -34.8806205 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: center,
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]
      }
    ],
    fullscreenControl: false,
    zoomControl: false
  });

  // Defina as informações dos pontos
  const points = [
    {
      name: "Meu novo ponto 1",
      info: "Esta é uma descrição do meu novo ponto 1.",
      position: { lat: -8.056812, lng: -34.880047 },
      category: "Cinema"
    },
    {
      name: "Meu novo ponto 2",
      info: "Esta é uma descrição do meu novo ponto 2.",
      position: { lat: -8.060012, lng: -34.881347 },
      category: "Parque"
    },
    {
      name: "Meu novo ponto 3",
      info: "Esta é uma descrição do meu novo ponto 3.",
      position: { lat: -8.055112, lng: -34.883047 },
      category: "Igreja"
    },
  ];

  const categories = ['Tudo', 'Cinema', 'Parque', 'Igreja'];
  let currentCategoryIndex = 0;

  const cardText = document.querySelector('.card-text');
  const arrowNextButton = document.querySelector('.arrow-next');
  const arrowBackButton = document.querySelector('.arrow-back');

  arrowNextButton.addEventListener('click', () => {
    currentCategoryIndex++;
    if (currentCategoryIndex >= categories.length) {
      currentCategoryIndex = 0;
    }
    cardText.textContent = categories[currentCategoryIndex];
  
    // Seleciona todos os botões de categoria
    const categoryButtons = document.querySelectorAll('.page2-point');
  
    // Define a visibilidade dos botões de categoria correspondentes
    categoryButtons.forEach((button) => {
      const category = button.dataset.category;
      if (categories[currentCategoryIndex] === 'Tudo' || category === 'Tudo' || category === categories[currentCategoryIndex]) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });
  });
  
  arrowBackButton.addEventListener('click', () => {
    currentCategoryIndex--;
    if (currentCategoryIndex < 0) {
      currentCategoryIndex = categories.length - 1;
    }
    cardText.textContent = categories[currentCategoryIndex];
  
    // Seleciona todos os botões de categoria
    const categoryButtons = document.querySelectorAll('.page2-point');
  
    // Define a visibilidade dos botões de categoria correspondentes
    categoryButtons.forEach((button) => {
      const category = button.dataset.category;
      if (categories[currentCategoryIndex] === 'Tudo' || category === 'Tudo' || category === categories[currentCategoryIndex]) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });
  });  

  // Itere sobre os pontos e adicione os marcadores ao mapa
  points.forEach((point) => {
    const newMarker = new google.maps.Marker({
      position: point.position,
      map: map,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      },
    });

    const bottomSection = document.getElementById("bottom-section");
    const infoPage = document.getElementById("page2");

    // Crie um novo botão para mostrar as informações do ponto
    const newButton = document.createElement("button");
    newButton.innerHTML = point.name; // Alteração aqui
    newButton.className = 'page2-point'
    newButton.id = point.name.replace(/\s+/g, '-').toLowerCase() + '-button'; // Adição do ID
    newButton.addEventListener("click", () => {
      // Verificar se o bottom-section está visível e, se sim, ocultá-lo
      if (bottomSection.style.display === "block") {
        bottomSection.style.display = "none";
      }
      // Verificar se a página atual é a "page2"
      if (pages["page2"].style.display === "block") {
        // Esconde a página 2
        pages["page2"].style.display = "none";
        // Mostra a página 1
        pages["page1"].style.display = "block";
        // Adiciona a classe "active" ao botão correspondente na barra de navegação
        document.getElementById("page1NavbarButton").classList.add("active");
        // Remove a classe "active" dos outros botões na barra de navegação
        document.querySelectorAll(".navbar-button-class:not(#page1NavbarButton)").forEach((button) => {
          button.classList.remove("active");
        });

        // Mostrar informações do ponto
        map.setCenter(point.position);
        map.setZoom(20); // Defina o nível de zoom adequado aqui

        // Exibir a bottom-section
        if (bottomSection.innerHTML.trim() === "") {
          const markerInfo = document.createElement("div");
          markerInfo.innerHTML = `
            <h2>${point.name}</h2>
            <p>${point.info}</p>
          `;

          bottomSection.innerHTML = "";
          bottomSection.appendChild(markerInfo);

          bottomSection.style.display = "block";
        } else {
          const markerInfo = document.createElement("div");
          markerInfo.innerHTML = `
            <h2>${point.name}</h2>
            <p>${point.info}</p>
          `;

          bottomSection.innerHTML = "";
          bottomSection.appendChild(markerInfo);

          bottomSection.style.display = "block";
        }
      }
    });
    
    infoPage.appendChild(newButton);

    newMarker.addListener("click", () => {
      if (bottomSection.innerHTML.trim() === "") {
        const markerInfo = document.createElement("div");
        markerInfo.innerHTML = `
          <h2>${point.name}</h2>
          <p>${point.info}</p>
        `;

        bottomSection.innerHTML = "";
        bottomSection.appendChild(markerInfo);

        bottomSection.style.display = "block";
      } else {
        bottomSection.innerHTML = "";

        bottomSection.style.display = "none";
      }
    });
  });

  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000
    };
    const userMarker = new google.maps.Marker({
      map: map,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }
    });
    navigator.geolocation.watchPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        userMarker.setPosition(userLocation);
        map.setCenter(userLocation);
      },
      (error) => {
        console.log("Error getting location:", error);
      },
      options
    );
    const clearLocationButton = document.getElementById("clearLocationButton");

    clearLocationButton.addEventListener("click", () => {
      userMarker.setPosition(null);
      map.setCenter(center);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

window.onload = () => {
  initMap();
};
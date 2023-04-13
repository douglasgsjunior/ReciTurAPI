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

  // Adicione um novo marcador ao mapa
  const newMarker = new google.maps.Marker({
    position: { lat: -8.056812, lng: -34.880047 },
    map: map,
    icon: {
      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    },
  });

  // Defina o nome do ponto
  const newPointName = "Meu novo ponto";

  // Defina informações extras sobre o ponto
  const newPointInfo = "Esta é uma descrição do meu novo ponto.";

  // Encontre o elemento HTML que representa a seção inferior da tela
  const bottomSection = document.getElementById("bottom-section");
  const infoPage = document.getElementById("page2");

  // Crie um novo botão para mostrar as informações do ponto
  const newButton = document.createElement("button");
  newButton.innerHTML = "Ver informações";
  newButton.addEventListener("click", () => {
    // Mostrar informações do ponto
  });
  infoPage.appendChild(newButton);

  // Adicione um evento de clique ao marcador
  newMarker.addListener("click", () => {
    // Verifique se as informações do marcador estão visíveis
    if (bottomSection.innerHTML.trim() === "") {
      // Crie um novo elemento HTML para as informações do marcador
      const markerInfo = document.createElement("div");
      markerInfo.innerHTML = `
        <h2>${newPointName}</h2>
        <p>${newPointInfo}</p>
      `;

      // Adicione as informações do marcador à seção inferior da tela
      bottomSection.innerHTML = "";
      bottomSection.appendChild(markerInfo);

      // Exiba a seção inferior
      bottomSection.style.display = "block";
    } else {
      // Se as informações já estão visíveis, remova-as da seção inferior da tela
      bottomSection.innerHTML = "";

      // Oculte a seção inferior
      bottomSection.style.display = "none";
    }
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
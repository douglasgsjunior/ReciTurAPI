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

  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      },
      () => {
        console.log("Erro ao acessar a posição atual do usuário.");
      },
      options
    );
  } else {
    console.log("O navegador não suporta geolocalização.");
  }
}

// Carregar a API do Google Maps
function loadMapScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIjn7yc2qdAWYWozx6OpupHdsv0yDFDIs&libraries=places&callback=initMap`;
  script.defer = true;
  script.async = true;
  document.body.appendChild(script);
}

window.onload = loadMapScript;
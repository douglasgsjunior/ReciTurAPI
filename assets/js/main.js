// Cria uma instância do objeto Autocomplete
const autocomplete = new google.maps.places.Autocomplete(document.getElementById("search-input"));

// Define o raio de busca como 10km
autocomplete.setFields(["address_components", "geometry", "name"]);
autocomplete.setOptions({
  radius: 10000,
});

autocomplete.addListener("place_changed", () => {
  const place = autocomplete.getPlace();

  if (!place.geometry) {
    alert("Nenhuma localização selecionada!");
    return;
  }

  // Centraliza o mapa na localização selecionada
  map.setCenter(place.geometry.location);
});

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const homePage = document.getElementById("home");

// Adiciona a classe "active" ao botão da página principal
document.querySelector("[data-page='home']").classList.add("active");

// Move o scroll para a página principal ao iniciar a aplicação
document.querySelector(".container").scrollTo({
  left: homePage.offsetLeft,
  behavior: "smooth",
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const pageName = item.getAttribute("data-page");
    const page = document.getElementById(pageName);
    const pagePosition = page.offsetLeft;
    document.querySelector(".container").scrollTo({
      left: pagePosition,
      behavior: "smooth",
    });
  });
});

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;

document.querySelector(".container").addEventListener("mousedown", (event) => {
  isDragging = true;
  startPosition = event.pageX;
  currentTranslate = document.querySelector(".container").scrollLeft;
});

document.querySelector(".container").addEventListener("mouseup", () => {
  isDragging = false;
});

document.querySelector(".container").addEventListener("mousemove", (event) => {
  if (!isDragging) return;
  const currentPosition = event.pageX;
  const diff = currentPosition - startPosition;
  document.querySelector(".container").scrollLeft = currentTranslate - diff;
});

// Cria o mapa e o insere na página
function initMap() {
  const center = { lat: -23.550520, lng: -46.633308 }; // Coordenadas do centro de São Paulo
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: center,
    streetViewControl: false, // Remove a opção de Street View
    mapTypeControl: false, // Remove a opção de visualização de satélite
    styles: [
      {
        featureType: "poi",
        stylers: [
          { visibility: "off" } // Define a visibilidade dos POIs como "off"
        ]
      }
    ],
    fullscreenControl: false
  });
}

// Espera a página carregar e então inicializa o mapa
window.onload = () => {
  initMap();
};

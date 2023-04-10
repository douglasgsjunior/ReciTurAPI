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

// Cria o mapa e o insere na página
function initMap() {
  const center = { lat: -8.0555435, lng: -34.8806205 }; // Coordenadas do centro de São Paulo
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
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
    fullscreenControl: false,
    zoomControl: false // Remove os botões de zoom
  });
}

// Espera a página carregar e então inicializa o mapa
window.onload = () => {
  initMap();
};

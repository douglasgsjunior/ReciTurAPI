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
  const mapElement = document.getElementById("map");
  const options = {
    zoom: 16,
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
  };
  const map = new google.maps.Map(mapElement, options);

  // Verifica se o navegador suporta geolocalização
  if (navigator.geolocation) {
    // Obtém a posição do usuário
    navigator.geolocation.getCurrentPosition(
      position => {
        // Define as coordenadas da posição do usuário
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // Reposiciona o mapa para a posição do usuário
        map.setCenter(userPosition);
        // Cria um marcador para indicar a posição do usuário
        new google.maps.Marker({
          position: userPosition,
          map: map,
          title: "Sua localização"
        });
      },
      error => {
        console.error("Erro ao obter a localização do usuário:", error);
      }
    );
  } else {
    console.error("Geolocalização não suportada pelo navegador.");
  }
}

// Hamburger menu functions
let nav = document.getElementById('js-menu');
let navToggle = document.getElementById('js-navbar-toggle');

navToggle.addEventListener('click', function () {
  nav.classList.toggle('active');
});

// API CALL FROM HOME PAGE  
const baseUrl = "https://tgh.monikalie.no/wp-json/wc/store/products";
const gamelist = document.querySelector(".games");

// Searchfield
const searchButton = document.querySelector(".search-button");
// Filter
const categories = document.querySelectorAll(".categories");

function displayGames(games) { 
document.querySelector(".loading").innerHTML = "";

games.forEach(function(game) {
    gamelist.innerHTML += `
                            <article class="game">
                              <i class="fas fa-heart" id="wishlist"></i>
                                <a href="#">
                                  <img src="${game.images[0].src}" alt="${game.name}"> 
                                </a>
                                <h3 class="gametitle">${game.name}</h3>
                                  <p class="price"><b>${game.prices.currency_symbol}</b> ${game.prices.price}</p>
                              <button class="buybtn"><i class="fas fa-shopping-cart"></i></button>
                            </article>
                          `
  });
}

// REST API - Call the data 
async function getGameList(url) {
  try {
  const response = await fetch(url);
  const games = await response.json();

  displayGames(games);

} catch(error) {
    gamelist.innerHTML = theError("Oh no!");

  } 
}
getGameList(baseUrl);

// Search button
searchButton.onclick = function() {
  const searchInput = document.querySelector("#search-input").value;
  const newUrl = baseUrl + `?search=${searchInput}`;
  gamelist.innerHTML = "";
  getGameList(newUrl);
} 

// Categories 
categories.forEach(function(category){
  category.onclick = function(event){
    let newUrl;
    if(event.target.id === "featured") {
      newUrl = baseUrl + "?featured=true";
    }
    else{
      const categoryChosen = event.target.value;
      newUrl = baseUrl + `?category=${categoryChosen}`
    }
    gamelist.innerHTML = ""; 
    getGameList(newUrl);
  }
});
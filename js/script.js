//import theError from "..."; 

// Hello
let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
  mainNav.classList.toggle('active');
});

// ... 
const baseUrl = "https://tgh.monikalie.no/wp-json/wc/store/products";

const productContainer = document.querySelector(".games");
// ...
const searchButton = document.querySelector(".search-button");
// ...
const categories = document.querySelectorAll(".categories");

function displayProducts(products) {
document.querySelector(".loading").innerHTML = "";

    products.forEach(function(product) {
      productContainer.innerHTML += `
                                    <article class="game">
                                      <i class="fas fa-heart" id="wishlist"></i>
                                      <a href="#">
                                        <img src="${product.images[0].src}" alt="${product.name}"> 
                                      </a>
                                      <h3 class="gametitle">${product.name}</h3>
                                        <p class="price"><b>${product.prices.currency_symbol}</b> ${product.prices.price}</p>
                                      <button class="buybtn"><i class="fas fa-shopping-cart"></i></button>
                                    </article>
                                    `
    });
}

// REST API ~ call the data 
async function getProducts(url) {
    try {
    const response = await fetch(url);
    const products = await response.json();

    console.log(products);
    displayProducts(products);

} catch(error) {
    productContainer.innerHTML = theError("Oh no!");
} 
}

getProducts(baseUrl);

// Search button ~ should've made an loading animation while typing the button, same with sorting button(s)
searchButton.onclick = function() {
  const searchInput = document.querySelector("#search-input").value;
  const newUrl = baseUrl + `?search=${searchInput}`;
  productContainer.innerHTML = "";
  getProducts(newUrl);
} 

// Categories ~ couldn't make it work on multiple categories or make featured games show up
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
      productContainer.innerHTML = ""; 
      getProducts(newUrl);
  }
});
// Fetch package data from the JSON file
function fetchPackageData() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching package data:', error);
      return [];
    });
}

// Create HTML elements for each package
function createPackageElements(packages) {
  const packagesContainer = document.getElementById('packagesContainer');

  packages.forEach((package) => {
    const packageHTML = `
      <div class="package">
        <i class="fas ${package.icon} fa-3x fas-package"></i>
        <h3 class="package-name">${package.name}</h3>
        <p class="package-description">${package.description}</p>
        <h2 class="package-price">${package.price} €</h2>
        <button class="cart-add-button"><i class="fas fa-cart-plus"></i> Lisa ostukorvi</button>
      </div>
    `;

    packagesContainer.innerHTML += packageHTML;
  });
}

// Handle adding a package to the cart and saving it to localStorage
function addToCart(package) {
  // Create a copy of the package object without the "icon" property
  const packageWithoutIcon = { ...package };
  delete packageWithoutIcon.icon;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.push(packageWithoutIcon);

  localStorage.setItem('cart', JSON.stringify(cart));

  console.log(`Package "${package.name}" added to the cart.`);
}

// Fetch package data and create HTML elements when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  fetchPackageData().then((data) => {
    createPackageElements(data);

    const addToCartButtons = document.querySelectorAll('.cart-add-button');

    addToCartButtons.forEach((button, packageIndex) => {
      button.addEventListener('click', () => {
        const selectedPackage = data[packageIndex];
        addToCart(selectedPackage);
      });
    });
  });
});

// Smooth reveal effect
const sr = ScrollReveal({
  duration: 2500,
  delay: 400,
  reset: false,
});

sr.reveal('.header-section');
sr.reveal('.packages', { origin: 'top', distance: '70px' });
sr.reveal('.paragraphs', { origin: 'bottom', distance: '60px' });

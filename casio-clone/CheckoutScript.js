const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from localStorage

// Function to render cart items
function renderCartItems() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-details">
        <span>${item.name}</span>
        <span>$${item.price * item.quantity}</span>
      </div>
      <div class="counter">
        <button onclick="updateQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)">+</button>
      </div>
      <button class="delete-btn" onclick="deleteItem(${index})">X</button>
    `;
    li.classList.add('cart-item');
    cartList.appendChild(li);
  });
}

// Function to update quantity and price
function updateQuantity(index, delta) {
  let newQuantity = cartItems[index].quantity + delta;
  if (newQuantity < 1) newQuantity = 1;
  cartItems[index].quantity = newQuantity;
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCartItems();
}

// Function to delete item
function deleteItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCartItems();
}

// Function to go to the address section
function goToAddress() {
  document.getElementById('cart-section').classList.remove('active');
  document.getElementById('address-section').classList.add('active');
}

// Function to confirm address and move to billing
function confirmAddress() {
  const addressDetails = {
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    district: document.getElementById('district').value,
    country: document.getElementById('country').value,
    pincode: document.getElementById('pincode').value,
  };

  // Check if all fields are filled
  if (Object.values(addressDetails).some(value => value.trim() === '')) {
    alert("Please fill all fields.");
    return;
  }

  // Save address to localStorage
  localStorage.setItem('address', JSON.stringify(addressDetails));

  // Move to billing section if address is valid
  document.getElementById('address-section').classList.remove('active');
  document.getElementById('billing-section').classList.add('active');

  renderOrderSummary();
}

// Function to render the order summary
function renderOrderSummary() {
  const summaryList = document.getElementById('order-summary-items');
  summaryList.innerHTML = '';
  let totalAmount = 0;

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('order-summary-item');
    li.innerHTML = `
      <div class="order-item-img-container">
        <img src="${item.img}" alt="${item.name}" class="order-item-img" />
      </div>
      <div class="order-item-details">
        <span class="order-item-name">${item.name}</span>
        <span class="order-item-price">₹${item.price}</span>
        <span class="order-item-quantity">x ${item.quantity}</span>
      </div>
    `;
    summaryList.appendChild(li);
    totalAmount += item.price * item.quantity;
  });

  const totalLi = document.createElement('li');
  totalLi.classList.add('total-amount');
  totalLi.innerHTML = `<strong>Total: ₹${totalAmount}</strong>`;
  summaryList.appendChild(totalLi);
}

// Check if there's a saved address on page load
window.onload = () => {
  const savedAddress = JSON.parse(localStorage.getItem('address'));
  if (savedAddress) {
    document.getElementById('address').value = savedAddress.address;
    document.getElementById('city').value = savedAddress.city;
    document.getElementById('district').value = savedAddress.district;
    document.getElementById('country').value = savedAddress.country;
    document.getElementById('pincode').value = savedAddress.pincode;
  }
}

// Function to handle tab switching (if any)
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`${tab.dataset.tab}-section`).classList.add('active');
  });
});


function placeOrder() {
  const cardName = document.getElementById('card-name').value.trim();
  const cardNumber = document.getElementById('card-number').value.trim();
  const cvv = document.getElementById('cvv').value.trim();

  // Simple validation checks
  if (!cardName || !cardNumber || !cvv) {
    alert('Please fill in all the fields correctly.');
    return;
  }

  // Clear the cart in localStorage and the cartItems array
  localStorage.removeItem('cart'); // Remove the cart from localStorage
  cartItems.length = 0; // Clear the cartItems array

  // Show success message after 1 second
  const orderMessage = document.getElementById('order-message');
  setTimeout(() => {
    orderMessage.style.display = 'block';
    orderMessage.textContent = 'Order successful!';
  }, 1000);

  // Redirect to main.html after showing the message
  setTimeout(() => {
    window.location.href = 'Main.html';
  }, 3000);
}


// Initial rendering of cart items and order summary
renderCartItems();
renderOrderSummary();






// header js

// this part header part
// Hambueger Menu

const hamburgerIcon = document.getElementById('hamburgerIcon');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const closeMenu = document.getElementById('closeMenu');
const searchBox = document.getElementById('searchBox');
const nav = document.querySelector('.nav');

// Toggle hamburger menu
hamburgerIcon.addEventListener('click', () => {
    hamburgerMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
});

// Get all navigation links inside the nav
const navLinks = document.querySelectorAll('.nav ul li a');

// Add event listener to each nav link to show the hamburger menu
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.add('active'); // Show the menu
    });
});

// Close the hamburger menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (!hamburgerMenu.contains(event.target) && !hamburgerIcon.contains(event.target)) {
        hamburgerMenu.classList.remove('active');
    }
});

// Handle search box behavior
searchBox.addEventListener('focus', function () {
    if (window.innerWidth > 995) { // Only expand for widths above 995px
        this.classList.add('expanded');
        nav.style.display = 'none';
    }
});

searchBox.addEventListener('blur', function () {
    if (window.innerWidth > 995) { // Only shrink for widths above 995px
        this.classList.remove('expanded');
        nav.style.display = 'flex';
    }
});

// Adjust navigation visibility based on window width
function handleResize() {
    if (window.innerWidth <= 995) {
        nav.style.display = 'none'; // Hide navigation links below 995px
    } else {
        nav.style.display = 'flex'; // Show navigation links above 995px
    }
}

// Add a resize event listener
window.addEventListener('resize', handleResize);

// Call the function on initial load to set the correct state
handleResize();

const fullscreenSearch = document.createElement('div');
fullscreenSearch.innerHTML = `
    <div class="fullscreen-search" id="fullscreenSearch">
        <input type="text" placeholder="Search..." id="fullscreenSearchInput">
    </div>`;
document.body.appendChild(fullscreenSearch);

const fullscreenSearchElement = document.getElementById('fullscreenSearch');
const fullscreenSearchInput = document.getElementById('fullscreenSearchInput');

// Show fullscreen search box below 995px on focus
searchBox.addEventListener('focus', function () {
    if (window.innerWidth <= 995) {
        fullscreenSearchElement.classList.add('active');
        fullscreenSearchInput.focus();
    }
});

// Hide fullscreen search box on blur
fullscreenSearchInput.addEventListener('blur', function () {
    fullscreenSearchElement.classList.remove('active');
});



function placeOrder() {
  const cardName = document.getElementById('card-name').value.trim();
  const cardNumber = document.getElementById('card-number').value.trim();
  const cvv = document.getElementById('cvv').value.trim();

  // Simple validation checks
  if (!cardName || !cardNumber || !cvv) {
    alert('Please fill in all the fields correctly.');
    return;
  }

  // Show success message after 1 second
  const orderMessage = document.getElementById('order-message');
  setTimeout(() => {
    orderMessage.style.display = 'block';
    orderMessage.textContent = 'Order successful!';
  }, 1000);

  // Redirect to main.html after showing the message
  setTimeout(() => {
    window.location.href = 'Main.html';
  }, 3000);
}

// Ensure the onclick is set programmatically as a fallback
document.querySelector('.btn').onclick = function () {
  placeOrder();
};


'use strict';

// Initialize Swiper
let swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Stop autoplay when next or prev button is clicked
try{
document.querySelector('.swiper-button-next').addEventListener('click', () => {
  swiperInstance.loopDestroy(); // Stops the loop
  swiperInstance.slidePrev(); // Move to the previous slide
});

document.querySelector('.swiper-button-prev').addEventListener('click', () => {
  swiperInstance.loopDestroy(); // Stops the loop
  swiperInstance.slideNext(); // Move to the next slide
});

}
catch(error){

  console.error('Navigation error:', error);


}


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



// This part is for the products and cart.

    // Initialize Swiper with breakpoints for responsiveness
    let  newSwiper = new Swiper('#drop-swiper-container', {
      slidesPerView: 5,
      spaceBetween: 10,
      navigation: {
        nextEl: '#drop-swiper-button-next',
        prevEl: '#drop-swiper-button-prev',
      },
      breakpoints: {
        1024: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      },
    });

    fetch('cart_product.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
      .then(products => {
        const swiperWrapper = document.getElementById('drop-swiper-wrapper');
        products.forEach(product => {

          const safeName = product.name?.replace(/[<>]/g, '') || '';
          const safePrice = product.price?.toString().replace(/[<>]/g, '') || '';
          const slide = document.createElement('div');
          slide.className = 'swiper-slide';
          slide.id = 'drop-swiper-slide'; // Add custom ID for each slide
          slide.innerHTML = `
            <div class="image-container" id="drop-image-container">
              <img src="${product.img1}" alt="${product.name}" class="img1" />
              <img src="${product.img2}" alt="${product.name}" class="img2" />
            </div>
            <div class="product-name" id="drop-product-name">${product.name}</div>
            <div class="product-price" id="drop-product-price">${product.price}</div>
          `;
          swiperWrapper.appendChild(slide);
        });
        newSwiper.update(); // Update Swiper after adding slides
      })
      .catch(error => console.error('Error fetching data:', error));



      // category 

      // Swiper Configuration for Category Section
var categorySwiper = new Swiper('#drop-swiper-container', {
  slidesPerView: 5,
  spaceBetween: 10,
  navigation: {
    nextEl: '#category-swiper-button-next',
    prevEl: '#category-swiper-button-prev',
  },
  breakpoints: {
    1024: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
  },
});

// Fetch category data and display
fetch('https://casi-ea3bd-default-rtdb.firebaseio.com/category.json')
  .then(response => response.json())
  .then(categories => {
    const categoryWrapper = document.getElementById('category-swiper-wrapper');
    categories.forEach(category => {
      // Use the price from the fetched data (no need for random price here)
      const price = category.price;

      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <div class="category-card">
          <img src="${category.img}" alt="${category.name}" class="category-image" />
          <h3 class="category-name">${category.name}</h3>
          
          <p class="category-price">₹${price}</p>
          <button class="btn btn-primary" onclick="addToCart('${category.id}', '${category.name}', '${category.img}', ${price})">Buy Now</button>
        </div>
      `;
      categoryWrapper.appendChild(slide);
    });
    categorySwiper.update(); // Update Swiper after adding slides
  })
  .catch(error => console.error('Error fetching data:', error));

  function addToCart(id, name, img, price) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === id);
  
    if (existingItemIndex !== -1) {
      // If the item already exists, increase the quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // If the item doesn't exist, add it with quantity 1
      const cartItem = { id, name, img, price, quantity: 1 };
      cartItems.push(cartItem);
    }
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  
    // Show alert
    // alert('Item added to cart');
  
    localStorage.setItem('cart', JSON.stringify(cartItems));

// Check if the checkout page has already been opened in a new tab
const hasOpenedCheckout = localStorage.getItem('hasOpenedCheckout');


  window.open('checkout.html', '_blank');

}

  
  


// Toggle Class Active untuk hamburger menu
const navbarNav = document.querySelector ('.navbar-nav');

// Toggle Class Active untuk Shopping Cart
const shoppingCart = document.querySelector ('.shopping-cart');


// Ketika Hamburger Menu di Klik
document.querySelector('#hamburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active');
};

// Ketika Shopping Cart di Klik
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
}

// Klik diluar element
const hamburger = document.querySelector('#hamburger-menu');
const searchbox = document.querySelector('#search-button')
const shoppingcart = document.querySelector('#shopping-cart-button')

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if(!shoppingcart.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }

    if(!searchbox.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
});


// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButton = document.querySelector('.item-detail-button');

itemDetailButton.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
};

// Klik Tombol Close
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};
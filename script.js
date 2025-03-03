// Menu data
const menuData = {
    coffee: [
        { id: 'c1', name: 'Espresso', description: 'Strong and pure coffee shot', price: 3.50, image: 'https://placehold.co/300x200/333/fff?text=Espresso', details: 'Our signature espresso is crafted with precision using premium Arabica beans. Each shot is carefully extracted at the perfect temperature and pressure for optimal flavor.' },
        { id: 'c2', name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 4.50, image: 'https://placehold.co/300x200/333/fff?text=Cappuccino', details: 'A perfect balance of rich espresso, steamed milk, and velvety foam. Our baristas are trained to create the ideal ratio for a classic Italian cappuccino.' },
        { id: 'c3', name: 'Latte', description: 'Espresso with lots of steamed milk and little foam', price: 4.50, image: 'https://placehold.co/300x200/333/fff?text=Latte', details: 'Smooth and creamy, our latte combines rich espresso with perfectly steamed milk. Available with your choice of dairy or plant-based milk.' },
        { id: 'c4', name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 5.00, image: 'https://placehold.co/300x200/333/fff?text=Mocha', details: 'A delightful blend of espresso, premium chocolate, and steamed milk. Topped with whipped cream and cocoa powder.' }
    ],
    tea: [
        { id: 't1', name: 'Green Tea', description: 'Classic Japanese green tea', price: 3.00, image: 'https://placehold.co/300x200/333/fff?text=Green+Tea', details: 'Premium Japanese Sencha green tea, carefully brewed at the optimal temperature to release its subtle flavors and health benefits.' },
        { id: 't2', name: 'Earl Grey', description: 'Black tea with bergamot oil', price: 3.00, image: 'https://placehold.co/300x200/333/fff?text=Earl+Grey', details: 'Fine black tea infused with natural bergamot oil. A classic blend that offers a perfect balance of tea and citrus flavors.' },
        { id: 't3', name: 'Chamomile', description: 'Caffeine-free herbal tea', price: 3.00, image: 'https://placehold.co/300x200/333/fff?text=Chamomile', details: 'Soothing caffeine-free herbal tea made from whole chamomile flowers. Known for its calming properties and subtle apple-like flavor.' },
        { id: 't4', name: 'Chai Latte', description: 'Spiced tea with steamed milk', price: 4.50, image: 'https://placehold.co/300x200/333/fff?text=Chai+Latte', details: 'Our signature blend of black tea and aromatic spices, combined with steamed milk for a warming and flavorful experience.' }
    ],
    pastries: [
        { id: 'p1', name: 'Croissant', description: 'Buttery, flaky pastry', price: 3.00, image: 'https://placehold.co/300x200/333/fff?text=Croissant', details: 'Traditional French croissants made with premium butter, folded and baked to perfection for a light, flaky texture.' },
        { id: 'p2', name: 'Chocolate Muffin', description: 'Rich chocolate muffin', price: 3.50, image: 'https://placehold.co/300x200/333/fff?text=Chocolate+Muffin', details: 'Decadent chocolate muffins made with premium cocoa and chocolate chips. Baked fresh daily for the perfect texture.' },
        { id: 'p3', name: 'Blueberry Scone', description: 'Fresh baked scone with blueberries', price: 3.50, image: 'https://placehold.co/300x200/333/fff?text=Blueberry+Scone', details: 'Buttery scones filled with fresh blueberries. Slightly sweet and perfect with your morning coffee or tea.' },
        { id: 'p4', name: 'Cinnamon Roll', description: 'Warm, gooey cinnamon roll', price: 4.00, image: 'https://placehold.co/300x200/333/fff?text=Cinnamon+Roll', details: 'Freshly baked cinnamon rolls with a perfect swirl of cinnamon-sugar and topped with cream cheese frosting.' }
    ]
};

// Cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Handle navigation bar transparency on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.setAttribute('data-count', count.toString());
}

// Add item to cart
function addToCart(itemId) {
    const item = [...menuData.coffee, ...menuData.tea, ...menuData.pastries]
        .find(item => item.id === itemId);
    
    if (item) {
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showAddedToCartMessage(item.name);
    }
}

// Show "Added to Cart" message
function showAddedToCartMessage(itemName) {
    const message = document.createElement('div');
    message.textContent = `${itemName} added to cart!`;
    message.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        animation: slideIn 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(message);
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 2000);
}

// Create menu items
function createMenuItem(item) {
    return `
        <div class="menu-item" onclick="showItemDetails('${item.id}')">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">$${item.price.toFixed(2)}</span>
                <button class="cart-btn" onclick="event.stopPropagation(); addToCart('${item.id}')">Add to Cart</button>
            </div>
        </div>
    `;
}

// Populate menu sections
function populateMenus() {
    if (document.getElementById('coffee-menu')) {
        const coffeeMenu = document.getElementById('coffee-menu');
        coffeeMenu.innerHTML += menuData.coffee.map(createMenuItem).join('');

        const teaMenu = document.getElementById('tea-menu');
        teaMenu.innerHTML += menuData.tea.map(createMenuItem).join('');

        const pastriesMenu = document.getElementById('pastries-menu');
        pastriesMenu.innerHTML += menuData.pastries.map(createMenuItem).join('');
    }
}

// Show item details modal
function showItemDetails(itemId) {
    const item = [...menuData.coffee, ...menuData.tea, ...menuData.pastries]
        .find(item => item.id === itemId);
    
    if (!item) return;

    const modal = document.createElement('div');
    modal.className = 'item-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal(this.parentElement.parentElement)">&times;</span>
            <img src="${item.image}" alt="${item.name}" class="modal-image">
            <h2>${item.name}</h2>
            <p class="modal-details">${item.details}</p>
            <div class="modal-price-cart">
                <span class="price">$${item.price.toFixed(2)}</span>
                <button class="cart-btn" onclick="addToCart('${item.id}'); closeModal(this.parentElement.parentElement.parentElement)">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
}

// Update cart page
function updateCartPage() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="item-price">
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update item quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }

    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartPage();
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartPage();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    populateMenus();
    updateCartCount();
    updateCartPage();
});

// Add keyframe animations to style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
